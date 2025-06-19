import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
});

export interface TextCorrectionRequest {
  inputText: string;
  instruction: string;
}

export interface TextCorrectionResponse {
  correctedText: string;
  error?: string;
}

export const correctText = async (
  request: TextCorrectionRequest
): Promise<TextCorrectionResponse> => {
  try {
    const message = await anthropic.messages.create({
      model: import.meta.env.VITE_CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: `以下のテキストを、指示に従って修正してください。

【修正したいテキスト】
${request.inputText}

【修正の指示】
${request.instruction}

修正されたテキストのみを返してください。説明やコメントは不要です。`,
        },
      ],
    });

    const correctedText = message.content[0].type === 'text' 
      ? message.content[0].text.trim()
      : '';

    return { correctedText };
  } catch (error) {
    console.error('Claude API エラー:', error);
    return {
      correctedText: '',
      error: error instanceof Error ? error.message : '不明なエラーが発生しました',
    };
  }
}; 