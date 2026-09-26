// Reduce-motion preference: user toggle (persisted) or OS setting.
window.wfReduced = () => (function(){try{return localStorage.getItem('wf-reduce-motion')==='1'}catch(e){return false}})() || matchMedia('(prefers-reduced-motion: reduce)').matches;
try { if (localStorage.getItem('wf-reduce-motion') === '1') document.documentElement.classList.add('wf-calm'); } catch (e) {}

// Shared top navigation + footer for the FLATTENER site.
// Pulls FLAT primitives from the compiled bundle namespace.

function WFNav({ current }) {
  const [active, setActive] = React.useState(current);
  React.useEffect(() => {
    const ids = ["top", "writing", "about", "flatposting", "signup"];
    const onIndex = !!document.getElementById("writing");
    if (!onIndex) return;
    const spy = () => {
      let cur = "home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id === "top" ? "home" : id === "signup" ? "newsletter" : id;
      });
      setActive(cur);
    };
    addEventListener("scroll", spy, { passive: true });
    spy();
    return () => removeEventListener("scroll", spy);
  }, []);
  current = active;
  const item = (label, href, key, external) =>
  <a
    key={key}
    className="nav-link"
    href={href}
    aria-current={current === key ? "page" : undefined}
    {...external ? { target: "_blank", rel: "noopener noreferrer" } : {}}>
    
      {label}{external ? <span className="ext"> ↗</span> : null}
    </a>;

  return (
    <header className="site-nav">
      <a className="site-nav__mark" href="index.html">FLATTENER<span className="dot">.</span></a>
      <nav className="site-nav__links">
        {item("Home", "index.html#top", "home")}
        {item("Writing", "index.html#writing", "writing")}
        {item("About", "index.html#about", "about")}
        {item("Flatposting", "index.html#flatposting", "flatposting")}
        {item("Newsletter", "index.html#signup", "newsletter")}
        <button type="button" className="rm-toggle" aria-label={document.documentElement.classList.contains("wf-calm") ? "Motion off — turn motion back on" : "Reduce motion"} aria-pressed={document.documentElement.classList.contains("wf-calm")} onClick={() => {
          const on = !document.documentElement.classList.contains("wf-calm");
          try { localStorage.setItem("wf-reduce-motion", on ? "1" : "0"); } catch (e) {}
          location.reload();
        }}><span className={"rm-ico" + (document.documentElement.classList.contains("wf-calm") ? " rm-ico--play" : "")} aria-hidden="true"></span>motion</button>
      </nav>
    </header>);

}

const WF_SUBSTACK = "https://williamflattener.substack.com";
const WF_THANKS = "You're in. Check your inbox for a welcome email from Substack.";
/* Subscribes without leaving the site: posts the email to Substack's own
   no-JavaScript signup endpoint through a hidden iframe (no CORS, no new tab). */
function wfSubscribe(e, setState) {
  e.preventDefault();
  const input = e.currentTarget.querySelector('input[type="email"]');
  const email = input ? input.value.trim() : "";
  if (!email) return;
  setState("busy");
  const name = "wf-sub-" + Date.now();
  const frame = document.createElement("iframe");
  frame.name = name;
  frame.title = "Newsletter signup";
  frame.hidden = true;
  const form = document.createElement("form");
  form.method = "POST";
  form.action = WF_SUBSTACK + "/api/v1/free?nojs=true";
  form.target = name;
  form.hidden = true;
  [["email", email], ["first_url", location.href], ["first_referrer", document.referrer], ["source", "wf-site"]].forEach(([k, v]) => {
    const f = document.createElement("input");
    f.type = "hidden"; f.name = k; f.value = v;
    form.appendChild(f);
  });
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    setState("done");
    setTimeout(() => { frame.remove(); form.remove(); }, 30000);
  };
  frame.addEventListener("load", finish);
  setTimeout(finish, 6000);
  document.body.append(frame, form);
  form.submit();
}

