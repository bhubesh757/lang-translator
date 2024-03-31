'use server'

import { State } from '@/components/TranslationForm';
import connectDb from '@/mongodb/db';
import { addOrUpdateUser } from '@/mongodb/models/User';
import { revalidateTag } from '@/node_modules/next/cache';
import { auth } from '@clerk/nextjs/server'
//it can be accessed only by the auth user
import axios from "axios"
import {v4} from "uuid";


// keys required 

const endpoint = process.env.AZURE_TEXT_TRANSLATION;
const key = process.env.AZURE_TEXT_TRANSLATION_KEY;
const location = process.env.AZURE_TEXT_LOCATION;

console.log(endpoint);

async function translate(prevState: State, formData: FormData) {
    // checking whether it is logged in or not
    auth().protect();
    // getting the user id
    const {userId}  = auth();
    if(!userId) throw new Error("User Not Logged in ")

    // take the data from the user
    // storing it in the rawform data
    // server rendering actions
    const rawFormData = {
        inputLanguage : formData.get("inputLanguage") as string,
        input :  formData.get("input") as string,
        outputLanguage : formData.get("outputLanguage") as string,
        output : formData.get("output") as string,
    }

    // Taken the input and giving request 

    // Request to the translation api

    const response = await axios({
    baseURL: endpoint,
    url: "translate",
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key!,
      "Ocp-Apim-Subscription-Region": location!,
      "Content-type": "application/json",
      "X-ClientTraceId": v4().toString(),
    },
    params: {
      "api-version": "3.0",
      from:
        rawFormData.inputLanguage === "auto" ? null : rawFormData.inputLanguage,
      to: rawFormData.outputLanguage,
    },
    data: [
      {
        text: rawFormData.input,
      },
    ],
    responseType: "json",
  });


  

    //taking the response and storing in the data
    const data = response.data;

    console.log(data);

    if(data.error) {
        console.log(`Error ${data.error.code} : ${data.error.message}`);
        
    }

    //pushing the data to the mongodb

    // Backend and storage
    // MONGODB 

    await connectDb();

    if (rawFormData.inputLanguage === "auto") {
      rawFormData.inputLanguage = data[0].detectedLanguage.language;
    }
  
    try {
      const translation = {
        to: rawFormData.outputLanguage,
        from: rawFormData.inputLanguage,
        fromText: rawFormData.input,
        toText: data[0].translations[0].text,
      };
  
      addOrUpdateUser(userId, translation);
    } catch (err) {
      console.error(err);
    }
  
    // caching the data
    revalidateTag("translationHistory");

    return {
        ...prevState,
        output: data[0].translations[0].text,
      };
    
}

export default translate;