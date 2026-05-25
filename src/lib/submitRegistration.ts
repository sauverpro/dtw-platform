export type RegistrationPayload = {
  name: string;
  email: string;
  organization: string;
  position: string;
  country: string;
  events: string[];
};

type SheetResponse = {
  success?: boolean;
  error?: string;
  ok?: boolean;
  message?: string;
};

const SCRIPT_URL = import.meta.env.VITE_REGISTRATION_SCRIPT_URL?.trim();

/**
 * Sends registration data to a Google Apps Script web app bound to your sheet.
 * Uses text/plain to avoid CORS preflight issues with script.google.com.
 */
export async function submitRegistration(
  payload: RegistrationPayload
): Promise<void> {
  if (!SCRIPT_URL) {
    throw new Error(
      "Registration is not configured. Add VITE_REGISTRATION_SCRIPT_URL to your .env file."
    );
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  let result: SheetResponse;
  try {
    result = JSON.parse(text) as SheetResponse;
  } catch {
    throw new Error(
      "Could not read the server response. Check that your Google Apps Script is deployed as a web app (Anyone can access)."
    );
  }

  if (!result.success) {
    throw new Error(result.error ?? "Registration failed. Please try again.");
  }
}

export function isRegistrationConfigured(): boolean {
  return Boolean(SCRIPT_URL);
}
