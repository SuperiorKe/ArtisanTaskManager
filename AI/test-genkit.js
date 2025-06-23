import { suggestTasks, generateProfessionalMessage } from './genkit-flows.js';

// Test the flows
async function test() {
  try {
    console.log("=== Testing AI Task Suggestions ===");
    
    const taskResult = await suggestTasks({
      artisanType: "carpenter",
      currentTasks: ["Fix door", "Build table"]
    });
    
    console.log("AI Task Suggestions:", taskResult.suggestions);
    
    console.log("\n=== Testing Professional Message Generator ===");
    
    // Test quote message
    const quoteMessage = await generateProfessionalMessage({
      messageType: 'quote',
      clientName: 'Mr. Kamau',
      jobDetails: 'Custom dining table for 6 people',
      price: 25000,
      timeframe: '5-7 days'
    });
    
    console.log("Quote Message:", quoteMessage.message);
    
    // Test follow-up message
    const followUpMessage = await generateProfessionalMessage({
      messageType: 'follow_up',
      clientName: 'Mrs. Wanjiku',
      jobDetails: 'Kitchen cabinet installation'
    });
    
    console.log("\nFollow-up Message:", followUpMessage.message);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

test();