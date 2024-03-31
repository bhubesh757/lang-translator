"use server"

import { removeTranslation } from "@/mongodb/models/User";
import { revalidateTag } from "@/node_modules/next/cache";
import { auth } from "@clerk/nextjs/server";

// async await
async function deleteTranslation(id : string) {
  auth().protect();

  const {userId} = auth();
  // taking the details from the schema
  const user = await removeTranslation(userId! , id);

  revalidateTag("translationHistory");

  return{
    translations : JSON.stringify(user.translations),
  }
}

export default deleteTranslation