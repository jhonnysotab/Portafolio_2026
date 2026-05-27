import { useState, useEffect, useCallback } from 'react';

export const useTypewriter = (phrases, typingSpeed = 60, deletingSpeed = 30, pauseTime = 2000) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      setText(currentPhrase.slice(0, charIndex + 1));
      setCharIndex(prev => prev + 1);

      if (charIndex === currentPhrase.length - 1) {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      setText(currentPhrase.slice(0, charIndex));
      setCharIndex(prev => prev - 1);

      if (charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
    }
  }, [phraseIndex, charIndex, isDeleting, phrases, pauseTime]);

  useEffect(() => {
    const timeout = setTimeout(
      type,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [type, isDeleting, deletingSpeed, typingSpeed]);

  return text;
};