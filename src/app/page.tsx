"use client";
import Image from "next/image";


import LearningCards from './components/LearningCards';





import React, { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center py-12 px-4">
      <header className="w-full max-w-3xl mx-auto text-center mb-10 animate-fade-in">
        <div className="flex justify-center mb-4 animate-fade-in delay-50">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 flex items-center justify-center shadow-lg">
            {/* Education/Book Icon */}
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V4l9 5-9 5-9-5 9-5v8z" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-200 mb-3 tracking-tight drop-shadow-lg animate-slide-down">
          Professional Learning Module Library
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-6 animate-fade-in delay-100">
          Learn by interacting! Launch hands-on HTML modules or upload your own and start exploring concepts through real interaction.
        </p>
      </header>
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center">
        <LearningCards search={search} setSearch={setSearch} />
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

