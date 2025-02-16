'use client'

import React, { useState } from "react"; 

interface TextInputProps {
    placeholder: string; 
}

const TextInput: React.FC<TextInputProps> = ({ placeholder }) => {
    const [text, setText] = useState(""); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        processInput(text); 
    };

    const processInput = (input: string) => {
        console.log("User input:", input); 
        // call to Spotify API
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded-lg p-4 w-full max-w-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            placeholder={placeholder}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      );
};

export default TextInput;