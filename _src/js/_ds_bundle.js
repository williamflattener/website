/* @ds-bundle: {"format":3,"namespace":"FLATDesignSystem_07a101","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ArticleCard","sourcePath":"components/editorial/ArticleCard.jsx"},{"name":"Kicker","sourcePath":"components/editorial/Kicker.jsx"},{"name":"PullQuote","sourcePath":"components/editorial/PullQuote.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"219987a3c2d8","components/core/Button.jsx":"f3af35e91776","components/core/Tag.jsx":"42ea3708ac58","components/editorial/ArticleCard.jsx":"02be7330d7b3","components/editorial/Kicker.jsx":"2bc8e1da7a33","components/editorial/PullQuote.jsx":"00918c4a13d3","components/forms/Checkbox.jsx":"62a8a743b963","components/forms/Input.jsx":"613105f48389","ui_kits/zine_reader/Article.jsx":"10e62a950394","ui_kits/zine_reader/CoverContents.jsx":"60ee51951054","ui_kits/zine_reader/Nav.jsx":"d16f9c71e1b0","ui_kits/zine_reader/Subscribe.jsx":"c5c549e979ab"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FLATDesignSystem_07a101 = window.FLATDesignSystem_07a101 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FLAT Badge — a small mono count/status marker. Square, hard-edged.
 * For issue numbers, comment counts, "NEW", section folios.
 */
