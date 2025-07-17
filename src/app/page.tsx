"use client";
import Image from "next/image";


import LearningCards from './components/LearningCards';





import React, { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center py-12 px-4">
      <header className="w-full max-w-3xl mx-auto text-center mb-10 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-200 mb-3 tracking-tight drop-shadow-lg animate-slide-down">
          Professional Learning Module Library
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 animate-fade-in delay-100">
          Learn by interacting! Launch hands-on HTML modules or upload your own and start exploring concepts through real interaction.
        </p>
        <div className="flex justify-center mt-4 animate-fade-in delay-200">
          <input
            type="text"
            placeholder="Search modules..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xs px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
          />
        </div>
      </header>
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center">
        <LearningCards search={search} />
      </main>
      <footer className="w-full max-w-3xl mx-auto text-center mt-12 text-gray-400 text-xs pb-4">
        &copy; {new Date().getFullYear()} Professional Learning Library. Powered by Next.js.
      </footer>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.8s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
}