const WF_FOOT = [
["Site", [["Home", "index.html#top"], ["Writing", "index.html#writing"], ["About", "index.html#about"], ["Flatposting", "index.html#flatposting"]]],
["Read & support", [["Royal Road", "https://www.royalroad.com/profile/378454"], ["Patreon", "https://www.patreon.com/william_flattener"], ["Flatposting", "https://flatposting.lovable.app/"]]],
["Find William", [["Discord", "https://discord.gg/6sm7TZEneT"], ["Bluesky", "https://bsky.app/profile/williamflattener.bsky.social"], ["Instagram", "https://www.instagram.com/william.flattener/"], ["Twitch", "https://www.twitch.tv/williamflattener"]]]];

const WF_CREDITS = [
{ what: "Carousel background: Next-level web fiction (tunnel portal)", by: "Pixabay contributor", byHref: "https://pixabay.com/videos/tunnel-portal-glow-futuristic-84938/", from: "Pixabay", fromHref: "https://pixabay.com/videos/tunnel-portal-glow-futuristic-84938/" },
{ what: "Carousel background: Commander Z (clouds)", by: "Vimeo-Free-Videos", byHref: "https://pixabay.com/users/vimeo-free-videos-1283884/", from: "Pixabay", fromHref: "https://pixabay.com/videos/clouds-cloudscape-sky-air-1154/" },
{ what: "Carousel background: The Dump Stat (bokeh)", by: "ilhozc", byHref: "https://pixabay.com/users/ilhozc-7240842/", from: "Pixabay", fromHref: "https://pixabay.com/videos/bokeh-lights-particles-dust-glitter-137666/" },
{ what: "Carousel background: Newsletter (keyboard)", by: "Vimeo-Free-Videos", byHref: "https://pixabay.com/users/vimeo-free-videos-1283884/", from: "Pixabay", fromHref: "https://pixabay.com/videos/keyboard-hands-writing-computer-1046/" },
{ what: "About section background (embers)", by: "Emirhan Bal", byHref: "https://pixabay.com/users/mootlak-10971248/", from: "Pixabay", fromHref: "https://pixabay.com/videos/embers-light-bokeh-flame-energy-135432/" }];

function WFCredits({ open, onClose }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="credits" onClose={onClose} onClick={(e) => {if (e.target === ref.current) onClose();}}>
      <div className="credits__box">
        <div className="credits__top">
          <h2 className="credits__h">Imagery credits</h2>
          <button type="button" className="credits__x" onClick={onClose} aria-label="Close">×</button>
        </div>
        <ul className="credits__list">
          {WF_CREDITS.map((c, i) =>
          <li key={i}>
              <span className="credits__what">{c.what}</span>
              <span>Video by <a href={c.byHref} target="_blank" rel="noopener noreferrer">{c.by}</a> from <a href={c.fromHref} target="_blank" rel="noopener noreferrer">{c.from}</a></span>
            </li>
          )}
        </ul>
      </div>
    </dialog>);
}

function WFFooter() {
  const [done, setDone] = React.useState(false);
  const [credits, setCredits] = React.useState(false);
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot">
          <div className="foot__brand">
            <a className="site-foot__mark" href="index.html" style={{ textDecoration: "none" }}>FLATTENER<span className="dot">.</span></a>
            <p className="foot__sub">Updates from me. No spam.</p>
            {done === "done" ?
            <p className="foot__done" role="status">{WF_THANKS}</p> :
            <form className="foot__form" onSubmit={(e) => wfSubscribe(e, setDone)}>
                <input className="foot__input" type="email" name="email" required placeholder="you@somewhere.com" aria-label="Email" />
                <button className="foot__btn" type="submit" disabled={done === "busy"}>{done === "busy" ? "Subscribing…" : "Subscribe"}</button>
              </form>}
          </div>
          {WF_FOOT.map(([h, links]) =>
          <nav className="foot__col" key={h} aria-label={h}>
              <h3 className="foot__h">{h}</h3>
              <ul className="site-foot__links">
                {links.map(([l, href]) => {
                  const ext = href.startsWith("http");
                  return <li key={l + href}><a className="muted-link" href={href} {...ext ? { target: "_blank", rel: "noopener noreferrer" } : {}}>{l}{ext ? " ↗" : ""}</a></li>;
                })}
                {h === "Site" ? <li><button type="button" className="muted-link foot__credits" onClick={() => setCredits(true)}>Imagery credits</button></li> : null}
              </ul>
            </nav>
          )}
        </div>
      </div>
      <WFCredits open={credits} onClose={() => setCredits(false)} />
    </footer>);
}

