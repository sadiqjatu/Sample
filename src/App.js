// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState('start');
  const [displayedText, setDisplayedText] = useState('');
  const fullMessage =
    "I am sorry Maryam :( I know you are hurt but i didn't mean to hurt you in any way Please forgive me ❤️";

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

  // Function to chunk the text into paragraphs of approx. 5 words
  const chunkTextIntoParagraphs = (text, wordsPerParagraph = 5) => {
    const words = text.split(' ');
    const paragraphs = [];
    for (let i = 0; i < words.length; i += wordsPerParagraph) {
      paragraphs.push(words.slice(i, i + wordsPerParagraph).join(' '));
    }
    return paragraphs;
  };

  const paragraphs = chunkTextIntoParagraphs(displayedText);

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
        <div className="responsive-message font-semibold text-pink-800 max-w-xl mt-4 leading-relaxed">
          {paragraphs.map((para, paraIdx) => (
            <p key={paraIdx}>
              {/*  Use map to create a span for each character for the animation */}
              {para.split('').map((char, charIdx) => (
                <span
                  key={`${paraIdx}-${charIdx}`} // Unique key for each character
                  className="fade-in-up"
                  style={{ animationDelay: `${(paraIdx * 5 + charIdx) * 0.03}s` }} // Adjusted animation delay
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;