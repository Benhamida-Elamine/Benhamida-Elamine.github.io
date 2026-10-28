import { useEffect, useState } from "react";

/** Types `text` one character at a time after `delay` ms. Returns the visible part. */
export const useTypewriter = (text: string, { delay = 0, speed = 70, enabled = true } = {}) => {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let timer = window.setTimeout(function tick() {
      setCount((current) => {
        if (current < text.length) timer = window.setTimeout(tick, speed);
        return Math.min(current + 1, text.length);
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, delay, speed, enabled]);

  return { visible: text.slice(0, count), done: count >= text.length };
};
