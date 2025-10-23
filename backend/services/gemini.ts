import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// Interfaces matching the Form model
interface FormFieldOption {
  value: string;
  label: string;
}

interface FormFieldValidation {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
  validation?: FormFieldValidation;
}

interface FormSchema {
  title: string;
  description: string;
  fields: FormField[];
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('FATAL: GEMINI_API_KEY environment variable not configured.');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Simple and reliable form generator
const generateFallbackFormSchema = (prompt: string): FormSchema => {
  console.log('🔄 Using reliable fallback form generator');
  
  const lowerPrompt = prompt.toLowerCase();
  
  // Contact form
  if (lowerPrompt.includes('contact')) {
    return {
      title: "Contact Form",
      description: "Get in touch with us",
      fields: [
        {
          id: "full_name",
          type: "text",
          label: "Full Name",
          placeholder: "Enter your full name",
          required: true
        },
        {
          id: "email",
          type: "email",
          label: "Email Address",
          placeholder: "your.email@example.com",
          required: true
        },
        {
          id: "message",
          type: "textarea",
          label: "Message",
          placeholder: "How can we help you?",
          required: true
        }
      ]
    };
  }
  
  // Registration form
  if (lowerPrompt.includes('register') || lowerPrompt.includes('signup')) {
    return {
      title: "Registration Form",
      description: "Create your account",
      fields: [
        {
          id: "username",
          type: "text",
          label: "Username",
          placeholder: "Choose a username",
          required: true
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          placeholder: "your.email@example.com",
          required: true
        },
        {
          id: "password",
          type: "text",
          label: "Password",
          placeholder: "Create a password",
          required: true
        }
      ]
    };
  }
  
  // Feedback form
  if (lowerPrompt.includes('feedback') || lowerPrompt.includes('survey')) {
    return {
      title: "Feedback Form",
      description: "We value your opinion",
      fields: [
        {
          id: "rating",
          type: "radio",
          label: "How would you rate our service?",
          required: true,
          options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "average", label: "Average" },
            { value: "poor", label: "Poor" }
          ]
        },
        {
          id: "comments",
          type: "textarea",
          label: "Additional Comments",
          placeholder: "Share your thoughts...",
          required: false
        }
      ]
    };
  }

  // Default form
  return {
    title: "General Form",
    description: "Custom form created for your needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        required: true
      },
      {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        required: true
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Enter your message",
        required: false
      }
    ]
  };
};

export const generateFormSchema = async (prompt: string): Promise<FormSchema> => {
  try {
    console.log('🚀 Starting form generation for:', prompt);

    // Try to use Gemini API if available
    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1000,
        },
      });

      const systemPrompt = `Create a JSON form schema based on: "${prompt}"

Return ONLY valid JSON in this exact format:
{
  "title": "Form Title",
  "description": "Form Description",
  "fields": [
    {
      "id": "field_id",
      "type": "text|email|number|textarea|select|radio|checkbox|file|date",
      "label": "Field Label",
      "required": true,
      "placeholder": "Optional placeholder",
      "options": [{"value": "opt1", "label": "Option 1"}]
    }
  ]
}

Make sure all field IDs are lowercase with underscores.`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      if (text) {
        // Clean and parse JSON
        let cleanedText = text.trim();
        cleanedText = cleanedText.replace(/```json/g, '').replace(/```/g, '');
        
        const startIndex = cleanedText.indexOf('{');
        const endIndex = cleanedText.lastIndexOf('}');

        if (startIndex !== -1 && endIndex !== -1) {
          const jsonString = cleanedText.substring(startIndex, endIndex + 1);
          const schema: FormSchema = JSON.parse(jsonString);

          // Validate basic structure
          if (schema.title && Array.isArray(schema.fields) && schema.fields.length > 0) {
            console.log('✅ AI form generation successful');
            return schema;
          }
        }
      }
    } catch (aiError) {
      console.log('🤖 AI service unavailable, using fallback');
    }

    // Use fallback if AI fails
    return generateFallbackFormSchema(prompt);

  } catch (error: any) {
    console.error('❌ Form generation error:', error.message);
    return generateFallbackFormSchema(prompt);
  }
};