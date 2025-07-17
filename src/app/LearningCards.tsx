"use client";



import React, { useEffect, useState } from "react";



interface LearningCardsProps {
  search?: string;
}

const LearningCards: React.FC<LearningCardsProps> = ({ search = "" }) => {
  const [htmlFiles, setHtmlFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);

  useEffect(() => {
    fetch("/api/module-files")
      .then((res) => res.json())
      .then((data) => {
        setHtmlFiles(data.files || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading modules...</div>;
  }


  const filteredFiles = htmlFiles.filter(file =>
    file.replace(/\.html$/, "").toLowerCase().includes(search.toLowerCase())
  );

  // Suggestions for search
  const suggestions =
    search.length > 0
      ? htmlFiles.filter(file =>
          file.replace(/\.html$/, "").toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <>
      {/* Suggestions Dropdown */}
      {search && suggestions.length > 0 && showSuggestions && (
        <div className="absolute z-20 w-full max-w-xs left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          {suggestions.map((file, idx) => (
            <div
              key={file}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-800 dark:text-gray-100 ${highlighted === idx ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
              onMouseDown={() => window.open(`/modules/${file}`, "_blank")}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {file.replace(/\.html$/, "")}
            </div>
          ))}
        </div>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative">
        {filteredFiles.length === 0 ? (
          <div className="col-span-full text-gray-500 text-center py-12 bg-white/60 dark:bg-gray-900/60 rounded-xl shadow-inner animate-fade-in">
            No modules found.<br />Upload your professional HTML learning modules to the <code className='bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded'>public/modules</code> folder.<br />Each module will appear as a card below.
          </div>
        ) : (
          filteredFiles.map((file, idx) => (
            <div
              key={file}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer border border-transparent hover:border-blue-400 hover:shadow-2xl transition-all duration-200 min-h-[180px] animate-fade-in"
              style={{ animationDelay: `${idx * 80}ms` }}
              onClick={() => window.open(`/modules/${file}`, "_blank")}
              tabIndex={0}
              role="button"
              onKeyPress={e => { if (e.key === 'Enter') window.open(`/modules/${file}`, "_blank"); }}
            >
              <div className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1 text-center">{file.replace(/\.html$/, "")}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm text-center">Click to open this interactive module</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default LearningCards;
