"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { TrashIcon } from 'lucide-react'
import deleteTranslation from '@/actions/deleteTranslationAction'


// passing props 

function DeleteTranslation({id} : {id:string}) {

  const deleteTranslationAction = deleteTranslation.bind(null , id);
  
  return (
    <form action = {deleteTranslationAction} >
        <Button 
        type='submit'
        size = "icon"
        variant="outline"
        className=' border-red-500 text-red-500 hover:bg-red-400 hover:text-white '
        >
            <TrashIcon size = {16} ></TrashIcon>
        </Button>
    </form>
  )
}

export default DeleteTranslation