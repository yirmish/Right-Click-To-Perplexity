
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';
import { SearchButton } from './components/SearchButton';
import { PERPLEXITY_SEARCH_URL } from './constants';
import { refineQueryWithGemini } from './services/geminiService';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefine = useCallback(async () => {
    if (!query.trim()) {
      setError("Please enter a query to refine.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const refinedQuery = await refineQueryWithGemini(query);
      setQuery(refinedQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  const handleSearch = useCallback(() => {
    if (!query.trim()) {
      setError("Please enter a query to search.");
      return;
    }
    setError(null);
    const encodedQuery = encodeURIComponent(query);
    const url = `${PERPLEXITY_SEARCH_URL}${encodedQuery}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [query]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4 font-sans selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8 w-full">
          <div className="relative w-full">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste your text or type a question here..."
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-md">
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <SearchButton
              onClick={handleRefine}
              isLoading={isLoading}
              disabled={!query.trim() || isLoading}
              className="w-full sm:w-auto"
            >
              Refine with Gemini
            </SearchButton>
            <SearchButton
              onClick={handleSearch}
              disabled={!query.trim() || isLoading}
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 disabled:bg-sky-900/50"
            >
              Search on Perplexity
            </SearchButton>
          </div>
        </main>
      </div>
       <footer className="absolute bottom-4 text-center text-slate-500 text-sm">
          <p>Built for enhanced searching. Your query, amplified.</p>
      </footer>
    </div>
  );
};

export default App;
