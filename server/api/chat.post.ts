import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  if (!body.message) {
    throw createError({
      statusCode: 400,
      message: 'Message is required'
    });
  }

  try {
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: body.message }],
      model: 'gpt-4o-mini',
    });

    return {
      message: completion.choices[0].message.content
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to get AI response'
    });
  }
});