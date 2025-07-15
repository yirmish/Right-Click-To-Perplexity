
import React from 'react';

interface SearchInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <textarea
      rows={5}
      className="w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-colors duration-200 resize-none disabled:opacity-50"
      {...props}
    />
  );
};
