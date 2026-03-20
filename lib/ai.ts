export type AiPromptRequest = {
  topic?: string;
  mode?: "quiet" | "voice";
  recentPhrases?: string[];
};

export type AiFeedbackRequest = {
  text?: string;
  focus?: string;
};

function getAiConfig() {
  return {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL
  };
}

export function isAiEnabled(): boolean {
  return Boolean(getAiConfig().apiKey);
}

async function requestOpenAi(instructions: string, input: string): Promise<string> {
  const { apiKey, model } = getAiConfig();

  if (!apiKey) {
    throw new Error("AI_DISABLED");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model ?? "gpt-4.1-mini",
      instructions,
      input
    })
  });

  if (!response.ok) {
    throw new Error("AI_REQUEST_FAILED");
  }

  const data = (await response.json()) as { output_text?: string };
  return data.output_text?.trim() ?? "";
}

export async function generateSpeakingPrompt(payload: AiPromptRequest): Promise<{ enabled: boolean; text: string }> {
  if (!isAiEnabled()) {
    return {
      enabled: false,
      text: "AI jest wylaczone. Korzystaj z lokalnych promptow tygodnia."
    };
  }

  const modeLine = payload.mode === "quiet" ? "Tryb quiet/public." : "Tryb voice/private.";
  const phrases = payload.recentPhrases?.length ? `Frazy do wykorzystania: ${payload.recentPhrases.join("; ")}` : "Bez dodatkowych fraz.";

  const text = await requestOpenAi(
    "You generate one short beginner-friendly Spanish speaking prompt for a solo learner. Return in Polish with one Spanish prompt and three short support bullets. Keep it practical for a 5-7 minute speaking session.",
    `Temat: ${payload.topic ?? "codziennosc"}. ${modeLine} ${phrases}`
  );

  return {
    enabled: true,
    text
  };
}

export async function generateTextFeedback(payload: AiFeedbackRequest): Promise<{ enabled: boolean; text: string }> {
  if (!isAiEnabled()) {
    return {
      enabled: false,
      text: "AI jest wylaczone. Uzyj lokalnej checklisty: zaciecia, laczniki, zrozumialosc, pewnosc."
    };
  }

  const text = await requestOpenAi(
    "You provide concise supportive feedback for a Spanish learner. Return in Polish. Structure: one short encouragement, three practical corrections or suggestions, and one tiny next step.",
    `Tekst uczennicy: ${payload.text ?? ""}\nFokus: ${payload.focus ?? "plynnosc i naturalnosc"}`
  );

  return {
    enabled: true,
    text
  };
}
