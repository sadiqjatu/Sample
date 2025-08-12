// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState('start');
  const [displayedText, setDisplayedText] = useState('');
  const fullMessage =
    "I am sorry Maryam :( I know you are hurt. Please forgive me ❤️.";

  useEffect(() => {
    if (step === 'message' && displayedText.length < fullMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullMessage[prev.length]);
      }, 60); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [step, displayedText]);

  const handleClick = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('message');
    }, 2500); // simulate heart fixing
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-6 text-center">
      
      {/* Start Button */}
      {step === 'start' && (
        <button
          onClick={handleClick}
          className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg text-lg hover:bg-pink-600 transition-all"
        >
          Make Things Right 💔
        </button>
      )}

      {/* Loading State */}
      {step === 'loading' && (
        <div className="flex flex-col items-center animate-pulse">
          <div className="text-5xl mb-2">💔</div>
          <p className="text-pink-700 text-lg font-medium">
            Healing the heart...
          </p>
        </div>
      )}

      {/* Message Display */}
      {step === 'message' && (
        <div
          className="responsive-message font-semibold text-pink-800 max-w-xl mt-4 leading-relaxed"
        >
          {displayedText.split('').map((char, idx) => (
            <span
              key={idx}
              className="fade-in-up"
              style={{ animationDelay: `${idx * 0.03}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;