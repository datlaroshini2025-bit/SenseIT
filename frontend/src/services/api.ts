const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");

export async function analyzeImage(imageBase64: string, command = "describe what you see") {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: imageBase64, command })
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(body || `Analysis failed (${response.status})`);
  }
  return (await response.json()) as { text: string };
}

export async function checkBackend() {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) throw new Error("Backend unavailable");
  return response.json() as Promise<{ status: string }>;
}