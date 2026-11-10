import { useEffect, useState } from "react";

type TextTypeProps = {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  cursorCharacter?: string;
};

export default function TextType({
  text,
  typingSpeed = 75,
  startDelay = 0,
  cursorCharacter = "_",
}: TextTypeProps) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    setVisibleLength(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleLength(text.length);
      return;
    }

    let length = 0;
    let interval = 0;
    const startTimeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        length += 1;
        setVisibleLength(length);
        if (length >= text.length) window.clearInterval(interval);
      }, typingSpeed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearInterval(interval);
    };
  }, [text, typingSpeed, startDelay]);

  return (
    <span className="text-type">
      <span className="text-type__sr">{text}</span>
      <span
        className={`text-type__visible${visibleLength === text.length ? " text-type__complete" : ""}`}
        aria-hidden="true"
      >
        {text.slice(0, visibleLength)}
        {visibleLength < text.length && (
          <span className="text-type__cursor">{cursorCharacter}</span>
        )}
      </span>
    </span>
  );
}
