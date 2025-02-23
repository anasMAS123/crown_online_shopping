import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
if (!writeClient.config().token) throw new Error("Access write Denied");
