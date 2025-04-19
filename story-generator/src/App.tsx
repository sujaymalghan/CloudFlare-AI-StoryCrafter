import { useState } from 'react';
import Header from './components/Header';
import StoryForm from './components/StoryForm';
import StoryCard from './components/StoryCard';
import { StoryData } from './types';
import './index.css';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateStory = async (prompt: string) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("https://ai-story-generator.sujayvmalghan.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
  
      const data: StoryData = await response.json();
  console.log("Generated story data:", data);
      setStoryData(data);
    } catch (err) {
      console.error("Error:", err);
      setError(`Failed to generate story: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <StoryForm onSubmit={generateStory} loading={loading} />
        
        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-32 w-full bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        )}
        
        {storyData && !loading && (
          <StoryCard 
            story={storyData.story} 
            imageUrl={storyData.imageUrl}
          />
        )}
      </main>
    </div>
  );
}

export default App;