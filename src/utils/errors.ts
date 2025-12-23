export function extractErrorMessage(err: any): string {
  const data = err?.response?.data;

  if (!data) return "Unexpected error occurred.";

  if (typeof data === "string") return data;

  if (typeof data === "object" && typeof data.message === "string") {
    return data.message;
  }

  if (typeof data === "object" && data.errors) {
    const firstKey = Object.keys(data.errors)[0];
    const firstError = data.errors[firstKey][0];
    return firstError;
  }

  if (typeof data === "object" && typeof data.error === "string") {
    return data.error;
  }

  try {
    return JSON.stringify(data);
  } catch {
    return "Unknown error occurred.";
  }
}
