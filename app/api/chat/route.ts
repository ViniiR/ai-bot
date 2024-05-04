import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";
import { env } from "process";

const HF = new HfInference(env.HF_API_KEY);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const { messages } = await request.json();

    const res = HF.textGenerationStream({
        model: "google/gemma-1.1-7b-it",
        stream: true,
        inputs: experimental_buildOpenAssistantPrompt(messages),
        parameters: {
            typical_p: 0.2,
            details: true,
            max_new_tokens: 500,
            repetition_penalty: 1,
            return_full_text: true,
        },
    });

    const stream = HuggingFaceStream(res);

    return new StreamingTextResponse(stream);
}