function Badge({
  children,
  tone = "ink",
  ...rest
}) {
  const tones = {
    ink: {
      background: "var(--ink-700)",
      color: "var(--bone-100)",
      border: "var(--bw-hair) solid var(--border-rule)"
    },
    signal: {
      background: "var(--signal)",
      color: "var(--ink-900)",
      border: "var(--bw-hair) solid var(--signal)"
    },
    acid: {
      background: "var(--accent-acid)",
      color: "var(--ink-900)",
      border: "var(--bw-hair) solid var(--accent-acid)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "flat-badge",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "20px",
      height: "20px",
      padding: "0 6px",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      lineHeight: 1,
      ...tones[tone]
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FLAT Button — a stamped, sharp-cornered action.
 * Variants: signal (filled magenta), ghost (outline), knockout (bone block),
 * link (inline hot text). No rounded corners. Press = shift, not shrink.
 */
function Button({
  children,
  variant = "signal",
  size = "md",
  disabled = false,
  as = "button",
  icon = null,
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: "12px",
      padding: "7px 14px",
      letterSpacing: "0.12em"
    },
    md: {
      fontSize: "14px",
      padding: "11px 22px",
      letterSpacing: "0.1em"
    },
    lg: {
      fontSize: "16px",
      padding: "15px 30px",
      letterSpacing: "0.08em"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5em",
    fontFamily: "var(--font-mono)",
    textTransform: "uppercase",
    fontWeight: 700,
    border: "var(--bw-rule) solid transparent",
    borderRadius: "var(--radius-0)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    lineHeight: 1,
    transition: "transform var(--dur-snap) var(--ease-cut), background var(--dur-base), color var(--dur-base)",
    opacity: disabled ? 0.4 : 1,
    ...sizes[size]
  };
  const variants = {
    signal: {
      background: "var(--signal)",
      color: "var(--text-on-signal)",
      borderColor: "var(--signal)",
      boxShadow: "var(--shadow-ink)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-strong)",
      borderColor: "var(--border-rule)"
    },
    knockout: {
      background: "var(--bone-0)",
      color: "var(--ink-900)",
      borderColor: "var(--bone-0)",
      boxShadow: "var(--shadow-signal)"
    },
    link: {
      background: "transparent",
      color: "var(--signal)",
      borderColor: "transparent",
      padding: 0,
      boxShadow: "none"
    }
  };
  const Comp = as;
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: "flat-btn",
    style: {
      ...base,
      ...variants[variant]
    },
    disabled: as === "button" ? disabled : undefined,
    onMouseDown: e => {
      if (!disabled && variant !== "link") e.currentTarget.style.transform = "translate(3px,3px)";
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = "translate(0,0)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translate(0,0)";
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FLAT Tag — a rotated sticker/label. Mono, spaced, slightly askew like it was
 * slapped on the page. Use for topics, categories, "filed under".
 */
function Tag({
  children,
  tone = "signal",
  rotate = true,
  ...rest
}) {
  const tones = {
    signal: {
      background: "var(--signal)",
      color: "var(--ink-900)"
    },
    acid: {
      background: "var(--accent-acid)",
      color: "var(--ink-900)"
    },
    bone: {
      background: "var(--bone-0)",
      color: "var(--ink-900)"
    },
    outline: {
      background: "transparent",
      color: "var(--text-strong)",
      border: "var(--bw-rule) solid var(--border-rule)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "flat-tag",
    style: {
      display: "inline-block",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.14em",
      padding: "4px 9px",
      lineHeight: 1,
      whiteSpace: "nowrap",
      transform: rotate ? "rotate(var(--rot-tag))" : "none",
      ...tones[tone]
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Kicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FLAT Kicker — the eyebrow above a headline. Spaced mono, magenta by default,
 * optionally prefixed with a hard rule tick.
 */
function Kicker({
  children,
  tone = "signal",
  rule = true,
  ...rest
}) {
  const color = tone === "acid" ? "var(--accent-acid)" : tone === "bone" ? "var(--text-muted)" : "var(--signal)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      whiteSpace: "nowrap",
      ...rest.style
    }
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "28px",
      height: "var(--bw-loud)",
      background: color,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color
    }
  }, children));
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ArticleCard.jsx
try { (() => {
/**
 * FLAT ArticleCard — an index entry for an essay. Number folio, condensed
 * headline, typewriter byline. Hover lifts the headline to magenta. Sharp,
 * bordered, no rounding. Compose into the contents grid.
 */
function ArticleCard({
  index,
  kicker,
  title,
  dek,
  byline,
  tag,
  href = "#",
  featured = false
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      textDecoration: "none",
      background: featured ? "var(--surface-card)" : "transparent",
      border: "var(--bw-rule) solid " + (hover ? "var(--signal)" : "var(--border-hair)"),
      padding: "var(--sp-5)",
      transition: "border-color var(--dur-base), transform var(--dur-snap)",
      transform: hover ? "translate(-2px,-2px)" : "none",
      boxShadow: hover ? "var(--shadow-signal)" : "none",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "var(--sp-4)"
    }
  }, kicker ? /*#__PURE__*/React.createElement(__ds_scope.Kicker, null, kicker) : /*#__PURE__*/React.createElement("span", null), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--t-folio)",
      letterSpacing: "0.2em",
      color: "var(--text-caption)"
    }
  }, String(index).padStart(2, "0"))), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-condensed)",
      textTransform: "uppercase",
      fontSize: featured ? "var(--t-h3)" : "var(--t-h4)",
      lineHeight: 0.92,
      letterSpacing: "-0.01em",
      margin: "0 0 var(--sp-3)",
      color: hover ? "var(--signal)" : "var(--text-strong)",
      transition: "color var(--dur-base)"
    }
  }, title), dek && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--t-small)",
      lineHeight: 1.5,
      color: "var(--text-muted)",
      margin: "0 0 var(--sp-4)",
      maxWidth: "44ch"
    }
  }, dek), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--sp-3)"
    }
  }, byline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-typewriter)",
      fontSize: "var(--t-caption)",
      color: "var(--text-caption)"
    }
  }, byline), tag && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: "outline",
    rotate: false
  }, tag)));
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PullQuote.jsx
try { (() => {
/**
 * FLAT PullQuote — an oversized Abril Fatface quote that breaks out of the
 * column. A single word can be knocked into magenta. Attribution in typewriter.
 */
function PullQuote({
  children,
  cite,
  skew = false
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: "var(--sp-7) 0",
      paddingLeft: "var(--sp-5)",
      borderLeft: "var(--bw-slab) solid var(--signal)",
      transform: skew ? "skewY(var(--skew-zine))" : "none"
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2rem, 5vw, 3.75rem)",
      lineHeight: 0.98,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)"
    }
  }, children), cite && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: "var(--sp-4)",
      fontFamily: "var(--font-typewriter)",
      fontSize: "var(--t-small)",
      color: "var(--text-muted)"
    }
  }, "\u2014 ", cite));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FLAT Checkbox — a hard square that stamps a magenta fill with an ink "×"
 * (not a tick — this is a zine). Mono label.
 */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  id,
  ...rest
}) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const cbId = id || (label ? "cb-" + label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const toggle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: "20px",
      height: "20px",
      flex: "none",
      background: on ? "var(--signal)" : "var(--surface-well)",
      border: "var(--bw-rule) solid " + (on ? "var(--signal)" : "var(--border-rule)"),
      transition: "background var(--dur-snap), border-color var(--dur-snap)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-condensed)",
      fontSize: "18px",
      lineHeight: 1,
      color: "var(--ink-900)"
    }
  }, on ? "×" : ""), /*#__PURE__*/React.createElement("input", _extends({
    id: cbId,
    type: "checkbox",
    checked: isControlled ? checked : undefined,
    defaultChecked: isControlled ? undefined : defaultChecked,
    onChange: toggle,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "15px",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FLAT Input — a dark well with a hard rule that goes magenta on focus.
 * Mono label sits above, spaced and uppercase. Sharp corners.
 */
function Input({
  label,
  hint,
  type = "text",
  id,
  ...rest
}) {
  const inputId = id || (label ? "in-" + label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: "block"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: focused ? "var(--signal)" : "var(--text-muted)",
      marginBottom: "7px",
      transition: "color var(--dur-base)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      width: "100%",
      boxSizing: "border-box",
      background: "var(--surface-well)",
      color: "var(--text-strong)",
      fontFamily: "var(--font-sans)",
      fontSize: "16px",
      padding: "12px 14px",
      border: "var(--bw-rule) solid " + (focused ? "var(--signal)" : "var(--border-rule)"),
      borderRadius: "var(--radius-0)",
      outline: "none",
      transition: "border-color var(--dur-base)"
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontFamily: "var(--font-typewriter)",
      fontSize: "12px",
      color: "var(--text-caption)",
      marginTop: "6px"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/zine_reader/Article.jsx
try { (() => {
// FLAT zine reader — the reading view. Headline, lede, columns, breakout quote.
const {
  Kicker: ArtKicker,
  PullQuote: ArtPullQuote,
  Tag: ArtTag,
  Button: ArtButton
} = window.FLATDesignSystem_07a101;
function Article({
  article,
  onBack,
  onSubscribe
}) {
  const a = article;
  return /*#__PURE__*/React.createElement("article", {
    style: {
      paddingBottom: "var(--sp-9)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    className: "flat-grain",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "var(--sp-7) var(--page-margin) var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      marginBottom: "var(--sp-5)",
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, "\u2190 Back to contents"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement(ArtKicker, null, a.kicker)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-condensed)",
      textTransform: "uppercase",
      fontSize: "clamp(3rem, 9vw, 7rem)",
      lineHeight: 0.86,
      letterSpacing: "-0.015em",
      color: "var(--text-strong)",
      margin: "0 0 var(--sp-5)",
      maxWidth: "16ch"
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-4)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flat-byline"
  }, a.byline), /*#__PURE__*/React.createElement("span", {
    className: "flat-folio",
    style: {
      color: "var(--text-caption)"
    }
  }, "FOLIO ", String(a.index).padStart(2, "0"), " \xB7 ", a.read), /*#__PURE__*/React.createElement(ArtTag, {
    tone: "outline",
    rotate: false
  }, a.tag))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--page-margin)",
      marginBottom: "var(--sp-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flat-halftone",
    style: {
      height: "320px",
      border: "var(--bw-rule) solid var(--border-rule)",
      backgroundColor: "var(--magenta-900)",
      display: "flex",
      alignItems: "flex-end",
      padding: "var(--sp-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flat-folio",
    style: {
      background: "var(--ink-900)",
      padding: "4px 8px"
    }
  }, "FIG. 1 \u2014 DUOTONE PLATE (image well)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--page-margin)",
      maxWidth: "920px",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "flat-lede",
    style: {
      marginBottom: "var(--sp-6)"
    }
  }, a.dek), /*#__PURE__*/React.createElement("div", {
    style: {
      columnWidth: "320px",
      columnGap: "var(--sp-7)"
    }
  }, a.body.map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: "0 0 var(--sp-5)",
      maxWidth: "none"
    }
  }, para))), /*#__PURE__*/React.createElement(ArtPullQuote, {
    cite: a.quoteCite,
    skew: true
  }, a.quote), /*#__PURE__*/React.createElement("div", {
    style: {
      columnWidth: "320px",
      columnGap: "var(--sp-7)"
    }
  }, a.bodyAfter.map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: "0 0 var(--sp-5)",
      maxWidth: "none"
    }
  }, para))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "var(--bw-slab) solid var(--signal)",
      marginTop: "var(--sp-6)",
      paddingTop: "var(--sp-5)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "var(--sp-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--t-h4)",
      color: "var(--bone-0)"
    }
  }, "FLAT", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, ".")), /*#__PURE__*/React.createElement(ArtButton, {
    variant: "signal",
    onClick: onSubscribe
  }, "Get the next issue"))));
}
window.FLATArticle = Article;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/zine_reader/Article.jsx", error: String((e && e.message) || e) }); }

