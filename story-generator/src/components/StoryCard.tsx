import React from 'react';
import { StoryCardProps } from '../types';

const StoryCard: React.FC<StoryCardProps> = ({ story, imageUrl }) => {
  if (!story) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
      {imageUrl && (
        <div className="w-full h-64 overflow-hidden">
          <img 
            src={imageUrl} 
            alt="AI generated story illustration" 
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/api/placeholder/400/320";
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Your Generated Story</h2>
        <div className="prose">
          <p className="text-gray-700 leading-relaxed">{story}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;