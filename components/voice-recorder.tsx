"use client";

import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "@/components/ui";

type VoiceRecorderProps = {
  onRecordingReady: (audioRef?: string) => void;
};

async function blobToDataUrl(blob: Blob): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onloadend = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

export function VoiceRecorder({ onRecordingReady }: VoiceRecorderProps) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioRef, setAudioRef] = useState<string>();

  useEffect(() => {
    onRecordingReady(audioRef);
  }, [audioRef, onRecordingReady]);

  async function startRecording() {
    setError("");

    if (typeof window === "undefined" || typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("Nagrywanie nie jest dostepne w tej przegladarce.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: BlobPart[] = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        void blobToDataUrl(blob).then((url) => {
          setAudioRef(url);
          stream.getTracks().forEach((track) => track.stop());
        });
      };

      recorder.start();
      setRecording(true);
    } catch {
      setError("Nie udalo sie uruchomic mikrofonu.");
    }
  }

  function stopRecording() {
    mediaRecorder.current?.stop();
    setRecording(false);
  }

  function clearRecording() {
    setAudioRef(undefined);
  }

  return (
    <div className="space-y-3 rounded-3xl border border-shell-line bg-shell-soft/80 p-4">
      <p className="text-sm font-medium text-shell-ink">Lokalne nagranie</p>
      <p className="text-sm leading-6 text-shell-mute">Nagranie zostaje tylko na tym urzadzeniu. Mozesz odsluchac i nagrac ponownie przed zapisem sesji.</p>

      <div className="flex flex-wrap gap-3">
        {recording ? <PrimaryButton onClick={stopRecording}>Zatrzymaj</PrimaryButton> : <PrimaryButton onClick={startRecording}>Nagraj</PrimaryButton>}
        <button className="rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-white" onClick={clearRecording} type="button">
          Nagraj od nowa
        </button>
      </div>

      {audioRef ? <audio className="w-full" controls src={audioRef} /> : null}
      {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
