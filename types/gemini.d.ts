interface GeminiResponse {
  text: string;
  images: string[];
}

declare module '#app' {
  interface NuxtApp {
    $gemini: {
      model: any;
      generateImage: (prompt: string) => Promise<GeminiResponse>;
      analyzeImage: (imageFiles: File | File[], prompt?: string) => Promise<GeminiResponse>;
      editImage: (imageFiles: File | File[], instructions: string) => Promise<GeminiResponse>;
    }
  }
}

export {}