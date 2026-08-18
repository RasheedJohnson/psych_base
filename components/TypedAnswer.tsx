"use client";

import { useEffect, useState } from "react";

/** One character per tick so the answer is readable as it appears. */
const TYPE_MS = 16;

type TypedAnswerProps = {
  text: string;
};

/**
 * Types `text` one character at a time. Parent remounts with a key (question
 * id) so a new pick starts from "".
 */
export default function TypedAnswer({ text }: TypedAnswerProps) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, TYPE_MS);

    return () => window.clearInterval(timer);
  }, [text]);

  const stillTyping = typed.length < text.length;

  return (
    <p>
      {typed}
      {stillTyping ? <span aria-hidden="true">|</span> : null}
    </p>
  );
}
