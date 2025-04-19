export interface Env {
	AI: any;
	CF_API_TOKEN: string;
  }
  
  interface RequestData {
	prompt: string;
  }
  
  interface ResponseData {
	story: string;
	imagePrompt: string;
	imageUrl: string;
  }
  
  // Helper functions
  function corsHeaders(): Record<string, string> {
	return {
	  "Access-Control-Allow-Origin": "*",
	  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	  "Access-Control-Allow-Headers": "Content-Type",
	};
  }
  
  function handleCors(): Response {
	return new Response(null, {
	  status: 204,
	  headers: corsHeaders(),
	});
  }
  
  // Content validation
  function sanitizePrompt(prompt: string): string {
	return prompt
	  .replace(/[^a-zA-Z0-9 .,!?'"-]/g, '')
	  .replace(/\b(magic|spell|otherworldly|supernatural)\b/gi, '')
	  .trim()
	  .slice(0, 500);
  }
  
  // Image generation using direct R2 bucket URL strategy
 
  
  // Let's try a simpler approach using the Workers AI API
  async function generateImageWithAI(ai: any, prompt: string): Promise<string> {
	const safePrompt = sanitizePrompt(prompt);
	console.log("Generating image with AI using prompt:", safePrompt);
	
	try {
	  // We'll use a totally different approach - returning a placeholder with the prompt
	  // Since the Stability AI integration isn't working as expected
	  const encodedPrompt = encodeURIComponent(safePrompt.substring(0, 100));
	  return `https://dummyimage.com/1024x1024/007bff/ffffff&text=${encodedPrompt}`;
	} catch (error) {
	  console.error("Image generation error:", error);
	  return '';
	}
  }
  
  // Story generation
  async function generateStory(ai: any, prompt: string): Promise<string> {
	const sanitized = sanitizePrompt(prompt);
	
	try {
	  const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
		messages: [
		  { 
			role: "system", 
			content: "Generate a family-friendly story in 3 paragraphs. Focus on concrete objects and realistic scenarios."
		  },
		  { role: "user", content: sanitized },
		],
		max_tokens: 500
	  });
	  return response?.response?.trim() || "Could not generate story";
	} catch (error) {
	  console.error("Story generation error:", error);
	  return "Story generation failed";
	}
  }
  
  // Image prompt generation
  async function generateImagePrompt(ai: any, story: string): Promise<string> {
	const cleanStory = sanitizePrompt(story);
	
	try {
	  const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
		messages: [
		  { 
			role: "system", 
			content: `Create a short, detailed visual description for an image based on this story. Include:
  - Main objects and characters
  - Colors and visual details
  - Lighting and atmosphere
  Keep it under 100 words and make it concrete and visually descriptive.`
		  },
		  { role: "user", content: `Story: ${cleanStory}\n\nImage description:` },
		],
		max_tokens: 150
	  });
	  return response?.response?.trim() || "A scene from the story";
	} catch (error) {
	  console.error("Prompt generation error:", error);
	  return "A scene from the story";
	}
  }
  
  // Main worker
  export default {
	async fetch(request: Request, env: Env): Promise<Response> {
	  if (request.method === "OPTIONS") return handleCors();
  
	  if (request.method === "POST") {
		try {
		  const data: RequestData = await request.json();
		  
		  if (!data.prompt?.trim()) {
			return Response.json(
			  { error: "Prompt is required" },
			  { status: 400, headers: corsHeaders() }
			);
		  }
  
		  // Generate content
		  const story = await generateStory(env.AI, data.prompt);
		  const imagePrompt = await generateImagePrompt(env.AI, story);
		  
		  console.log("Generated image prompt:", imagePrompt);
		  
		  // Try the direct placeholder approach for now
		  const imageUrl = await generateImageWithAI(env.AI, imagePrompt);
		  
		  // If image generation failed, use a generic placeholder
		  const finalImageUrl = imageUrl || 'https://via.placeholder.com/1024x1024.png?text=Image+Unavailable';
  
		  return Response.json(
			{ 
			  story, 
			  imagePrompt, 
			  imageUrl: finalImageUrl 
			},
			{ headers: corsHeaders() }
		  );
  
		} catch (error) {
		  console.error("Processing error:", error);
		  return Response.json(
			{ error: "Internal server error", details: error },
			{ status: 500, headers: corsHeaders() }
		  );
		}
	  }
	  
	  // For GET requests, return a simple status check
	  if (request.method === "GET") {
		return Response.json(
		  { status: "ok", message: "AI Story Generator API is running" },
		  { headers: corsHeaders() }
		);
	  }
  
	  return Response.json(
		{ error: "Method not allowed" },
		{ status: 405, headers: corsHeaders() }
	  );
	}
  };