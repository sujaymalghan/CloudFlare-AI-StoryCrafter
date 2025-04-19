import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center">AI Story Generator</h1>
        <p className="text-center mt-2">
          Create unique stories with AI-generated text and images
        </p>
      </div>
    </header>
  );
};

export default Header;