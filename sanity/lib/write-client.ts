import { createClient } from "next-sanity";
import "server-only"; // Ensure this is only imported on the server side

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
});

if (!writeClient.config().token) {
  throw new Error(
    "Write client is not initialized. Ensure the environment variables are set correctly."
  );
}
