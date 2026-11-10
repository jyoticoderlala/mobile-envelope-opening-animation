import { Heart } from "lucide-react";

export default function ScrollHint({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="envelope-scroll-hint"
      aria-label="Scroll down to discover the invitation"
      title="Scroll down"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <span className="envelope-story-label">Our love story</span>
      <Heart className="heart-pump" size={20} fill="currentColor" strokeWidth={0} aria-hidden="true" />
      <svg className="envelope-story-trail" width="34" height="43" viewBox="0 0 34 43" fill="none" aria-hidden="true">
        <path className="envelope-story-dashes" d="M12 2C8 12 28 12 22 25C19 31 20 34 19 38" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1 5" />
        <path className="envelope-scroll-arrow" d="M14 33L19 39L24 33" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
