import srLogoDark from "@/assets/sr-logo-dark.png";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import sailing_through_life_together from "@/assets/sailing-through-life-together.webp";

import fantastic_four from "@/assets/fantastic-four.webp";
import flowers_for_a_lasting_love from "@/assets/flowers-for-a-lasting-love.webp";
import never_letting_go from "@/assets/never-letting-go.webp";
import our_favorite_love_story from "@/assets/our-favorite-love-story.webp";
import she_said_yes_again_and_again from "@/assets/she-said-yes-again-and-again.webp";
import silver_looks_good_on_us from "@/assets/silver-looks-good-on-us.webp";
import to_every_sunset_together from "@/assets/to-every-sunset-together.webp";
import where_it_all_began from "@/assets/where-it-all-began.webp";
import noura from "@/assets/noura-1.webp";

import {
  ChevronDown,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import Ornament from "./Ornament";
import ScrollHint from "./ScrollHint";
import FallingLeaves from "./FallingLeaves";
import { Bloom, Sprig, StationeryFrame } from "./Florals";
import TextType from "./TextType";
import "./invite.css";
import heroSection from "@/assets/sr-5.webp";

/* ------- Live CDN imagery ------- */
const HERO_IMAGES = [
  { src: heroSection, alt: "A joyful family moment" },
  // { src: bright_lights_warm_love, alt: "Bright lights and warm love" },
  // { src: flowers_for_a_lasting_love, alt: "Flowers for a lasting love" },
  // { src: never_letting_go, alt: "Never letting go" },
  { src: our_favorite_love_story, alt: "Our favorite love story" },
  // { src: she_said_yes_again_and_again, alt: "She said yes again and again" },
  // { src: silver_looks_good_on_us, alt: "Silver looks good on us" },
  // { src: to_every_sunset_together, alt: "Together through every sunset" },
  // { src: where_it_all_began, alt: "Where it all began" },
];
const FLORAL_IMG =
  "https://images.pexels.com/photos/13656187/pexels-photo-13656187.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const MOMENTS = [
  {
    img: silver_looks_good_on_us,
    alt: "Silver looks good on us",
    caption: "Silver looks good on us.",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: she_said_yes_again_and_again,
    alt: "She said yes, again and again",
    caption: "She said yes, again and again",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: flowers_for_a_lasting_love,
    alt: "Flowers for a lasting love",
    caption: "Flowers for a lasting love",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: never_letting_go,
    alt: "Never letting go",
    caption: "Never letting go",
    tilt: "-1.6deg",
    d: ".27s",
  },
  // {
  //   img: bright_lights_warm_love,
  //   alt: "Bright lights, warm love.",
  //   caption: "Bright lights, warm love.",
  //   tilt: "-2.6deg",
  //   d: ".05s",
  // },
  {
    img: sailing_through_life_together,
    alt: "Sailing through life together",
    caption: "Sailing through life together",
    tilt: "-2.6deg",
    d: ".05s",
  },
  {
    img: our_favorite_love_story,
    alt: "Our favorite love story",
    caption: "Our favorite love story",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: where_it_all_began,
    alt: "Where it all began",
    caption: "Where it all began",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: to_every_sunset_together,
    alt: "To every sunset together",
    caption: "To every sunset together",
    tilt: "-1.6deg",
    d: ".27s",
  },
  {
    img: fantastic_four,
    alt: "Fantastic four",
    caption: "Fantastic four!",
    tilt: "1.8deg",
    d: ".16s",
  },
];
const JOURNEY = [
  {
    date: "September 2001",
    title: "Where it began",
    text: "A meeting in college and love at first sight.",
    d: ".05s",
  },
  {
    date: "October 2001",
    title: "Two hearts one promise",
    text: "We exchanged rings and hearts forever.",
    d: ".15s",
  },
  {
    date: "December 2001",
    title: "A celebration of commitment",
    text: "Under a thousand fairy lights, We finally tied a knot  for a lifetime.",
    d: ".25s",
  },
  {
    date: "July 2003 ",
    title: " Little princess arrives",
    text: "Blessed with a little angel who filled our life with happiness -khushi",
    d: ".35s",
  },
  {
    date: "May 2005",
    title: "Happiness Doubled",
    text: "Beautiful gift  by God to us -paarth.",
    d: ".35s",
  },
  {
    date: "Dec 2026",
    title: "Together we celebrate",
    text: "Looking back old memories and promise to make countless new ones.",
    d: ".35s",
  },
];