// ui_kits/zine_reader/CoverContents.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// FLAT zine reader — cover + contents. The masthead bleeds, then a contents grid.
const {
  ArticleCard: CCArticleCard,
  Tag: CCTag
} = window.FLATDesignSystem_07a101;
function CoverContents({
  articles,
  onOpen
}) {
  const [lead, ...rest] = articles;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    className: "flat-grain",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "var(--sp-8) var(--page-margin) var(--sp-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      flexWrap: "wrap",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flat-kicker"
  }, "A Zine For Flat Thoughts"), /*#__PURE__*/React.createElement("span", {
    className: "flat-byline"
  }, "Winter \xB7 printed at 2am")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--bone-0)",
      fontSize: "clamp(7rem, 28vw, 26rem)",
      lineHeight: 0.72,
      letterSpacing: "-0.06em",
      margin: "0.05em 0 0",
      whiteSpace: "nowrap"
    }
  }, "FLAT", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "var(--bw-slab) solid var(--signal)",
      marginTop: "var(--sp-2)",
      paddingTop: "var(--sp-3)",
      flexWrap: "wrap",
      gap: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flat-folio"
  }, "ISSUE \u2116 07 \u2014 THE FLATNESS ISSUE"), /*#__PURE__*/React.createElement("span", {
    className: "flat-folio",
    style: {
      color: "var(--text-muted)"
    }
  }, articles.length, " dispatches inside"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--sp-6) var(--page-margin)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.preventDefault();
      onOpen(lead.id);
    },
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(CCArticleCard, _extends({}, lead, {
    featured: true,
    href: "#"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 var(--page-margin) var(--sp-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-4)",
      margin: "0 0 var(--sp-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flat-stack",
    style: {
      fontSize: "var(--t-h4)",
      color: "var(--text-strong)"
    }
  }, "IN THIS ISSUE"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: "var(--bw-rule)",
      background: "var(--border-rule)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "var(--sp-4)"
    }
  }, rest.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    onClick: () => onOpen(a.id),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(CCArticleCard, _extends({}, a, {
    href: "#"
  })))))));
}

