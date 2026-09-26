// FLATTENER — single-page site: hero, writing, about, Flatposting, newsletter, links.
// Previous multi-page versions preserved in assets/archive/.
const { Button, Input } = window.FLATDesignSystem_07a101;
const PATREON = "https://www.patreon.com/william_flattener";
const FLATPOSTING = "https://flatposting.lovable.app/";

const BOOKS = [
{
  id: "cover-commanderz", cover: "assets/img/cover-commander-z.webp", title: "Commander Z and the Game Fellows",
  sub: "An Isekai GameLit", kicker: "LitRPG · Ongoing",
  dek: "Drawn into a realm where every video game coexists and clashes, streamer Commander Zideo must use his platforming skills to free the city of Ludopolis before the Boss Council invades.",
  href: "fiction-commander-z.html", rr: "https://www.royalroad.com/fiction/77808/commander-z-and-the-game-fellows-isekai-gamelit"
},
{
  id: "cover-dumpstat", cover: "assets/img/cover-dump-stat.webp", title: "The Dump Stat",
  sub: "Reincarnated into my barbarian's Wisdom", kicker: "Progression Fantasy · Ongoing",
  dek: "Don't you hate it when you sit down for D&D night, and instead of becoming the musclebound Barbarian on your character sheet, you are reincarnated inside him as his unused Wisdom attribute?",
  href: "fiction-dump-stat.html", rr: "https://www.royalroad.com/fiction/155086/the-dump-stat-reincarnated-into-my-barbarians"
}];

const ONLINE = [
{ plat: "Fiction", name: "Royal Road", href: "https://www.royalroad.com/profile/378454" },
{ plat: "Reading", name: "Flatposting", href: "https://flatposting.lovable.app/" },
{ plat: "Community", name: "Discord", href: "https://discord.gg/6sm7TZEneT" },
{ plat: "Social", name: "Bluesky", href: "https://bsky.app/profile/williamflattener.bsky.social" },
{ plat: "Social", name: "Instagram", href: "https://www.instagram.com/william.flattener/" },
{ plat: "Streaming", name: "Twitch", href: "https://www.twitch.tv/williamflattener" }];


