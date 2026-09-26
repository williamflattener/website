// WF 3.0 — kinetic behaviours. Plain JS, no build step.
// Re-runs itself on DOM mutation so React mounts get wired.
(function () {
  var reduce = (function(){try{return localStorage.getItem('wf-reduce-motion')==='1'}catch(e){return false}})() || matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- tickers & marquees: duplicate the track so the loop is seamless --- */
  // Repeat until ONE copy is at least as wide as the viewport, or the -50%
  // keyframe leaves a blank gap at the loop point on wide screens.
  function loops() {
    document.querySelectorAll('.kx-ticker__track, .kx-foot-mq__track').forEach(function (t) {
      var base = t.dataset.base;
      if (base === undefined) { base = t.dataset.base = t.innerHTML; }
      // Idempotent: sweep() runs on every mutation, so bail unless the
      // viewport changed since the last build (rewriting would loop).
      if (t.dataset.built === String(innerWidth)) return;
      t.dataset.built = String(innerWidth);
      var one = base, guard = 0;
      t.innerHTML = one;
      while (t.scrollWidth < innerWidth && guard++ < 12) { one += base; t.innerHTML = one; }
      t.innerHTML = one + one;
    });
  }
  var loopT;
  addEventListener('resize', function () { clearTimeout(loopT); loopT = setTimeout(loops, 200); });

  /* --- reveal on enter. Rect-based: IntersectionObserver is unreliable
     inside nested preview frames, and a missed reveal hides content. --- */
  var watched = [];
  function inView(el, slack) {
    var r = el.getBoundingClientRect();
    var h = innerHeight || 800;
    return r.top < h * (1 - (slack || 0)) && r.bottom > 0;
  }
  function pump() {
    watched = watched.filter(function (w) {
      if (!w.el.isConnected) return false;
      if (inView(w.el, 0.04)) { w.hit(); return false; }
      return true;
    });
  }
  addEventListener('scroll', pump, { passive: true });
  addEventListener('resize', pump);
  function watch(el, hit) {
    if (reduce) { hit(); return; }
    watched.push({ el: el, hit: hit });
    requestAnimationFrame(pump);
  }

  function reveals() {
    document.querySelectorAll('.kx-stack, .kx-rise').forEach(function (el) {
      if (el.dataset.kx) return;
      el.dataset.kx = '1';
      watch(el, function () { el.classList.add('lit'); });
    });
  }

  /* --- count-ups --- */
  function counters() {
    document.querySelectorAll('.kx-count').forEach(function (el) {
      if (el.dataset.kx) return;
      el.dataset.kx = '1';
      var to = parseFloat(el.dataset.to || el.textContent) || 0;
      var pad = (el.dataset.pad || '').length ? parseInt(el.dataset.pad, 10) : 0;
      var fmt = function (v) {
        var s = el.dataset.thousands ? Math.round(v).toLocaleString('en-US') : String(Math.round(v));
        return pad ? s.padStart(pad, '0') : s;
      };
      el.textContent = fmt(0);
      var run = function () {
        var t0 = performance.now(), dur = 1100;
        (function step(now) {
          var p = Math.min(1, (now - t0) / dur);
          el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      };
      watch(el, run);
    });
  }

  /* --- cursor-tracked cover peek on index rows --- */
  var peek, px = 0, py = 0, tx = 0, ty = 0, raf = 0;
  function peekEl() {
    if (peek) return peek;
    peek = document.createElement('div');
    peek.className = 'kx-peek';
    document.body.appendChild(peek);
    return peek;
  }
  function tick() {
    px += (tx - px) * 0.16; py += (ty - py) * 0.16;
    peek.style.left = px + 'px'; peek.style.top = py + 'px';
    raf = requestAnimationFrame(tick);
  }
  function coverSrc(id) {
    var slot = id && document.getElementById(id);
    var img = slot && slot.shadowRoot && slot.shadowRoot.querySelector('img');
    return img && img.getAttribute('src') ? img.getAttribute('src') : '';
  }
  function peeks() {
    if (reduce) return;
    document.querySelectorAll('[data-peek]').forEach(function (row) {
      if (row.dataset.kxPeek) return;
      row.dataset.kxPeek = '1';
      row.addEventListener('pointerenter', function (e) {
        var p = peekEl();
        var src = coverSrc(row.dataset.peek);
        p.innerHTML = src ? '<img alt="">' : '<div class="kx-peek__fall">' + (row.dataset.peekLabel || 'cover') + '</div>';
        if (src) p.querySelector('img').src = src;
        tx = px = e.clientX; ty = py = e.clientY;
        p.classList.add('on');
        if (!raf) raf = requestAnimationFrame(tick);
      });
      row.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; });
      row.addEventListener('pointerleave', function () {
        if (peek) peek.classList.remove('on');
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
      });
    });
  }

  /* --- nav-link glyph shuffle: type settles as it lights up --- */
  var GLYPHS = '/\\|_-=+*<>#·×';
  function shuffle() {
    document.querySelectorAll('.nav-link, .kx-shuffle, .hot-link, .muted-link, .online-link__name, .calm-book__t a, .site-foot__links a, .bcrumb a, .prose a').forEach(function (el) {
      if (el.dataset.kxSh || reduce) return;
      el.dataset.kxSh = '1';
      var host = el.closest('.online-link') || el, busy = 0, last = 0;
      host.addEventListener('pointerenter', function () {
        var now = Date.now();
        var g = 0;
        try { g = +sessionStorage.getItem('wf-scramble-last') || 0; } catch (e) { g = window.__kxShLast || 0; }
        if (busy || now - last < 30000 || now - g < 4000) return;
        last = now;
        window.__kxShLast = now;
        try { sessionStorage.setItem('wf-scramble-last', String(now)); } catch (e) {}
        // shuffle text nodes only, so child spans (↗, dots) survive
        var nodes = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (w.nextNode()) if (w.currentNode.nodeValue.trim()) nodes.push(w.currentNode);
        var reals = nodes.map(function (n) { return n.nodeValue; });
        var len = reals.join('').length, i = 0;
        busy = setInterval(function () {
          i++;
          var off = 0;
          nodes.forEach(function (n, j) {
            n.nodeValue = reals[j].split('').map(function (c, m) {
              if (c === ' ' || off + m < i * 1.4) return c;
              return GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }).join('');
            off += reals[j].length;
          });
          if (i * 1.4 > len) { clearInterval(busy); busy = 0; nodes.forEach(function (n, j) { n.nodeValue = reals[j]; }); }
        }, 34);
      });
    });
  }

  /* --- hero art drifts slightly against the scroll --- */
  function parallax() {
    var art = document.querySelector('.kx-hero__art');
    if (!art || reduce || art.dataset.kx) return;
    art.dataset.kx = '1';
    var run = function () { art.style.transform = 'translateY(' + Math.min(scrollY * 0.12, 90) + 'px)'; };
    addEventListener('scroll', run, { passive: true });
    run();
  }

  /* --- mirror an image-slot's dropped art into a plain img elsewhere,
     so one drop point can appear in several views --- */
  function mirrors() {
    document.querySelectorAll('[data-mirror]').forEach(function (host) {
      if (host.dataset.kxM) return;
      host.dataset.kxM = '1';
      var slot = document.getElementById(host.dataset.mirror);
      if (!slot) return;
      var img = document.createElement('img');
      img.alt = '';
      img.className = 'kx-mirror';
      host.insertBefore(img, host.firstChild);
      var sync = function () {
        var src = coverSrc(host.dataset.mirror);
        if (src) { img.src = src; img.style.display = 'block'; } else { img.removeAttribute('src'); img.style.display = 'none'; }
      };
      sync();
      new MutationObserver(sync).observe(slot, { attributes: true, attributeFilter: ['data-filled'] });
      setTimeout(sync, 400);
    });
  }

  function sweep() { loops(); reveals(); counters(); peeks(); mirrors(); shuffle(); parallax(); pump(); }
  sweep();
  var root = document.getElementById('app') || document.body;
  new MutationObserver(sweep).observe(root, { childList: true, subtree: true });
  window.WFKinetic = { sweep: sweep };
})();