const VENUE_NAME = "Noura Chandigarh - The Green Escape";
const VENUE_ADDR = "Near Ramgarh fort,  SAS Nagar, Chandigarh, India";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDR}`)}`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDR}`)}`;
const ANNIVERSARY_DATE = new Date("2026-12-08T20:00:00+05:30");

/** scroll-reveal delay helper */
const rv = (d?: string): CSSProperties => ({ ["--d" as string]: d ?? "0s" });



function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const totalSeconds = Math.ceil(diff / 1000);
    return {
      complete: totalSeconds === 0,
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds / 3600) % 24,
      mins: Math.floor(totalSeconds / 60) % 60,
      secs: totalSeconds % 60,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function useScrollReveal(
  containerRef: React.RefObject<HTMLDivElement | null>,
  active: boolean
) {
  useEffect(() => {
    if (!active) return;
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { root, threshold: 0, rootMargin: "0px 0px 20px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [containerRef, active]);
}

export default function Invitation(props: {
  leaving: boolean;
  onSeal: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}) {
  const { leaving, onSeal } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryDrag = useRef<{ x: number; left: number } | null>(null);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const t = useCountdown(ANNIVERSARY_DATE);

  // Enter at the hero; the opened envelope remains available above it.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const cover = coverRef.current;
    if (root && cover) root.scrollTo({ top: cover.offsetHeight, behavior: "instant" });
  }, []);

  /* Animate the sheet up after mount */
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    HERO_IMAGES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });

    const interval = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % HERO_IMAGES.length);
    }, 5_000);

    return () => window.clearInterval(interval);
  }, []);

  /* Scroll-driven parallax for hero + quote band */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.max(0, root.scrollTop - (coverRef.current?.offsetHeight ?? 0));
        root.style.setProperty("--px", `${Math.min(y * 0.32, root.clientHeight * 0.03)}px`);
        root.style.setProperty("--py", `${y * 0.22}px`);
        root.style.setProperty("--ph", `${Math.min(y * 0.16, 12)}px`);
        const max = root.scrollHeight - root.clientHeight;
        root.style.setProperty("--prog", String(max > 0 ? root.scrollTop / max : 0));
      });
    };
    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useScrollReveal(rootRef, entered);


  const countdownCells: Array<[number, string]> = [
    [t.days, "Days"],
    [t.hours, "Hours"],
    [t.mins, "Mins"],
    [t.secs, "Secs"],
  ];


  return (
    <div ref={rootRef} className={`invite${entered ? " in" : ""}${leaving ? " leaving" : ""}`}>
      {/* ===== Atmosphere: drift bokeh + falling petals ===== */}
      <FallingLeaves />

      {/* ===== Scroll progress ribbon ===== */}
      <span className="iv-progress" aria-hidden="true" />

      <section ref={coverRef} className="iv-envelope-page" aria-label="Opened anniversary envelope">
        <div className="iv-envelope-page-copy">
          <img src={srLogoDark} alt="Sachin and Rukman monogram" />
          <p className="iv-envelope-years">25 Years of Love</p>
          <p className="iv-envelope-date serif">December 8, 2026</p>
          <p className="iv-envelope-time serif">08:00 PM</p>
          <Ornament className="orn" />
          <h2 className="serif">You Are<br />Cordially Invited</h2>
          <Ornament className="orn" flip />
          <Heart className="heart-pump" size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </div>
        <ScrollHint onClick={() => {
          rootRef.current?.scrollTo({
            top: coverRef.current?.offsetHeight ?? 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          });
        }} />
      </section>

      <div className="iv-opening">
      {/* ================= COUNTDOWN ================= */}
      <section className="iv-count band">
        <p className="iv-count-title">
          <span aria-hidden="true" />
          <span className="serif">The Countdown Begins</span>
          <span aria-hidden="true" />
        </p>
        {t.complete ? (
          <p className="iv-count-celebration serif" role="status">
            Today we celebrate 25 years of love
          </p>
        ) : (
          <>
            <div className="iv-count-inner rv">
              {countdownCells.map(([v, label]) => (
                <div className="cd-cell" key={label}>
                  <span className="cd-num serif" key={`${label}-${v}`}>
                    {String(v).padStart(2, "0")}
                  </span>
                  <span className="cd-label">{label}</span>
                </div>
              ))}
            </div>
            <p className="iv-count-sub">until we celebrate 25 years of love</p>
          </>
        )}
      </section>

      {/* Heart chip between the countdown and hero */}
      <span className="iv-seam" aria-hidden="true">
        <Heart className="heart-pump" size={13} fill="currentColor" strokeWidth={0} />
      </span>

      {/* ================= HERO ================= */}
      <header className="iv-hero">
        {/* ===== Stationery frame around the first-screen image ===== */}
        <StationeryFrame />
        <div className="iv-hero-media">
          {HERO_IMAGES.map((image, index) => (
            <img
              key={image.src}
              className={`iv-hero-img${index === heroIndex ? " is-active" : ""}`}
              src={image.src}
              alt={image.alt}
              aria-hidden={index !== heroIndex}
            />
          ))}
        </div>
        <div className="iv-hero-veil" />
        <div className="iv-hero-copy">
          <p className="iv-kicker rv" style={rv(".1s")}>
            <TextType
              text="Celebrating twenty-five years together"
              typingSpeed={100}
              startDelay={1100}
            />
            <Sparkles className="iv-kicker-star iv-kicker-star-left" size={12} aria-hidden="true" />
            <Sparkles className="iv-kicker-star iv-kicker-star-right" size={10} aria-hidden="true" />
          </p>
          <h1 className="iv-names serif rv" style={rv(".25s")}>
            Sachin <br />& <br /> Rukman
          </h1>
          <div className="iv-date rv" style={rv(".4s")}>
            <Ornament className="orn light" />
            <p>Tuesday</p>
            <p>December 08, 2026</p>
            <p>08:00 PM</p>
            <Ornament className="orn light" flip />
          </div>
        </div>
        
        <div className="iv-scrollcue">
          <span>Scroll</span>
          <ChevronDown size={16} />
        </div>
      </header>
      </div>

      <section className="iv-anniversary rv" aria-label="25 years of love and togetherness">
        <div className="iv-anniversary-emblem">
          <Sparkles className="iv-anniversary-spark" size={15} aria-hidden="true" />
          <span className="iv-anniversary-number serif">25</span>
          <span className="iv-anniversary-years">YEARS</span>
          <span className="iv-anniversary-rule" aria-hidden="true" />
          <span className="iv-anniversary-caption">of love &amp; togetherness</span>
        </div>
      </section>


      {/* ================= INVITATION TEXT ================= */}
      <section className="iv-sec iv-hello">
        <span className="wm wm-hello">
          <Bloom />
        </span>
        <Ornament className="orn rv" />
        {/* <p className="iv-script serif rv" style={rv(".08s")}>
          request the honour of your presence
        </p> */}
        <h2 className="iv-sec-title font-bold! serif rv" style={rv(".16s")}>
          We wish to celebrate our special day
        </h2>
        <p className="iv-body rv font-bold!" style={rv(".24s")}>

Surrounded by those who mean the most, we gather to celebrate 25 years of love, countless moments of joy, shared dreams and enduring bonds. 
<br/>
<br/>
Join us for an unforgettable evening filled with laughter, music, and togetherness!
        </p>
      </section>

      {/* ================= DETAILS CARDS ================= */}
      {/* <section className="iv-sec iv-details">
        {detailCards.map(({ Icon, title, lines, d }) => (
          <article className="iv-card rv" key={title} style={rv(d)}>
            <span className="iv-card-icon">
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <h3>{title}</h3>
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </article>
        ))}
      </section> */}

      {/* ================= MOMENTS GALLERY ================= */}
      <section className="iv-moments">
        <div className="iv-sec pt-0!" style={{ paddingBottom: 0 }}>
          <p className="iv-kicker rv">
            {/* Keepsakes */}
          </p>
          <h2 className="iv-sec-title font-bold! serif rv" style={rv(".08s")}>
            Moments in bloom
          </h2>
          <p className="m-swipe-hint serif">Slide through our memories</p>
        </div>
        <div
          className="m-row"
          ref={galleryRef}
          role="region"
          aria-label="Memories photo album"
          tabIndex={0}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            galleryDrag.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.scrollSnapType = "none";
          }}
          onPointerMove={(event) => {
            const drag = galleryDrag.current;
            if (drag) event.currentTarget.scrollLeft = drag.left + drag.x - event.clientX;
          }}
          onPointerUp={(event) => {
            const drag = galleryDrag.current;
            if (!drag) return;
            const row = event.currentTarget;
            const cards = Array.from(row.children) as HTMLElement[];
            const distance = cards[1].offsetLeft - cards[0].offsetLeft;
            const moved = drag.x - event.clientX;
            const index = Math.max(0, Math.min(cards.length - 1,
              Math.round(drag.left / distance) + (Math.abs(moved) > 40 ? Math.sign(moved) : 0)));
            galleryDrag.current = null;
            row.style.scrollSnapType = "";
            row.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
          }}
          onLostPointerCapture={(event) => {
            galleryDrag.current = null;
            event.currentTarget.style.scrollSnapType = "";
          }}
          onScroll={(event) => {
            const row = event.currentTarget;
            const cards = Array.from(row.children) as HTMLElement[];
            const first = cards[0]?.offsetLeft ?? 0;
            let closest = 0;
            cards.forEach((card, index) => {
              if (Math.abs(card.offsetLeft - first - row.scrollLeft) < Math.abs(cards[closest].offsetLeft - first - row.scrollLeft)) closest = index;
            });
            if (row.scrollLeft >= row.scrollWidth - row.clientWidth - 2) closest = cards.length - 1;
            setMemoryIndex(closest);
          }}
        >
          {MOMENTS.map((m) => (
            <figure
              className="m-card"
              key={m.caption}
              style={{ ...rv(m.d), ["--tilt" as string]: m.tilt }}
            >
              <img src={m.img} alt={m.alt} loading="eager" decoding="async" draggable={false} />
              <p className="iv-script serif text-center pb-0 text-sm! font-bold!">{m.caption}</p>
            </figure>
          ))}
        </div>
        <div className="m-album-dots" aria-label="Choose a memory">
          {MOMENTS.map((memory, index) => (
            <button
              key={memory.caption}
              type="button"
              aria-label={`Show memory ${index + 1}: ${memory.alt}`}
              aria-current={memoryIndex === index ? "true" : undefined}
              onClick={() => {
                const row = galleryRef.current;
                if (!row) return;
                const first = row.children[0] as HTMLElement;
                const card = row.children[index] as HTMLElement;
                row.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
              }}
            ><span /></button>
          ))}
        </div>
      </section>

      {/* ================= QUOTE BAND ================= */}
      <section className="iv-quote band" style={{ backgroundImage: `url(${FLORAL_IMG})` }}>
        <div className="iv-quote-veil" />
        <blockquote className="rv">
          <p className="serif">&ldquo;And so, the adventure begins.&rdquo;</p>
        </blockquote>
      </section>

      {/* ================= OUR JOURNEY TIMELINE ================= */}
      <section className="iv-sec iv-journey">
        <p className="iv-kicker rv">Our Story</p>
        <h2 className="iv-sec-title font-bold! serif rv" style={rv(".08s")}>
          The journey so far
        </h2>
        <div className="j-list">
          <span className="j-stem rv" style={rv(".1s")} aria-hidden="true" />
          {JOURNEY.map((j) => (
            <article className="j-item rv" key={j.title} style={rv(j.d)}>
              <span className="j-dot">
                <Heart className="heart-pump" size={13} fill="currentColor" strokeWidth={0} />
              </span>
              <div className="j-card">
                <span className="j-date">{j.date}</span>
                <h3 className="serif">{j.title}</h3>
                <p>{j.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= VENUE ================= */}
      <section className="iv-welcome rv" aria-label="A warm welcome">
        <Heart className="heart-pump" size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        <p className="iv-welcome-kicker">With open hearts</p>
        <h2 className="serif">Your presence is our greatest gift</h2>
        <p className="iv-welcome-message">
          We can’t wait to welcome you with warm hugs, happy hearts, and an evening
          full of beautiful memories. Come celebrate love, laughter, and twenty-five
          wonderful years with us.
        </p>
        <span className="iv-welcome-signature serif">With love, Sachin &amp; Rukman</span>
      </section>
      <section className="iv-sec iv-venue">
        <span className="wm wm-venue">
          <Sprig />
        </span>
        <h2 className="iv-sec-title font-bold! serif rv" style={rv(".08s")}>
          The Venue
        </h2>
        <figure className="iv-venue-card rv" style={rv(".16s")}>
          <div className="iv-venue-photo" style={{ backgroundImage: `url(${noura})` }}>
            <div className="iv-venue-location">
              <span className="serif">Noura</span>
              <span className="iv-venue-route-label">Find your way to our celebration</span>
            </div>
            <a
              className="iv-venue-directions"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get directions to ${VENUE_NAME}`}
            >
              <MapPin size={15} aria-hidden="true" />
              Directions
            </a>
          </div>
          <figcaption>
            <span className="iv-venue-name serif">{VENUE_NAME}</span>
            <span className="iv-venue-addr">
              <MapPin size={13} /> {VENUE_ADDR}
            </span>
          </figcaption>
        </figure>
        <a
          className="iv-btn rv"
          style={rv(".24s")}
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={16} />
          View Venue Map
        </a>
      </section>

      {/* ================= ADD TO CALENDAR ================= */}
      {/* <section className="iv-cal band">
        <span className="twinkle tk1" aria-hidden="true" />
        <span className="twinkle tk2" aria-hidden="true" />
        <span className="twinkle tk3" aria-hidden="true" />
        <Ornament className="orn rv" />
        <h2 className="iv-sec-title serif rv" style={rv(".08s")}>
          Save the Date
        </h2>
        <p className="iv-body rv" style={rv(".16s")}>
          Add our celebration to your calendar so you never miss a moment of it.
        </p>
        <button type="button" className="iv-btn gold rv" style={rv(".22s")} onClick={downloadICS}>
          <CalendarPlus size={16} />
          Add to Calendar
        </button>
        <p className="iv-fine rv" style={rv(".3s")}>
          Works with Apple, Google &amp; Outlook calendars
        </p>
      </section> */}

      {/* ================= RSVP FORM ================= */}
      {/* <section className="iv-sec rsvp" id="rsvp">
        <span className="wm wm-rsvp">
          <Bloom />
        </span>
        <p className="iv-kicker rv">Répondez s&rsquo;il vous plaît</p>
        <h2 className="iv-sec-title serif rv" style={rv(".08s")}>
          RSVP
        </h2>
        <p className="iv-body rv" style={rv(".14s")}>
          Kindly respond by the 5th of June, 2026.
        </p>

        {submitted ? (
          <div className="iv-success enter">
            <span className="ok-ring">
              <Check size={26} strokeWidth={2.4} />
            </span>
            <h3 className="serif">Thank you, {form.name.split(" ")[0]}!</h3>
            <p>
              {form.attending === "yes"
                ? `We can't wait to celebrate with you — party of ${form.guests}.`
                : "You will be dearly missed, and we treasure your wishes."}
            </p>
            {form.attending === "yes" && (
              <div className="ok-chips">
                <span>
                  <Heart className="heart-pump" size={12} fill="currentColor" strokeWidth={0} /> {form.guests}{" "}
                  {form.guests > 1 ? "guests" : "guest"}
                </span>
                <span>
                  <CalendarPlus size={12} /> July 20, 2026
                </span>
              </div>
            )}
            <button
              type="button"
              className="iv-link"
              onClick={() => {
                setSubmitted(false);
                localStorage.removeItem(RSVP_KEY);
              }}
            >
              Edit your response
            </button>
          </div>
        ) : (
          <form className="iv-form rv" style={rv(".2s")} onSubmit={submit}>
            <label>
              <span>Your name</span>
              <input
                type="text"
                placeholder="e.g. Isabelle Laurent"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <div className="attend">
              <span className="attend-label">Will you join us?</span>
              <div className="attend-opts">
                <button
                  type="button"
                  className={`opt${form.attending === "yes" ? " sel" : ""}`}
                  onClick={() => setForm({ ...form, attending: "yes" })}
                >
                  Joyfully accepts
                </button>
                <button
                  type="button"
                  className={`opt${form.attending === "no" ? " sel" : ""}`}
                  onClick={() => setForm({ ...form, attending: "no" })}
                >
                  Regretfully declines
                </button>
              </div>
            </div>

            <label>
              <span>Guests (including you)</span>
              <div className="stepper">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                  aria-label="Fewer guests"
                >
                  −
                </button>
                <strong className="serif">{form.guests}</strong>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, guests: Math.min(6, form.guests + 1) })}
                  aria-label="More guests"
                >
                  +
                </button>
              </div>
            </label>

            <label>
              <span>Song request or dietary notes</span>
              <textarea
                rows={3}
                placeholder="Song for the dance floor, allergies, anything we should know…"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>

            {error && <p className="iv-error">{error}</p>}

            <button type="submit" className="iv-btn gold wide">
              <Send size={15} />
              Send RSVP
            </button>
          </form>
        )}
      </section> */}

      {/* ================= FOOTER ================= */}
      <footer className="iv-footer">
        <p className="iv-foot-date2 font-bold!">
          With the blessings of Almighty God &amp; love of our<br />
          respected father<br />
          Sh Sham Sunder Jindal
        </p>
        <button
          type="button"
          className="iv-close-seal"
          onClick={onSeal}
          disabled={leaving}
          aria-label="Close invitation and seal the envelope"
          title="Close invitation"
        >
          <img src={srLogoDark} alt="" />
          <span className="iv-close-seal-hint">Tap to seal</span>
        </button>
        {/* <div className="mono-mini serif">
          <span>A</span>
          <Heart className="heart-pump" size={11} fill="currentColor" strokeWidth={0} />
          <span>R</span>
        </div> */}
                <p className="iv-foot-names serif">Your gracious presence would be our greatest honour and joy.</p>
        <p className="iv-foot-date font-bold!">December 8, 2026</p>
        <p className="iv-foot-date2 font-bold!">08:00 PM</p>
        {/* <button
          type="button"
          className="iv-btn ghost"
          onClick={onToggleMusic}
          aria-pressed={musicPlaying}
        >
          <Music2 size={14} />
          {musicPlaying ? "Pause romantic music" : "Play romantic music"}
        </button> */}
        <div className="iv-footer-closing">
          <div className="iv-footer-emblem" aria-hidden="true">
            <span />
            <svg width="72" height="32" viewBox="0 0 72 32" fill="none">
              <path d="M23 20Q16 12 4 13M49 20Q56 12 68 13" stroke="#baa465" strokeWidth="1" />
              <path d="M18 15C15 6 4 6 2 10C3 17 12 19 18 15ZM54 15C57 6 68 6 70 10C69 17 60 19 54 15Z" fill="#c3b66e" />
              <path d="M36 8C28-2 19 6 26 16L36 28L46 16C53 6 44-2 36 8Z" fill="#a9516b" />
              <circle cx="36" cy="15" r="3" fill="#e4c88f" />
            </svg>
            <span />
          </div>
          <p className="iv-footer-love">Made with love, for a love that lasts forever.</p>
          <p className="iv-footer-credit">
            Crafted by <a href="https://coderlala.com" target="_blank" rel="noreferrer">Coderlala Technologies</a>
          </p>
          <div className="iv-footer-finishing-rule" aria-hidden="true"><span /></div>
        </div>
      </footer>
    </div>
  );
}
