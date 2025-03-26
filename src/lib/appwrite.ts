import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "");

export const account = new Account(client);
export default client;

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return null; // User session expired or not logged in
  }
}
