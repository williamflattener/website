// Builds the live site from _src/ into the repo root.
//   cd _src && npm install && npm run build
// Output: ../index.html, ../assets/site.css, ../assets/site.js
// (_src/ is ignored by GitHub Pages because the folder name starts with "_".)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { transformSync } from "esbuild";

const require = createRequire(import.meta.url);
const here = (p) => new URL(p, import.meta.url);
const read = (p) => readFileSync(here(p), "utf8");
const out = (p) => new URL("../" + p, import.meta.url);

// CSS, in the same order the design prototype loaded it.
const CSS = ["colors", "typography", "spacing", "effects", "base", "site", "noir", "kinetic", "calm"];
const css = transformSync(CSS.map((n) => read(`css/${n}.css`)).join("\n"), { loader: "css", minify: true }).code;

// JS: React (production), the FLAT component bundle, runtime helpers, then the app.
const jsx = transformSync(read("js/shared.jsx") + "\n" + read("js/home.jsx"), {
  loader: "jsx", jsx: "transform", jsxFactory: "React.createElement", jsxFragment: "React.Fragment",
  target: "es2019", minify: true,
}).code;
const min = (code) => transformSync(code, { loader: "js", target: "es2019", minify: true }).code;
const js = [
  read("node_modules/react/umd/react.production.min.js"),
  read("node_modules/react-dom/umd/react-dom.production.min.js"),
  min(read("js/_ds_bundle.js")),
  min(read("js/image-slot.js")),
  min(read("js/kinetic.js")),
  "(function(){" + jsx + "})();",
].join("\n;\n");

mkdirSync(out("assets"), { recursive: true });
writeFileSync(out("assets/site.css"), css);
writeFileSync(out("assets/site.js"), js);

// Cache-bust by content so returning visitors get the new build.
const v = (s) => require("node:crypto").createHash("sha1").update(s).digest("hex").slice(0, 8);
writeFileSync(out("index.html"), read("index.html")
  .replace("assets/site.css", `assets/site.css?v=${v(css)}`)
  .replace("assets/site.js", `assets/site.js?v=${v(js)}`));

console.log(`site.css ${(css.length / 1024).toFixed(1)} KB, site.js ${(js.length / 1024).toFixed(1)} KB`);