// Make the featured lead clickable by wrapping (ArticleCard renders an <a href="#">).
window.FLATCoverContents = CoverContents;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/zine_reader/CoverContents.jsx", error: String((e && e.message) || e) }); }

// ui_kits/zine_reader/Nav.jsx
try { (() => {
// FLAT zine reader — top navigation bar.
// Reads primitives from the compiled bundle namespace.
const {
  Button: NavButton,
  Badge: NavBadge
} = window.FLATDesignSystem_07a101;
function Nav({
  onHome,
  onSubscribe,
  current
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px var(--page-margin)",
      background: "color-mix(in srgb, var(--ink-900) 86%, transparent)",
      backdropFilter: "blur(6px)",
      borderBottom: "var(--bw-rule) solid var(--border-rule)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onHome,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      display: "flex",
      alignItems: "baseline",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "30px",
      color: "var(--bone-0)",
      letterSpacing: "-0.04em",
      lineHeight: 1
    }
  }, "FLAT", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, "."))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--sp-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flat-folio",
    style: {
      color: "var(--text-caption)",
      whiteSpace: "nowrap"
    }
  }, "ISSUE \u2116 07"), /*#__PURE__*/React.createElement("button", {
    onClick: onHome,
    style: navLink(current === "home")
  }, "CONTENTS"), /*#__PURE__*/React.createElement(NavButton, {
    size: "sm",
    variant: current === "subscribe" ? "knockout" : "signal",
    onClick: onSubscribe
  }, "Subscribe")));
}
function navLink(active) {
  return {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: active ? "var(--signal)" : "var(--text-muted)"
  };
}
window.FLATNav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/zine_reader/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/zine_reader/Subscribe.jsx
try { (() => {
// FLAT zine reader — subscribe screen. Stark, loud, one job.
const {
  Input: SubInput,
  Checkbox: SubCheckbox,
  Button: SubButton,
  Kicker: SubKicker
} = window.FLATDesignSystem_07a101;
function Subscribe({
  onBack
}) {
  const [done, setDone] = React.useState(false);
  const [email, setEmail] = React.useState("");
  return /*#__PURE__*/React.createElement("section", {
    className: "flat-grain",
    style: {
      position: "relative",
      overflow: "hidden",
      minHeight: "70vh",
      padding: "var(--sp-8) var(--page-margin)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      position: "absolute",
      top: "var(--sp-5)",
      left: "var(--page-margin)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "760px"
    }
  }, /*#__PURE__*/React.createElement(SubKicker, null, "No spam \xB7 just dispatches"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-condensed)",
      textTransform: "uppercase",
      fontSize: "clamp(3.5rem, 12vw, 9rem)",
      lineHeight: 0.82,
      letterSpacing: "-0.02em",
      color: "var(--text-strong)",
      margin: "var(--sp-3) 0 var(--sp-5)"
    }
  }, "GET ", /*#__PURE__*/React.createElement("span", {
    className: "flat-hot"
  }, "FLAT"), /*#__PURE__*/React.createElement("br", null), "IN YOUR INBOX"), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: "var(--bw-rule) solid var(--signal)",
      padding: "var(--sp-5)",
      maxWidth: "520px",
      boxShadow: "var(--shadow-signal)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "flat-lede",
    style: {
      margin: 0
    }
  }, "Filed. Issue \u2116 08 lands in ", /*#__PURE__*/React.createElement("span", {
    className: "flat-hot"
  }, email || "your inbox"), " when I've had coffee.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    },
    style: {
      maxWidth: "520px",
      display: "flex",
      flexDirection: "column",
      gap: "var(--sp-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--sp-3)",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SubInput, {
    label: "Email",
    type: "email",
    required: true,
    placeholder: "you@somewhere.zine",
    value: email,
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement(SubButton, {
    variant: "signal",
    size: "lg",
    type: "submit",
    as: "button"
  }, "Subscribe")), /*#__PURE__*/React.createElement(SubCheckbox, {
    label: "Also mail me the print edition (it's better)",
    defaultChecked: true
  })), /*#__PURE__*/React.createElement("p", {
    className: "flat-byline",
    style: {
      marginTop: "var(--sp-6)",
      maxWidth: "46ch"
    }
  }, "FLAT is one person, a dark room, and a magenta bulb. Roughly monthly. Unsubscribe by ignoring it.")));
}
window.FLATSubscribe = Subscribe;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/zine_reader/Subscribe.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

})();
