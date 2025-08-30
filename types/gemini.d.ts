interface GeminiResponse {
  text: string;
  images: string[];
}

declare module '#app' {
  interface NuxtApp {
    $gemini: {
      model: any;
      generateImage: (prompt: string) => Promise<GeminiResponse>;
      analyzeImage: (imageFile: File, prompt?: string) => Promise<GeminiResponse>;
      editImage: (imageFile: File, instructions: string) => Promise<GeminiResponse>;
    }
  }
}

export {}