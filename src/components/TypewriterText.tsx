import { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypewriterText = ({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseTime = 2000,
}: TypewriterTextProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[currentPhraseIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [displayText, isDeleting, currentPhrase, phrases.length, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span>
      {displayText}
      <span className="border-r-2 border-primary animate-cursor-blink ml-0.5">&nbsp;</span>
    </span>
  );
};

export default TypewriterText;
