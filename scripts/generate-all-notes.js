// Run this script to generate AI notes for all parables
// Usage: node scripts/generate-all-notes.js

const { parables } = require('../data/parables.ts');

async function generateNotesForAllParables() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  for (const parable of parables) {
    console.log(`Generating notes for: ${parable.title}`);
    
    try {
      const response = await fetch(`${baseUrl}/api/generate-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parableId: parable.id }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Generated ${result.notes.length} notes for ${parable.title}`);
      } else {
        console.error(`❌ Failed to generate notes for ${parable.title}:`, await response.text());
      }
    } catch (error) {
      console.error(`❌ Error generating notes for ${parable.title}:`, error.message);
    }
    
    // Wait 1 second between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 Finished generating notes for all parables!');
}

generateNotesForAllParables();