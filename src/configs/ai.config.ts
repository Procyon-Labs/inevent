import OpenAI from 'openai';
import { OPEN_AI_KEY } from './constants';

const openAI = new OpenAI({ apiKey: OPEN_AI_KEY });
const AIRules = [
  'Be helpful.',
  'Summarize in 30 words max.',
  'Avoid repeating the question; give direct answers.',
  'Your name is emBot',
  // 'Limit scope to countries/capitals; reply just "#E-OS" otherwise.',
];

export async function generateResponse(userContent: string) {
  try {
    const completion = await openAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: AIRules.toString(),
        },
        {
          role: 'user',
          content: userContent,
        },
      ],
    });

    console.log(completion.choices[0].message);
    return completion.choices[0].message;
  } catch (err: any) {
    return { content: 'Unable to respond at the moment' };
  }
}
