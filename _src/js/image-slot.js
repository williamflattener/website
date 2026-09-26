// <image-slot> — production version. The design prototype let authors drag
// images in; on the live site each slot just shows its `src`, clipped to its
// `shape`. Kept as a custom element with an open shadow root holding an <img>
// because kinetic.js mirrors slot art by reading shadowRoot img[src].
(() => {
  const css =
    ':host{display:inline-block;position:relative;vertical-align:top;width:240px;height:160px}' +
    '.frame{position:absolute;inset:0;overflow:hidden}' +
    'img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%}';

  class ImageSlot extends HTMLElement {
    static get observedAttributes() { return ['src', 'shape', 'radius', 'alt']; }
    connectedCallback() {
      if (!this.shadowRoot) {
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = '<style>' + css + '</style><div class="frame"><img alt="" decoding="async"></div>';
        this._frame = root.querySelector('.frame');
        this._img = root.querySelector('img');
        this._img.addEventListener('load', () => this.setAttribute('data-filled', ''));
      }
      this._render();
    }
    attributeChangedCallback() { if (this.shadowRoot) this._render(); }
    _render() {
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      const n = parseFloat(this.getAttribute('radius'));
      this._frame.style.borderRadius =
        shape === 'circle' ? '50%' : shape === 'pill' ? '9999px' :
        shape === 'rounded' ? (Number.isFinite(n) ? n : 12) + 'px' : '';
      this._img.alt = this.getAttribute('alt') || '';
      const src = this.getAttribute('src');
      if (src && this._img.getAttribute('src') !== src) this._img.setAttribute('src', src);
    }
  }
  if (!customElements.get('image-slot')) customElements.define('image-slot', ImageSlot);
})();
