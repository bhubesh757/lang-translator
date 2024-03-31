"use client"
import { TranslationLanguages } from '@/app/translate/page'
import React, { useEffect, useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from './ui/textarea'
import { useFormState } from "react-dom";
import translate from '@/actions/translate'
import Image from '@/node_modules/next/image'
import SubmitButton from './SubmitButton'



const initialState = {
    inputLanguage : "auto",
    input : "",
    outputLanguage : "ta",
    output : "",

}
   
export type State = typeof initialState;

// taking languages as a props

function TranslationForm({languages} : {languages : TranslationLanguages}) {

    // states
    // tacking the values and updating the each of the states after updating
    const [state , formAction] = useFormState(translate , initialState);
    const [input, setinput] = useState("");
    const [output, setoutput] = useState("");
    // ref 
    const submitBtnRef = useRef<HTMLButtonElement>(null);

  //  console.log(state);

//    useEffect

    useEffect(() => {
       if(state.output) {
        setoutput(state.output);
       }
    }, [state])
    

    //Debounce

    useEffect(() => {
        // base case
      if(!input.trim()) return;

      const delayDebounce = setTimeout(() => {
        // submit the form 
        // button auto
        submitBtnRef.current?.click();

      } , 500)

      return () => clearTimeout(delayDebounce);

    }, [input])
    

   
  return (
    <div>
        {/* select voice or text */}

        <div className="flex space-x-2">
        <div className="flex items-center group cursor-pointer border rounded-md w-fit px-3 py-2 bg-[#E7F0FE] mb-5">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/2048px-Google_Translate_logo.svg.png"
            alt="logo"
            width={30}
            height={30}
          />

          {/* style like a blue google button */}
          <p className="text-sm font-medium text-blue-500 group-hover:underline ml-2 mt-1">
            Text
          </p>
        </div>

        {/* <Recorder uploadAudio={uploadAudio} /> */}
      </div>

        <form action= {formAction} >
            {/* Shadcn ui  */}
            <div className='flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 ' >
            <div className='flex-1 space-y-2 ' >
                        <Select name = 'inputLanguage' defaultValue = "auto" >
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a Language" />
                </SelectTrigger>
                
                <SelectContent>

                <SelectGroup>
                            <SelectLabel>Want us to figure it out?</SelectLabel>

                            <SelectItem key="auto" value="auto">
                                Auto-Detection
                            </SelectItem>
                    </SelectGroup>


                    {/* For the languages */}
                    <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    {Object.entries(languages.translation).map(([key , value]) => (
                        <SelectItem key = {key} value = {key} >
                        {value.name}
                    </SelectItem>
                    ))}
                    </SelectGroup>


                </SelectContent>
                </Select>

                {/* TEXT AREA */}

                <Textarea
              className="min-h-32 text-xl bg-gray-50 border-none"
              placeholder="Enter Text 💬"
              name="input"
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
            />
                

            </div>

            {/* 2 nd one  */}
            <div className='flex-1 space-y-2 ' >
                        <Select name = 'outputLanguage' defaultValue = "ta" >
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a Language" />
                </SelectTrigger>
                
                <SelectContent>

                <SelectGroup>
                            <SelectLabel>Want us to figure it out?</SelectLabel>

                            <SelectItem key="auto" value="auto">
                                Auto-Detection
                            </SelectItem>
                    </SelectGroup>


                    {/* For the languages */}
                    <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    {Object.entries(languages.translation).map(([key , value]) => (
                        <SelectItem key = {key} value = {key} >
                        {value.name}
                    </SelectItem>
                    ))}
                    </SelectGroup>


                </SelectContent>
                </Select>

                {/* TEXT AREA */}

                <Textarea placeholder="Translation"
                className='min-h-32 text-xl '
                name = "output"
                value = {output}
                onChange = {(e) => {
                    setoutput(e.target.value);
                }}
                />

            </div>

            {/* Button */}
            <div className='mt-5 flex justify-end'>
                <SubmitButton disabled={!input} />
                <button type = "submit" ref = {submitBtnRef} hidden > Submit</button>
            </div>
            </div>
        </form>
    </div>
  )
}

export default TranslationForm