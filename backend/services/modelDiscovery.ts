import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export interface AvailableModel {
  name: string;
  displayName: string;
  supportedGenerationMethods: string[];
}

export const discoverAvailableModels = async (): Promise<AvailableModel[]> => {
  try {
    const result = await genAI.listModels();
    return result.models.map(model => ({
      name: model.name,
      displayName: model.displayName || 'Unknown',
      supportedGenerationMethods: model.supportedGenerationMethods || []
    }));
  } catch (error) {
    console.error('❌ Failed to discover models:', error);
    return [];
  }
};

export const findUsableModel = async (): Promise<string | null> => {
  const models = await discoverAvailableModels();
  
  console.log('🔍 Available models:');
  models.forEach(model => {
    console.log(`- ${model.name} (${model.displayName})`);
    console.log(`  Methods: ${model.supportedGenerationMethods.join(', ')}`);
  });

  // Look for models that support generateContent
  const usableModels = models.filter(model => 
    model.supportedGenerationMethods.includes('generateContent')
  );

  if (usableModels.length === 0) {
    console.log('❌ No models support generateContent method');
    return null;
  }

  // Prefer models in this order
  const preferredModels = [
    'gemini-pro',
    'gemini-1.0-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash'
  ];

  for (const preferred of preferredModels) {
    const found = usableModels.find(model => 
      model.name.includes(preferred) || model.displayName.includes(preferred)
    );
    if (found) {
      console.log(`✅ Selected model: ${found.name}`);
      return found.name;
    }
  }

  // Fallback to first usable model
  console.log(`✅ Using first available model: ${usableModels[0].name}`);
  return usableModels[0].name;
};