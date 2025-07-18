"use client";



import React, { useEffect, useState, useRef } from "react";



interface LearningCardsProps {
  search: string;
  setSearch: (val: string) => void;
}

const LearningCards: React.FC<LearningCardsProps> = ({ search, setSearch }) => {
  const [htmlFiles, setHtmlFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestions =
    search.length > 0
      ? htmlFiles.filter(file =>
          file.replace(/\.html$/, "").toLowerCase().includes(search.toLowerCase())
        )
      : [];

  useEffect(() => {
    fetch("/api/module-files")
      .then((res) => res.json())
      .then((data) => {
        setHtmlFiles(data.files || []);
        setLoading(false);
      });
  }, []);

  // Handle keyboard navigation for suggestions
  useEffect(() => {
    if (!showSuggestions) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (suggestions.length === 0) return;
      if (e.key === "ArrowDown") {
        setHighlighted((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        setHighlighted((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === "Enter" && highlighted >= 0) {
        window.open(`/modules/${suggestions[highlighted]}`, "_blank");
        setShowSuggestions(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSuggestions, suggestions, highlighted]);

  if (loading) {
    return <div className="text-gray-500">Loading modules...</div>;
  }

  const filteredFiles = htmlFiles.filter(file =>
    file.replace(/\.html$/, "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-center mb-6 relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search modules..."
          value={search}
          onChange={e => { setSearch(e.target.value); setShowSuggestions(true); setHighlighted(-1); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
        />
        {/* Suggestions Dropdown */}
        {search && suggestions.length > 0 && showSuggestions && (
          <div className="absolute z-30 w-full max-w-xs left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 rounded-lg shadow-lg overflow-hidden animate-fade-in">
            {suggestions.map((file, idx) => (
              <div
                key={file}
                className={`px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-800 dark:text-gray-100 ${highlighted === idx ? 'bg-blue-100 dark:bg-blue-900 font-bold' : ''}`}
                onMouseDown={() => window.open(`/modules/${file}`, "_blank")}
                onMouseEnter={() => setHighlighted(idx)}
                style={{fontWeight: highlighted === idx ? 'bold' : 'normal'}}
              >
                <span className="truncate text-base">{file.replace(/\.html$/, "")}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative">
        {filteredFiles.length === 0 ? (
          <div className="col-span-full text-gray-500 text-center py-12 bg-white/60 dark:bg-gray-900/60 rounded-xl shadow-inner animate-fade-in">
            No modules found.<br />Upload your professional HTML learning modules to the <code className='bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded'>public/modules</code> folder.<br />Each module will appear as a card below.
          </div>
        ) : (
          filteredFiles.map((file, idx) => (
            <div
              key={file}
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-blue-900 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center cursor-pointer border border-transparent hover:border-blue-500 hover:shadow-2xl transition-all duration-300 min-h-[200px] animate-fade-in scale-100 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ animationDelay: `${idx * 80}ms` }}
              onClick={() => window.open(`/modules/${file}`, "_blank")}
              tabIndex={0}
              role="button"
              onKeyPress={e => { if (e.key === 'Enter') window.open(`/modules/${file}`, "_blank"); }}
            >
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 shadow-inner">
                {/* Book with bookmark icon */}
                <svg className="w-8 h-8 text-blue-500 dark:text-blue-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" fillOpacity="0.15" />
                  <rect x="7" y="7" width="10" height="10" rx="1.5" fill="#fff" />
                  <path d="M9 7v6l2-1 2 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="font-extrabold text-xl text-blue-800 dark:text-blue-100 mb-2 text-center drop-shadow-lg break-words whitespace-normal overflow-hidden">
  {file.replace(/\.html$/, "")}
</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm text-center">Click to open this interactive module</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LearningCards;
