import { NextResponse } from "next/server";

import { generateSpeakingPrompt } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      topic?: string;
      mode?: "quiet" | "voice";
      recentPhrases?: string[];
    };

    const result = await generateSpeakingPrompt(body);
    return NextResponse.json(result, {
      status: result.enabled ? 200 : 503
    });
  } catch {
    return NextResponse.json(
      {
        enabled: false,
        text: "Nie udalo sie wygenerowac promptu AI."
      },
      { status: 500 }
    );
  }
}