/* Panels that fade in as they scroll into view. */
(function noir() {
  const reduce = window.wfReduced();

  const SEL = ".book, .fic-card, .online-link, .rnav, .stat, .soon-card, .section-head, .cat__head, .fic-hero, .aside-strip, .dispatch";
  // Rect-based, not IntersectionObserver: nested preview frames don't
  // reliably deliver IO callbacks, and a missed reveal leaves content dim.
  let pending = [];
  const pump = () => {
    pending = pending.filter((el) => {
      if (!el.isConnected) return false;
      const r = el.getBoundingClientRect();
      if (r.top < (innerHeight || 800) * 0.94 && r.bottom > 0) {el.classList.add("lit");return false;}
      return true;
    });
  };
  addEventListener("scroll", pump, { passive: true });
  addEventListener("resize", pump);

  const sweep = () => {
    document.querySelectorAll(SEL).forEach((el, i) => {
      if (el.dataset.noir) return;
      el.dataset.noir = "1";
      el.classList.add("emerge");
      el.style.transitionDelay = Math.min(i * 40, 240) + "ms";
      if (reduce) el.classList.add("lit");else pending.push(el);
    });
    pump();
  };
  sweep();
  new MutationObserver(sweep).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
})();

/* CALM MIX — FLAT's one-word face swap. In a multi-word line, one
   word (chosen deterministically) is set in Abril italic; the rest
   stays plain. Single words render plain. density is ignored. */
function mxHash(s) {
  let h = 2166136261;
  for (let k = 0; k < s.length; k++) h = Math.imul(h ^ s.charCodeAt(k), 16777619);
  return h >>> 0;
}
function Mix({ text, tag, suffix, italic = false }) {
  const T = tag || "span";
  const s = String(text);
  const words = s.split(" ");
  const pick = italic && words.length > 1 ? mxHash(s) % words.length : -1;
  const out = [];
  words.forEach((w, wi) => {
    if (wi) out.push(" ");
    const last = wi === words.length - 1 && suffix;
    out.push(<span key={wi} className={wi === pick ? "mx-word" : undefined}>{w}{last ? suffix : null}</span>);
  });
  return React.createElement(T, { className: "kx-mix" }, out);
}

/* CHROMA — white headings split into cyan/magenta the farther they sit
   (vertically) from the viewport's center. Offset scales with font size. */
(function chroma() {
  if (window.wfReduced()) return;
  const SEL = ".calm-hero__h, .calm-h2, .signup__h, .fic-hero__title, .chap-head__title, .calm-book__t, .site-foot__mark, .cat__title, .section-head__title";
  let raf = 0;
  const run = () => {
    raf = 0;
    const vh = innerHeight || 800, mid = vh / 2;
    document.querySelectorAll(SEL).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const d = Math.min(1, Math.abs((r.top + r.height / 2 - mid) / mid));
      const fs = parseFloat(getComputedStyle(el).fontSize) || 32;
      const o = (Math.max(0.08, Math.pow(d, 1.3)) * fs * 0.085).toFixed(2);
      el.style.setProperty("--ca", o + "px");
      el.classList.add("chroma");
    });
  };
  const q = () => { if (!raf) raf = requestAnimationFrame(run); };
  addEventListener("scroll", q, { passive: true });
  addEventListener("resize", q);
  new MutationObserver(q).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
  q();
})();

