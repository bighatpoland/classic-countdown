import { NextResponse } from "next/server";

import { generateTextFeedback } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      text?: string;
      focus?: string;
    };

    const result = await generateTextFeedback(body);
    return NextResponse.json(result, {
      status: result.enabled ? 200 : 503
    });
  } catch {
    return NextResponse.json(
      {
        enabled: false,
        text: "Nie udalo sie wygenerowac feedbacku AI."
      },
      { status: 500 }
    );
  }
}
