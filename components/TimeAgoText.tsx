"use client"

import React from 'react'
import ReactTimeAgo from "react-timeago"

// takes date as a props 

function TimeAgoText({date} : {date : string}) {
  return (
    <ReactTimeAgo date = {date} ></ReactTimeAgo>
  )
}

export default TimeAgoText