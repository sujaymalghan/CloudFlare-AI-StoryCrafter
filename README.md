# CloudFlare-AI StoryCrafter
# CloudFlare-AI-StoryCrafter

An AI-powered story generation tool built with CloudFlare Workers.

## Overview

CloudFlare-AI-StoryCrafter is a web application that leverages AI to create dynamic stories based on user inputs. The project consists of a frontend story generator and backend CloudFlare Workers that handle AI content generation.

## Project Structure

- **story-generator**: Frontend application built with React/TypeScript
- **workers**: CloudFlare Workers for AI-generated content

## Features

- Interactive story creation
- AI-assisted storytelling
- Real-time content generation

## Tech Stack

- TypeScript
- React
- Vite
- CloudFlare Workers
- AI content generation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Wrangler CLI for CloudFlare Workers development

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/CloudFlare-AI-StoryCrafter.git
   cd CloudFlare-AI-StoryCrafter
   ```

2. Install dependencies for the story generator
   ```
   cd story-generator
   npm install
   ```

3. Install dependencies for the workers
   ```
   cd ../workers
   npm install
   ```

### Development

#### Running the Story Generator Frontend

```
cd story-generator
npm run dev
```

#### Developing CloudFlare Workers

```
cd workers
npm run dev
```

## Deployment

### Deploying the Frontend

```
cd story-generator
npm run build
```

### Deploying Workers to CloudFlare

```
cd workers
npm run deploy
```
