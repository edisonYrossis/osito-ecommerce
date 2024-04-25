import React from 'react'
import { Link } from 'react-router-dom'
import leftArrow from '../../src/assets/left-arrow.png'

function BillingStreaming() {
  return (
    <>
     <div className="px-10 py-4 w-fit h-fit" >
        <Link
          to={"billing"}
          className="flex items-center h-10 w-fit "
        >
          <img src={leftArrow} alt="" className="w-10 h-10" />
          <p className="font-semibold text-normal">Back</p>
        </Link>
      </div>
   
    </>
  )
}

export default BillingStreaming