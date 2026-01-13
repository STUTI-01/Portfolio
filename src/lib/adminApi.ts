const PASSCODE_KEY = "admin_passcode";

export const getPasscode = () => sessionStorage.getItem(PASSCODE_KEY) || "";

const BASE_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/wanderer-admin`;

export async function adminApi(body: Record<string, unknown>) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passcode: getPasscode(), ...body }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export async function adminUpload(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("passcode", getPasscode());
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Upload failed");
  }
  const data = await res.json();
  return data.url;
}
