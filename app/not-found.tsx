import { redirect } from "next/navigation";
export default function NotFound() {
  redirect("/"); // Redirect to the home page
  return null; // Return null to avoid rendering anything else
  // Note: This line will not be reached due to the redirect above.
}
