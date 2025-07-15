
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text">
        AI Search Gateway
      </h1>
      <p className="mt-4 max-w-xl mx-auto text-lg text-slate-400">
        Supercharge your searches. Refine your thoughts with Gemini, then unleash them on Perplexity.
      </p>
    </header>
  );
};
