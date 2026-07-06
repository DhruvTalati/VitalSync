import { useState, useRef, useCallback } from "react";

const SpeechRecognitionApi =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

export const useSpeechToText = (onResult, lang = "en-US") => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const start = useCallback(() => {
    if (!SpeechRecognitionApi) {
      onResult(null, "Speech recognition is not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognitionApi();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript, null);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [onResult, lang]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  return { listening, start, stop, supported: Boolean(SpeechRecognitionApi) };
};