function Hero() {
  const [i, setI] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [manual, setManual] = React.useState(false);
  const swipe = React.useRef(null);
  const [email, setEmail] = React.useState(false);
  const N = 4;
  const go = (n) => setI((n + N) % N);
  const pick = (n) => {setManual(true);go(n);};
  // Default: advance every 11s, before the 12s background clip loops, and
  // don't pause on hover. Once the visitor uses the controls, the original
  // rules apply: 7s slides that pause on hover. Focus inside (e.g. typing
  // an email) always pauses.
  const dwell = manual ? 7000 : 11000;
  const paused = focus || manual && hover;
  React.useEffect(() => {
    if (paused || window.wfReduced()) return;
    const t = setTimeout(() => go(i + 1), dwell);
    return () => clearTimeout(t);
  }, [i, paused, dwell]);
  // Each slide's video starts from the top when the slide comes in.
  React.useEffect(() => {
    const v = document.querySelector(".car__bg--" + i + " video");
    if (v) try {v.currentTime = 0;} catch (e) {}
  }, [i]);
  const book = (b) =>
  <div className="car__grid">
      <div className="car__copy">
        <h2 className="calm-hero__h"><Mix text={b.title} suffix={<span className="dot">.</span>} /></h2>
        <p className="calm-hero__p">{b.dek}</p>
        <div className="calm-cta">
          <Button as="a" href={b.rr} target="_blank" rel="noopener noreferrer" variant="signal" size="lg">Read on Royal Road ↗︎</Button>
        </div>
      </div>
      <a className="book3d" href={b.rr} target="_blank" rel="noopener noreferrer" aria-label={b.title + " on Royal Road"}>
        <span className="book3d__inner">
          <span className="book3d__slab"></span>
          <span className="book3d__back" data-mirror={b.id}></span>
          <span className="book3d__pages"></span>
          <span className="book3d__face" data-mirror={b.id}><span className="car__cover-ph">{b.title}</span></span>
        </span>
      </a>
    </div>;
  const slides = [
  <div className="car__grid">
      <div className="car__copy">
        <h1 className="calm-hero__h"><Mix text="Next-level webfiction" italic={false} suffix={<span className="dot">.</span>} /></h1>
        <p className="calm-hero__p">Science fiction and fantasy inspired by the infinite potential of gameworlds.</p>
        <div className="calm-cta">
          <Button as="a" href="#writing" variant="signal" size="lg">See the writing ↗︎</Button>
          <Button as="a" href={PATREON} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">Support on Patreon ↗︎</Button>
        </div>
      </div>
      <div className="polaroid-3d">
      <div className="polaroid">
        <div className="polaroid__img">
        <image-slot shape="rect" id="hero-portrait" src="assets/img/headshot-hero.webp" alt="William Flattener"></image-slot>
        </div>
      </div>
      </div>
    </div>,
  book(BOOKS[0]),
  book(BOOKS[1]),
  <div className="car__grid car__grid--one">
      <div className="car__copy">
        <h2 className="calm-hero__h"><Mix text="Subscribe to Dispatches" suffix={<span className="dot">.</span>} /></h2>
        <p className="calm-hero__p">Subscribe for book criticism and game thoughts, wildly unpopular opinions, and problematic investigations. Occasional screeds; never spam.</p>
        {email === "done" ?
        <p className="signup__done" role="status">{WF_THANKS}</p> :
        <form className="signup__form car__form" onSubmit={(e) => wfSubscribe(e, setEmail)}>
            <Input label="Email" id="car-email" type="email" name="email" required placeholder="you@somewhere.com" />
            <Button type="submit" variant="signal" size="lg" disabled={email === "busy"}>{email === "busy" ? "Subscribing…" : "Subscribe"}</Button>
          </form>}
      </div>
    </div>];
  const labels = ["Webfiction", "Commander Z", "The Dump Stat", "Newsletter"];
  return (
    <section className="calm-hero car" id="top" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setFocus(true)} onBlur={(e) => {if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);}}>
      <div className="car__bgs" aria-hidden="true">
        {["assets/video/tunnel.mp4?v=3", "assets/video/clouds.mp4?v=3", "assets/video/bokeh-dust.mp4?v=3", "assets/video/keyboard.mp4?v=3"].map((src, n) =>
        src ?
        <div key={n} className={"car__bg car__bg--vid car__bg--" + n + (n === i ? " is-on" : "")}>
            <video src={src} muted loop playsInline preload={n === 0 ? "auto" : "metadata"} data-bgv={n === i ? "on" : "off"} data-rate={n === 3 ? "0.5" : "1"}></video>
          </div> :
        <div key={n} className={"car__bg" + (n === i ? " is-on" : "")} data-mirror="hero-portrait"></div>
        )}
      </div>
      <div className="wrap">
        <div className="car__stage" aria-roledescription="carousel" onKeyDown={(e) => {if (e.key === "ArrowRight") pick(i + 1);if (e.key === "ArrowLeft") pick(i - 1);}}
        onTouchStart={(e) => {const t = e.touches[0];swipe.current = { x: t.clientX, y: t.clientY };}}
        onTouchEnd={(e) => {
          const s0 = swipe.current;swipe.current = null;
          if (!s0) return;
          const t = e.changedTouches[0], dx = t.clientX - s0.x, dy = t.clientY - s0.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) pick(dx < 0 ? i + 1 : i - 1);
        }}>
          {slides.map((s, n) =>
          <div key={n} className={"car__slide" + (n === i ? " is-on" : "")} aria-hidden={n !== i} inert={n !== i ? "" : undefined} aria-label={(n + 1) + " of " + N}>{s}</div>
          )}
        </div>
        <div className="car__ctrl">
          <button type="button" className="car__arrow" onClick={() => pick(i - 1)} aria-label="Previous">‹</button>
          {labels.map((l, n) =>
          <button type="button" key={l} className="car__tab" aria-label={l} aria-current={n === i ? "true" : undefined} onClick={() => pick(n)}>
              <span className={"car__fill" + (n === i && !paused ? " run" : "")} style={n === i ? { animationDuration: dwell + "ms" } : undefined} key={n === i ? "on" + i + dwell : "off"}></span>
            </button>
          )}
          <button type="button" className="car__arrow" onClick={() => pick(i + 1)} aria-label="Next">›</button>
        </div>
      </div>
    </section>);
}

