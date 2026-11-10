import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Heart, Volume2, VolumeX } from "lucide-react";
import Ornament from "./Ornament";
import srLogoDark from "@/assets/sr-logo-dark.png";
// import WaxSeal from "./WaxSeal";
import Invitation from "./Invitation";
import Burst from "./Burst";
import ScrollHint from "./ScrollHint";
import { THEMES } from "../themes";
import "./envelope.css";

type InvitePhase = "hidden" | "shown" | "leaving";

type Song =
  | { title: string; localSrc: string; remoteSrc?: string }
  | { title: string; localSrc?: string; remoteSrc: string };

const SONGS = [
  // {
  //   title: "Moonlit Promise",
  //   localSrc: "/assets/moonlit-promise.mp3",
  // },
  // {
  //   title: "Forever Together",
  //   remoteSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
  // },
  {
    title: "My Local Song",
    localSrc: "/assets/sr-song.mp3",
  },
] satisfies Song[];

export default function EnvelopeScreen() {
  const [open, setOpen] = useState(false);
  const [invite, setInvite] = useState<InvitePhase>("hidden");
  const [themeIdx] = useState(4);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const theme = THEMES[themeIdx];
  const timers = useRef<number[]>([]);
  const touchStartY = useRef<number | null>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const openEnvelope = () => {
    if (open) return;
    setOpen(true);
    const music = musicRef.current;
    if (music) {
      music.muted = musicMuted;
      void music.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    }
    clearTimers();
  };

  const advanceOnScroll = () => {
    if (open && invite === "hidden") setInvite("shown");
  };

  const toggleMusic = () => {
    const music = musicRef.current;
    if (!music) return;
    if (music.paused || music.muted) {
      music.muted = false;
      setMusicMuted(false);
      void music.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    } else {
      music.muted = true;
      setMusicMuted(true);
    }
  };

  const getSongSource = (song: Song) => song.localSrc ?? song.remoteSrc ?? "";

  const switchSong = (direction: number) => {
    const nextIndex = (songIndex + direction + SONGS.length) % SONGS.length;
    const music = musicRef.current;
    setSongIndex(nextIndex);
    if (!music) return;

    music.src = getSongSource(SONGS[nextIndex]);
    music.load();
    void music.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
  };

  const useRemoteFallback = () => {
    const music = musicRef.current;
    const song = SONGS[songIndex];
    const remoteSrc =
      "remoteSrc" in song && typeof song.remoteSrc === "string" ? song.remoteSrc : undefined;
    if (!music || !remoteSrc || music.src.endsWith(remoteSrc)) return;
    music.src = remoteSrc;
    music.load();
    void music.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
  };

  const closeInvite = () => {
    setOpen(false); /* re-seal the envelope behind the leaving sheet */
    setInvite("leaving");
    clearTimers();
    timers.current.push(window.setTimeout(() => setInvite("hidden"), 680));
  };

  useEffect(() => () => {
    clearTimers();
    musicRef.current?.pause();
  }, []);

  /* Preload every theme pattern so switching styles is instant */
  useEffect(() => {
    THEMES.forEach((t) => {
      const img = new Image();
      img.src = t.pattern;
    });
  }, []);

  const style = {
    ...theme.vars,
    "--pattern-url": `url("${theme.pattern}")`,
    "--env-bg": theme.vars["--env-bg"] ?? "#ecc3b0",
  } as CSSProperties;
  const showEnvelope = invite !== "shown";

  return (
    <div
      className={`env-screen${open ? " is-open" : ""}`}
      style={style}
      onClick={invite === "hidden" ? openEnvelope : undefined}
      onWheel={(event) => {
        if (event.deltaY > 0) advanceOnScroll();
      }}
      onTouchStart={(event) => {
        touchStartY.current = event.touches[0]?.clientY ?? null;
      }}
      onTouchEnd={(event) => {
        const endY = event.changedTouches[0]?.clientY;
        if (touchStartY.current !== null && endY !== undefined && touchStartY.current - endY > 30) {
          advanceOnScroll();
        }
        touchStartY.current = null;
      }}
    >
      <audio
        ref={musicRef}
        muted={musicMuted}
        preload="none"
        src={getSongSource(SONGS[songIndex])}
        onError={useRemoteFallback}
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onEnded={() => switchSong(1)}
      />
      <button
        type="button"
        className="music-corner-toggle"
        aria-label={musicPlaying && !musicMuted ? "Mute music" : "Unmute music"}
        aria-pressed={musicPlaying && !musicMuted}
        title={musicPlaying && !musicMuted ? "Mute music" : "Unmute music"}
        onClick={(event) => {
          event.stopPropagation();
          toggleMusic();
        }}
      >
        {musicPlaying && !musicMuted ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
      </button>
      {showEnvelope && (
        <>
          {/* ===== Envelope face (full screen, ornate blush pattern) ===== */}
          <div className="face pattern" key={`face-${theme.id}`}>
            <div className="inner-shade" aria-hidden="true" />

            {/* Revealed monogram — hidden beneath the lowered flap until opened */}
            <div className="reveal" aria-hidden={!open}>
            <img
                src={srLogoDark}
                alt="wax seal"
                className="block h-30 w-30 rounded-full object-cover drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
              // aria-hidden={opened}
              />
              <p className="save">25 Years of Love</p>
              <p className="date serif">December 8, 2026</p>
              <p className="date serif">08:00 PM</p>
            </div>

            {/* Envelope style picker — 5 patterns */}
            {/* <div className="theme-picker" role="tablist" aria-label="Envelope style">
              <span className="tp-label serif">Choose a style</span>
              <div className="tp-row">
                {THEMES.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === themeIdx}
                    aria-label={t.name}
                    title={t.name}
                    className={`swatch${i === themeIdx ? " active" : ""}`}
                    style={{ backgroundImage: `url(${t.pattern})` } as CSSProperties}
                    onClick={(e) => {
                      e.stopPropagation();
                      setThemeIdx(i);
                    }}
                  >
                    <span className="sw-mono serif" aria-hidden="true">
                      {t.short}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}

            {/* Bottom controls */}
              {/* <div className="controls">
                <button
                  type="button"
                  className="pill btn-undo"
                  onClick={(e) => {
                    e.stopPropagation();
                    sealEnvelope();
                  }}
                >
                  <RotateCcw size={15} strokeWidth={1.7} />
                  Undo
                </button>
                <button
                  type="button"
                  className="pill btn-reveal"
                  onClick={openEnvelope}
                >
                  <Sparkles size={15} strokeWidth={1.7} />
                  Tap to Reveal
                </button>
              </div> */}

            {/* Music corner */}
            {/* <div className="music-switcher" aria-label={`Music: ${SONGS[songIndex].title}`}>
              <button
                type="button"
                className="music-skip"
                aria-label="Previous song"
                onClick={(e) => {
                  e.stopPropagation();
                  switchSong(-1);
                }}
              >
                <SkipBack size={15} />
              </button>
              <button
                type="button"
                className={`corner${musicPlaying ? " is-playing" : ""}`}
                aria-label={musicPlaying ? "Pause music" : "Play romantic music"}
                aria-pressed={musicPlaying}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMusic();
                }}
              >
                <span className="pulse-ring" aria-hidden="true" />
                {musicPlaying ? <Pause size={18} strokeWidth={1.5} /> : <Play size={18} strokeWidth={1.5} />}
              </button>
              <span className="music-track-name">{SONGS[songIndex].title}</span>
              <button
                type="button"
                className="music-skip"
                aria-label="Next song"
                onClick={(e) => {
                  e.stopPropagation();
                  switchSong(1);
                }}
              >
                <SkipForward size={15} />
              </button>
            </div> */}

            {/* Floating gold dust */}
            <span className="mote m1" aria-hidden="true" />
            <span className="mote m2" aria-hidden="true" />
            <span className="mote m3" aria-hidden="true" />
            <span className="mote m4" aria-hidden="true" />
          </div>

            {/* "You are invited" block — printed on the envelope body */}
            <div className="invited">
              <Ornament className="orn" />
              <h1 className="invited-title serif">You Are Cordially Invited</h1>
              <Ornament className="orn" flip />
              <span className="invited-heart">
                <Heart className="heart-pump" size={11} fill="currentColor" strokeWidth={0} />
              </span>
            </div>


          {/* ===== Cast shadow of the flap on the face ===== */}
          <div className="cast" aria-hidden="true" />

          {/* ===== The flap ===== */}
          <div
            key={`flap-${theme.id}`}
            className="flap pattern"
            role="button"
            tabIndex={0}
            aria-label="Open invitation"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openEnvelope();
            }}
          >
            <div className="flap-sheen" aria-hidden="true" />
            {/* <div className="flap-label">
              <Ornament className="orn sm" />
              <p className="flap-small">Our 25th Anniversary of</p>
              <p className="flap-names serif">Sachin &amp; Rukman</p>
              <Ornament className="orn sm" flip />
            </div> */}
            {/* QR corner — printed on the flap */}
            {/* <button
              type="button"
              className="corner corner-tr"
              aria-label="Invitation QR"
              onClick={(e) => e.stopPropagation()}
            >
              <QrCode size={19} strokeWidth={1.5} />
            </button> */}
          </div>

          {/* ===== Gold wax seal ===== */}
          <button type="button" className="seal" aria-label="Tap to open">
            <span className="seal-glow" aria-hidden="true" />
            <span className="seal-in">
              {/* <WaxSeal /> */}
              <img
                src={srLogoDark}
                alt="wax seal"
                className="block h-full w-full rounded-full object-cover drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
                // aria-hidden={opened}
              />
            </span>
          </button>

          {/* ===== Confetti burst when the seal breaks ===== */}
          {open && <Burst />}
          {open && invite === "hidden" && <ScrollHint onClick={advanceOnScroll} />}
        </>
      )}

      {/* ===== Invitation sheet that rises after the flap opens ===== */}
      {invite !== "hidden" && (
        <Invitation
          leaving={invite === "leaving"}
          onSeal={closeInvite}
          musicPlaying={musicPlaying && !musicMuted}
          onToggleMusic={toggleMusic}
        />
      )}
    </div>
  );
}
