import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types';

// Challenge templates for each category
const challengeTemplates = {
  listening: [
    { title: 'BBC News Deep Dive', description: 'Listen to one BBC News podcast and summarize 3 main points', xp: 25 },
    { title: 'TED Talk Challenge', description: 'Watch a 10-minute TED Talk without subtitles', xp: 30 },
    { title: 'Podcast Comprehension', description: 'Listen to 15 minutes of an English podcast and note key vocabulary', xp: 20 },
    { title: 'Movie Scene Practice', description: 'Watch one movie scene and write down all idioms used', xp: 25 },
  ],
  reading: [
    { title: 'The Economist Article', description: 'Read one article from The Economist and highlight academic vocabulary', xp: 25 },
    { title: 'IELTS Passage Sprint', description: 'Complete one IELTS Reading passage in 20 minutes', xp: 30 },
    { title: 'News Analysis', description: 'Read a news article and identify topic sentences in each paragraph', xp: 20 },
    { title: 'Academic Journal Skim', description: 'Skim an academic article and list main arguments', xp: 25 },
  ],
  writing: [
    { title: 'Task 2 Essay', description: 'Write 250 words on: "Should governments invest more in public transport?"', xp: 35 },
    { title: 'Task 1 Report', description: 'Describe a bar chart showing smartphone usage by age group', xp: 30 },
    { title: 'Opinion Paragraph', description: 'Write 150 words about environmental responsibility', xp: 20 },
    { title: 'Letter Writing', description: 'Write a formal complaint letter to a hotel manager', xp: 25 },
  ],
  speaking: [
    { title: 'Shadowing Technique', description: 'Shadow a native speaker for 5 minutes using a TED Talk', xp: 20 },
    { title: 'Part 2 Practice', description: 'Record yourself speaking for 2 minutes on: "Describe a memorable journey"', xp: 30 },
    { title: 'Daily Routine Monologue', description: 'Describe your ideal day in English for 3 minutes', xp: 25 },
    { title: 'Pronunciation Drill', description: 'Practice 20 difficult words using pronunciation app', xp: 15 },
  ],
};

export async function GET() {
  // Get today's date to ensure same challenge for the day
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Check if challenge already exists for today
  const { data: existingChallenge } = await supabase
    .from('daily_challenges')
    .select('*')
    .eq('challenge_date', todayStr)
    .single();

  if (existingChallenge) {
    return NextResponse.json(existingChallenge);
  }
  
  // Use day of year to pick consistent challenge
  const categories: Category[] = ['listening', 'reading', 'writing', 'speaking'];
  const categoryIndex = dayOfYear % categories.length;
  const category = categories[categoryIndex];
  
  const templates = challengeTemplates[category];
  const templateIndex = Math.floor(dayOfYear / categories.length) % templates.length;
  const challenge = templates[templateIndex];
  
  // Insert new challenge into database
  const { data: newChallenge, error } = await supabase
    .from('daily_challenges')
    .insert([
      {
        challenge_date: todayStr,
        category,
        title: challenge.title,
        description: challenge.description,
        xp_reward: challenge.xp,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(newChallenge);
}