function Writing() {
  return (
    <section className="section" id="writing">
      <div className="wrap">
        <h2 className="calm-h2">Writing</h2>
        <div className="calm-books">
          {BOOKS.map((b) =>
          <article className="calm-book" key={b.id}>
              <a className="calm-book__cover" href={b.rr} target="_blank" rel="noopener noreferrer" aria-label={b.title + " on Royal Road"}>
                <image-slot shape="rect" id={b.id} src={b.cover} alt={b.title + " cover"}></image-slot>
              </a>
              <div className="calm-book__body">
                <h3 className="calm-book__t"><a href={b.rr} target="_blank" rel="noopener noreferrer">{b.title}</a></h3>
                <p className="calm-book__sub">{b.sub}</p>
                <p className="calm-book__dek">{b.dek}</p>
                <div className="calm-links">
                  <a className="hot-link" href={b.rr} target="_blank" rel="noopener noreferrer">Read on Royal Road ↗︎</a>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);
}

function About() {
  return (
    <section className="section about-vid" id="about">
      <video className="about-vid__v" data-bgv="on" data-rate="0.5" muted loop playsInline preload="auto" aria-hidden="true" src="assets/video/embers.mp4?v=3"></video>
      <div className="wrap about-calm">
        <div className="about-calm__photo">
          <image-slot shape="circle" id="about-portrait" src="assets/img/headshot-about.webp" alt="William Flattener"></image-slot>
        </div>
        <div className="about-calm__copy">
          <h2 className="calm-h2"><Mix text="William Flattener" suffix={<span className="dot">.</span>} /></h2>
          <div className="prose">
              <p>
                William Flattener is a writer of science fiction, fantasy, and gamelit / progression fantasy. He is a <strong>10-time NaNoWriMo winner</strong> and has worked in a slew of professional content roles, from copywriting to content strategy.
              </p>
              <p>
                His fiction combines <strong>thoughtful prose</strong> with entertaining genre action sequences and humor paired with unique, <strong>systems-driven scenarios</strong>. With a passion for helping new writers build a following and find peers within a genre space, he is a well-read book lover and a keen critic.
              </p>
            </div>
          <div className="calm-cta">
            <Button as="a" href={PATREON} target="_blank" rel="noopener noreferrer" variant="signal" size="lg">Become a Patron ↗︎</Button>
          </div>
        </div>
      </div>
    </section>);
}

const FP_POSTS = [
{ t: "2h", body: "Chapter 4,206,967 of THE DUMP STAT is live now. Subscribe to Patreon to read seventeen thousand chapters ahead.", likes: 48, replies: 0 },
{ t: "1d", body: "Are these heart numbers real? who can say?", likes: 31, replies: 0 },
{ t: "3d", body: "I mean, I can. they're not", likes: 77, replies: 0 }];

function FPMock() {
  return (
    <div className="fpm" aria-hidden="true">
      <div className="fpm__bar">
        <span className="fpm__logo"><img src="assets/img/fp-icon.png" alt="" />flatposting<span className="dot">.</span></span>
        <span className="fpm__follow">Following</span>
      </div>
      <div className="fpm__lock">Only William can post here.</div>
      {FP_POSTS.map((p, i) =>
      <div className="fpm__post" key={i}>
          <img className="fpm__av" src="assets/img/avatar.png" alt="" />
          <div className="fpm__main">
            <div className="fpm__who"><b>William Flattener</b><span>· {p.t}</span></div>
            <p className="fpm__body">{p.body}</p>
            <div className="fpm__acts"><span>♥ {p.likes}</span><span>Replies off</span></div>
          </div>
        </div>
      )}
    </div>);
}

function Flatposting() {
  return (
    <section className="section" id="flatposting">
      <div className="wrap fp">
        <div>
          <h2 className="calm-h2">Flatposting</h2>
          <div className="prose">
            <p>Flatposting is my social network where only I can post. Follow along there for updates, stray thoughts, and news between chapters.</p>
          </div>
          <div className="calm-cta">
            <Button as="a" href={FLATPOSTING} target="_blank" rel="noopener noreferrer" variant="signal" size="lg">Visit Flatposting ↗︎</Button>
          </div>
        </div>
        <FPMock />
      </div>
    </section>);
}

const SOCIAL_ICON = { Discord: "discord", Bluesky: "bluesky", Instagram: "instagram", Twitch: "twitch" };
function Online() {
  return (
    <section className="section" id="online">
      <div className="wrap">
        <h2 className="calm-h2">Find William Online</h2>
        <ul className="plat">
          {ONLINE.map((o) => {
            const slug = SOCIAL_ICON[o.name];
            const src = o.name === "Flatposting" ? "assets/img/fp-icon.png" : o.name === "Royal Road" ? "https://www.google.com/s2/favicons?domain=royalroad.com&sz=64" : slug ? "https://cdn.simpleicons.org/" + slug + "/ffffff" : null;
            return (
              <li key={o.name}>
                <a className={"plat__a" + (o.name === "Flatposting" || o.name === "Royal Road" ? " plat__a--img" : "")} href={o.href} target="_blank" rel="noopener noreferrer">
                  {src ? <img className="plat__i" src={src} alt="" onError={(ev) => {ev.currentTarget.style.display = "none";}} /> : null}
                  <span className="plat__w">{o.name}</span>
                </a>
              </li>);
          })}
        </ul>
      </div>
    </section>);
}

function HomeApp() {
  return (
    <div>
      <WFNav current="home" />
      <Hero />
      <Writing />
      <About />
      <Flatposting />
      <WFSignup />
      <Online />
      <WFFooter />
    </div>);
}

/* Slide 1 video: zoomed and centred on the headshot polaroid. */
(function aimTunnel() {
  const fit = () => {
    const car = document.querySelector(".car"), pol = document.querySelector(".polaroid-3d"), v = document.querySelector(".car__bg--0 video");
    if (!car || !pol || !v) return;
    const c = car.getBoundingClientRect(), p = pol.getBoundingClientRect();
    if (!p.width) return;
    const dx = p.left + p.width / 2 - (c.left + c.width / 2);
    const dy = p.top + p.height / 2 - (c.top + c.height / 2);
    const s = Math.max(1.25, 1 + 2 * Math.abs(dx) / c.width + .08, 1 + 2 * Math.abs(dy) / c.height + .08);
    v.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) scale(" + s.toFixed(3) + ")";
  };
  addEventListener("resize", fit);
  new MutationObserver(fit).observe(document.getElementById("app"), { childList: true, subtree: true });
  setTimeout(fit, 300);
})();

/* Background videos: only the visible, active one plays. Everything else
   is paused so the decoder isn't juggling several 1080p streams at once. */
(function bgVideos() {
  if (window.wfReduced()) return;
  let raf = 0;
  const run = () => {
    raf = 0;
    const vh = innerHeight || 800;
    document.querySelectorAll("video[data-bgv]").forEach((v) => {
      const r = (v.closest("section") || v).getBoundingClientRect();
      const want = v.dataset.bgv === "on" && r.bottom > 0 && r.top < vh;
      const rate = parseFloat(v.dataset.rate || "1");
      if (v.playbackRate !== rate) v.playbackRate = rate;
      if (want && v.paused) { v.preload = "auto"; v.play().catch(() => {}); }
      if (!want && !v.paused) v.pause();
    });
  };
  const q = () => { if (!raf) raf = requestAnimationFrame(run); };
  addEventListener("scroll", q, { passive: true });
  addEventListener("resize", q);
  document.addEventListener("visibilitychange", () => { if (document.hidden) document.querySelectorAll("video[data-bgv]").forEach((v) => v.pause()); else q(); });
  new MutationObserver(q).observe(document.getElementById("app"), { subtree: true, childList: true, attributes: true, attributeFilter: ["data-bgv"] });
  setInterval(q, 1500);
})();

ReactDOM.createRoot(document.getElementById("app")).render(<HomeApp />);