/* JAGGED EDGES — each section's top edge is cut into a unique irregular
   polyline and tucked up over the previous section. Seeded per position,
   so shapes are stable across reloads but never repeat. */
(function edges() {
  const rng = (seed) => () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  const cut = () => {
    const els = [...document.querySelectorAll("#app > div > section, #app > div > footer")];
    els.forEach((el, n) => {
      if (n === 0 || el.dataset.edge) return;
      el.dataset.edge = "1";
      const r = rng(n * 7919 + 1301);
      const amp = 26 + Math.round(r() * 30);
      // A few broad slopes (the old shape), roughened with small chips
      // along the whole edge, plus one or two torn, jagged stretches.
      const k = 2 + Math.floor(r() * 3);
      const knots = [[0, r()]];
      for (let j = 0; j < k; j++) knots.push([8 + r() * 84, r()]);
      knots.push([100, r()]);
      knots.sort((p, q) => p[0] - q[0]);
      const base = (x) => {
        let j = 0;
        while (j < knots.length - 2 && x > knots[j + 1][0]) j++;
        const [x0, y0] = knots[j], [x1, y1] = knots[j + 1];
        return y0 + (y1 - y0) * ((x - x0) / (x1 - x0 || 1));
      };
      const tears = [];
      for (let j = 0, m = 1 + Math.floor(r() * 2); j < m; j++) tears.push([6 + r() * 80, 3 + r() * 9]);
      const inTear = (x) => tears.some(([t, w]) => x >= t && x <= t + w);
      const clamp = (v) => Math.max(0, Math.min(amp, Math.round(v)));
      const pts = [];
      let x = 0;
      while (x < 100) {
        const torn = inTear(x);
        const yb = base(x) * amp * 0.8;
        const chip = (r() - 0.5) * amp * 0.34;
        const spike = torn ? (r() < 0.5 ? -1 : 1) * amp * (0.25 + r() * 0.45) : r() < 0.06 ? amp * (0.2 + r() * 0.3) : 0;
        pts.push(x.toFixed(2) + "% " + clamp(yb + chip + spike) + "px");
        x += torn ? 0.35 + r() * 0.9 : 0.5 + r() * 2.2;
      }
      pts.push("100% " + clamp(base(100) * amp * 0.8) + "px", "100% 100%", "0 100%");
      el.style.clipPath = "polygon(" + pts.join(",") + ")";
      el.style.marginTop = -amp + "px";
      el.style.position = el.style.position || "relative";
      const pt = parseFloat(getComputedStyle(el).paddingTop) || 0;
      el.style.paddingTop = pt + amp + "px";
    });
  };
  new MutationObserver(cut).observe(document.getElementById("app") || document.body, { childList: true, subtree: true });
  cut();
})();

const { Input: SInput, Button: SButton } = window.FLATDesignSystem_07a101;
function WFSignup() {
  const [done, setDone] = React.useState(false);
  return (
    <section className="section" id="signup">
      <div className="wrap">
        <div className="signup">
          <div>
            <h2 className="signup__h">DISPATCHES<span className="dot">.</span></h2>
            <p className="signup__p">Subscribe for book criticism and game thoughts, wildly unpopular opinions, and problematic investigations. Occasional screeds; never spam.</p>
          </div>
          {done === "done" ?
          <p className="signup__done" role="status">{WF_THANKS}</p> :
          <form className="signup__form" onSubmit={(e) => wfSubscribe(e, setDone)}>
              <SInput label="Email" id="sig-email" type="email" name="email" required placeholder="you@somewhere.com" />
              <SButton type="submit" variant="signal" size="lg" disabled={done === "busy"}>{done === "busy" ? "Subscribing…" : "Subscribe"}</SButton>
            </form>}
        </div>
      </div>
    </section>);
}

Object.assign(window, { WFNav, WFFooter, Mix, WFSignup, wfSubscribe });
