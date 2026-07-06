import React from "react";
import { Mic, MicOff } from "lucide-react";
import { useSpeechToText } from "../../hooks/useSpeechToText.js";

const DictationInput = ({
  label,
  value,
  onChange,
  placeholder,
  lang,
  required,
}) => {
  const { listening, start, stop } = useSpeechToText((transcript, error) => {
    if (error) return;
    onChange(value ? `${value} ${transcript}` : transcript);
  }, lang);

  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      <div className="relative">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="input-field pr-10"
          required={required}
        />
        <button
          type="button"
          onClick={listening ? stop : start}
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full transition-colors ${
            listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-primary-50 text-primary-600 hover:bg-primary-100"
          }`}
        >
          {listening ? <MicOff size={13} /> : <Mic size={13} />}
        </button>
      </div>
    </div>
  );
};

export default DictationInput;
