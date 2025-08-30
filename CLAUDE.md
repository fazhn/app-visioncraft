# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 web application called "VisionCraft AI" (package name "visioncraft-ai"), an AI-powered image editor and generator application. The app integrates with Google's Gemini 2.5 Flash model to provide image generation, editing, and analysis capabilities through an intuitive web interface.

## Development Commands

### Initial Setup
```bash
npm install           # Install dependencies
cp .env.example .env  # Copy environment template
# Edit .env with your API keys:
# - Clerk API keys from https://dashboard.clerk.com
# - Gemini API key from https://aistudio.google.com/app/apikey
```

### Development Server
```bash
npm run dev    # Starts dev server with --host flag for network access
```

### Build & Production
```bash
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run start    # Alternative to preview
```

## Architecture & Key Technologies

### Core Stack
- **Nuxt 3** with TypeScript support
- **Vue 3** with Composition API
- **Tailwind CSS 4** with custom configuration via Vite plugin
- **Nuxt UI** component library with custom theme configuration

### Key Modules & Integrations
- **@clerk/nuxt**: Authentication system
- **@vite-pwa/nuxt**: Progressive Web App capabilities with auto-update
- **@nuxt/fonts, @nuxt/icon, @nuxt/image**: Asset optimization
- **@nuxtjs/color-mode**: Theme switching
- **@google/generative-ai**: Gemini AI integration for image processing
- **HTML5 Canvas**: Native browser canvas API for image editing and manipulation
- **@vueuse/core & @vueuse/integrations**: Vue composition utilities

### AI Integration
- **Model**: Google Gemini 2.5 Flash via @google/generative-ai
- **Canvas Engine**: HTML5 Canvas with custom Vue implementation for interactive image editing
- **Key Features**: 
  - Text-to-image generation concepts via Gemini AI
  - Image analysis and description using vision capabilities
  - AI-powered image editing instructions
  - Interactive HTML5 canvas with drag-and-drop functionality
  - Real-time image manipulation and export capabilities

## Project Structure

### Pages
- `index.vue`: Main application interface with image editor, generator, and analysis tools

### Components
- `ImageCanvas.vue`: HTML5 Canvas-based interactive canvas for image editing and manipulation
- `AccountSummary.vue`: AI creative stats and user progress display
- `FeatureMenu.vue`: Main navigation grid with Generate/Upload/Edit/Canvas shortcuts
- `BottomNavigation.vue`: Mobile-friendly bottom navigation
- `PWAInstallButton.vue`: Progressive Web App installation prompt
- `ColorModeSelector.vue`: Theme switching component

### Plugins
- `gemini.client.ts`: Gemini AI client plugin with image generation, analysis, and editing methods

### Configuration
- `app.config.ts`: Nuxt UI theme customization with purple/indigo theme
- `types/index.ts`: ThemeMode enum for light/dark themes  
- `types/gemini.d.ts`: TypeScript definitions for Gemini AI plugin
- PWA manifest configured for "VisionCraft AI" with purple theme
- `nuxt.config.ts`: Runtime config for Gemini API key and Konva integration

## Development Notes

### AI Integration Considerations
- Gemini 2.5 Flash provides image analysis and text generation, not actual image generation
- For true image generation, consider integrating with DALL-E, Midjourney, or Stable Diffusion APIs
- Current implementation returns text descriptions and analysis from Gemini
- Canvas functionality uses HTML5 Canvas API for client-side image manipulation

### UI/UX Patterns
- Mobile-first design with responsive breakpoints
- Purple/indigo gradient theme for AI-focused branding
- Uses Nuxt UI components with custom color scheme
- Interactive canvas with drag-and-drop image manipulation
- Real-time AI response display and user feedback
- Dark/light mode support infrastructure in place

### State Management
- Uses Vue 3 Composition API with `ref()` for reactive state
- No external state management library (Pinia/Vuex) currently implemented
- Local component state for image management, AI responses, and canvas interactions
- File handling and base64 conversion for AI API integration

### Development Workflow
- No specific linting or testing commands configured in package.json
- Uses standard Nuxt development patterns
- TypeScript enabled with strict mode configuration