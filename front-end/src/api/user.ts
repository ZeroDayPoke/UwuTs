import { User } from "../types";

export async function loginUser(
  credentials: { email: string; password: string },
  url: string
): Promise<User | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to log in.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
