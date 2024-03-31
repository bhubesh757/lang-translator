import React from 'react'
import { ITranslation } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";
import TimeAgo from "react-timeago";
import TimeAgoText from './TimeAgoText';
import DeleteTranslation from './DeleteTranslation';


const getLanguage = (code: string) => {
  const lang = new Intl.DisplayNames(["en"], { type: "language" });
  return lang.of(code);
};


async function TranslationHistory() {

  // auth checker 
  // getting authenticated
  const { userId } = auth();

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
  }/translationHistory?userId=${userId}`;

  // getting response from the url 
  const response =  await fetch(url, {
    next: {
      tags: ["translationHistory"],
    },
  });

  // pushing it into the translation fn
  // Array fn
  // schema is created in user.ts
  // retriving the data and history . route.ts 
  const { translations }: { translations: Array<ITranslation> } =
    await response.json();
    

  return (
    <div className=''>
      <h1 className='text-3xl my-5' >
        History 😂
      </h1>

      {/* Base case */}
      {translations.length === 0 && (
        <p className="mb-5 text-gray-400">No translations yet</p>
      )} 
      {/* Mapping the history and retrieving the data  */}
      {translations.map((translation) => (
        <li key={translation._id}
        className = "flex justify-between items-center p-5 hover:bg-gray-50 relative "
        >
          <div>
            {/* language translation */}
            <p className='tex-sm mb-5 text-gray-500 ' >
              {getLanguage(translation.from)} {"->"}  {getLanguage(translation.to)}
            </p>
            {/* text */}
            <div className='space-y-2 pr-5 ' >
              <p>
                {translation.fromText}
              </p>
              <p>
                {translation.toText}
              </p>
            </div>
            {/* time ago  */}
            <p className='absolute top-2 right-2 text-gray-500 text-sm ' >
              <TimeAgoText
              date= {new Date(translation.timestamp).toISOString()}
              />
            </p>

            {/* Delete button */}

            

          </div>
          <DeleteTranslation id = {translation._id} ></DeleteTranslation>
        </li>

      ))}

    </div>
  )
}

export default TranslationHistory