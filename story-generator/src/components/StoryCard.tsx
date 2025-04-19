import React, { useState, useEffect } from 'react';
import { StoryCardProps } from '../types';

const StoryCard: React.FC<StoryCardProps> = ({ story, imageUrl }) => {
  const [imgSrc, setImgSrc] = useState<string>('/api/placeholder/400/320'); // Start with placeholder
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageUrl) {
      setIsLoading(true);
      const img = new Image();
      img.src = imageUrl;
      
      img.onload = () => {
        setImgSrc(imageUrl);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setImgSrc('/api/placeholder/400/320');
        setIsLoading(false);
      };
    } else {
      setImgSrc('/api/placeholder/400/320');
      setIsLoading(false);
    }
  }, [imageUrl]);

  if (!story) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="w-full h-64 overflow-hidden relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-600">Generating artwork...</span>
          </div>
        )}
        
        {/* Image with error handling */}
        <img 
          src={imgSrc}
          alt="AI generated story illustration"
          className={`w-full h-full object-cover ${isLoading ? 'invisible' : 'visible'}`}
          onError={(e) => {
            // Fallback to placeholder if both original and error image fail
            if (imgSrc !== '/api/placeholder/400/320') {
              setImgSrc('/api/placeholder/400/320');
              setIsLoading(false);
            }
          }}
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">
          Your Generated Story
        </h2>
        <div className="prose">
          <p className="text-gray-700 leading-relaxed">{story}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;