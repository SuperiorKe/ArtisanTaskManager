import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Genkit with Google AI
const ai = genkit({
  plugins: [googleAI()],
});

// Simple flow for artisan task suggestions
export const suggestTasks = ai.defineFlow(
  {
    name: 'suggestTasks',
    inputSchema: z.object({
      artisanType: z.string(),
      currentTasks: z.array(z.string()).optional(),
    }),
    outputSchema: z.object({
      suggestions: z.array(z.string()),
    }),
  },
  async (input) => {
    const prompt = `
    You are helping a ${input.artisanType} in Nairobi organize their work.
    Current tasks: ${input.currentTasks?.join(', ') || 'None listed'}
    
    Suggest 3-5 practical tasks they should prioritize today.
    Focus on business growth and efficiency.
    Return as a numbered list.
    `;

    const llmResponse = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: prompt,
    });

    // Extract text using the correct method - it's in the custom object
    const responseText = llmResponse.custom.text();
    
    return {
      suggestions: responseText.split('\n').filter(line => line.trim())
    };
  }
);

// Professional Message Generator for Artisans
export const generateProfessionalMessage = ai.defineFlow(
  {
    name: 'generateProfessionalMessage',
    inputSchema: z.object({
      messageType: z.enum(['quote', 'follow_up', 'completion', 'delay', 'thank_you']),
      clientName: z.string(),
      jobDetails: z.string(),
      price: z.number().optional(),
      timeframe: z.string().optional(),
      reason: z.string().optional(), // for delays
    }),
    outputSchema: z.object({
      message: z.string(),
      subject: z.string().optional(),
    }),
  },
  async (input) => {
    let prompt = '';
    
    switch (input.messageType) {
      case 'quote':
        prompt = `
        Write a professional WhatsApp message for a Kenyan artisan to send a quote to a client.
        Client name: ${input.clientName}
        Job: ${input.jobDetails}
        Price: KSh ${input.price?.toLocaleString() || '[PRICE]'}
        Timeframe: ${input.timeframe || '[TIMEFRAME]'}
        
        Make it:
        - Professional but friendly
        - Clear about price and timeline
        - Include call to action
        - Use Kenyan context
        `;
        break;
        
      case 'follow_up':
        prompt = `
        Write a polite follow-up WhatsApp message for a Kenyan artisan.
        Client name: ${input.clientName}
        Job: ${input.jobDetails}
        
        Make it:
        - Polite and professional
        - Not pushy
        - Show continued interest
        - Ask for update/decision
        `;
        break;
        
      case 'completion':
        prompt = `
        Write a professional job completion message for a Kenyan artisan.
        Client name: ${input.clientName}
        Job: ${input.jobDetails}
        
        Make it:
        - Professional and proud
        - Request feedback
        - Open door for future work
        - Include payment reminder if needed
        `;
        break;
        
      case 'delay':
        prompt = `
        Write a professional delay notification for a Kenyan artisan.
        Client name: ${input.clientName}
        Job: ${input.jobDetails}
        Reason: ${input.reason || 'unforeseen circumstances'}
        New timeframe: ${input.timeframe || '[NEW TIMEFRAME]'}
        
        Make it:
        - Apologetic but professional
        - Clear about new timeline
        - Take responsibility
        - Reassure about quality
        `;
        break;
        
      case 'thank_you':
        prompt = `
        Write a thank you message after completing work for a Kenyan artisan.
        Client name: ${input.clientName}
        Job: ${input.jobDetails}
        
        Make it:
        - Grateful and professional
        - Ask for referrals politely
        - Leave door open for future work
        `;
        break;
    }

    const llmResponse = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: prompt,
    });

    const responseText = llmResponse.custom.text();
    
    return {
      message: responseText.trim(),
      subject: `Re: ${input.jobDetails}`,
    };
  }
);