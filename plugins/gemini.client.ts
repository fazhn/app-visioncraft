import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Debug: Check if API key is loaded
  console.log('Gemini API Key loaded:', config.public.geminiApiKey ? 'Yes' : 'No')
  
  // Initialize the Gemini AI client
  const genAI = new GoogleGenerativeAI(config.public.geminiApiKey as string)
  
  // Get the Gemini 2.5 Flash Image Preview model for image processing
  const model = genAI.getGenerativeModel({ 
    model: "models/gemini-2.5-flash-image-preview",
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    }
  })

  return {
    provide: {
      gemini: {
        model,
        // Generate image from text prompt
        async generateImage(prompt: string) {
          try {
            const result = await model.generateContent([
              { text: `Generate an image based on this description: ${prompt}` }
            ])
            
            // Check if response contains both text and images
            const response = result.response
            const candidates = response.candidates || []
            
            let textResponse = ''
            const imageUrls: string[] = []
            
            for (const candidate of candidates) {
              const parts = candidate.content?.parts || []
              
              for (const part of parts) {
                if (part.text) {
                  textResponse += part.text
                }
                if (part.inlineData) {
                  // Convert base64 to blob URL
                  const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
                  imageUrls.push(imageUrl)
                }
              }
            }
            
            return {
              text: textResponse,
              images: imageUrls
            }
          } catch (error) {
            console.error('Error generating image:', error)
            throw error
          }
        },
        
        // Analyze and describe an image or multiple images
        async analyzeImage(imageFiles: File | File[], prompt?: string) {
          try {
            const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
            const imageParts = [];
            
            for (const file of files) {
              const imageBase64 = await fileToBase64(file);
              imageParts.push({
                inlineData: {
                  data: imageBase64,
                  mimeType: file.type
                }
              });
            }
            
            const analysisPrompt = prompt || (files.length > 1 ? "Describe estas imágenes en detalle" : "Describe esta imagen en detalle");
            const result = await model.generateContent([analysisPrompt, ...imageParts]);
            
            // Check if response contains both text and images
            const response = result.response
            const candidates = response.candidates || []
            
            let textResponse = ''
            const imageUrls: string[] = []
            
            for (const candidate of candidates) {
              const parts = candidate.content?.parts || []
              
              for (const part of parts) {
                if (part.text) {
                  textResponse += part.text
                }
                if (part.inlineData) {
                  // Convert base64 to blob URL
                  const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
                  imageUrls.push(imageUrl)
                }
              }
            }
            
            return {
              text: textResponse,
              images: imageUrls
            }
          } catch (error) {
            console.error('Error analyzing image:', error)
            throw error
          }
        },

        // Edit image based on instructions
        async editImage(imageFiles: File | File[], instructions: string) {
          try {
            const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
            const imageParts = [];
            
            for (const file of files) {
              const imageBase64 = await fileToBase64(file);
              imageParts.push({
                inlineData: {
                  data: imageBase64,
                  mimeType: file.type
                }
              });
            }
            
            const editPrompt = files.length > 1 
              ? `Edita estas imágenes según estas instrucciones: ${instructions}`
              : `Edit this image according to these instructions: ${instructions}`;
            const result = await model.generateContent([editPrompt, ...imageParts]);
            
            // Check if response contains both text and images
            const response = result.response
            const candidates = response.candidates || []
            
            let textResponse = ''
            const imageUrls: string[] = []
            
            for (const candidate of candidates) {
              const parts = candidate.content?.parts || []
              
              for (const part of parts) {
                if (part.text) {
                  textResponse += part.text
                }
                if (part.inlineData) {
                  // Convert base64 to blob URL
                  const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
                  imageUrls.push(imageUrl)
                }
              }
            }
            
            return {
              text: textResponse,
              images: imageUrls
            }
          } catch (error) {
            console.error('Error editing image:', error)
            throw error
          }
        }
      }
    }
  }
})

// Helper function to convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]
      resolve(base64String)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}