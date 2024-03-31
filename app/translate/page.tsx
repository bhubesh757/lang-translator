import React from 'react'
import { auth } from '@clerk/nextjs/server'
import TranslationForm from '@/components/TranslationForm';
import TranslationHistory from '@/components/TranslationHistory';

export type TranslationLanguages = {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
}

async function Translator() {
  auth().protect();

  const {userId} = auth();
  if(!userId) throw new Error("User Not Logged in ")

  // API  fetching

  // every 60 seconds it need to revalidate 
  const response = await fetch(
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
    {
      next : {
        revalidate : 60*60*24, // caching resuslts every 24 hrs
      }
    }
  )

const languages = (await response.json()) as TranslationLanguages ;


  

  return (
    <div className=' px-10 xl:px-0 mb-20 ' >
    {/* Form */}
    {/* passing languages as a props */}
    <TranslationForm languages = {languages} ></TranslationForm>

    {/* History board */}
    <TranslationHistory/>
    </div>
  )
}

export default Translator

 


