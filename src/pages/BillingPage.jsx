import React from 'react'
import BillingContainer from '../components/BillingContainer'
import { Link } from 'react-router-dom'

function BillingPage() {
  return (
    <div className='w-full'>
        <section className='w-full flex justify-center'>
            <span className='flex justify-center gap-6 flex-col w-1/2 h-4/5 md:flex-row '>
                <Link to={'billing-orders'} className='rounded-3xl shadow-md bg-slate-100 text-lg font-semibold px-24 py-12'>Ordenes</Link>
                <Link to={'billing-streaming'} className='rounded-3xl shadow-md bg-green-50 text-lg font-semibold px-24 py-12'>Streaming</Link>
                <Link to={'billing-manual'} className='rounded-3xl shadow-md bg-slate-50 text-lg font-semibold px-24 py-12'>Manual</Link>
            </span>
        </section>
    </div>
  
  )
}

export default BillingPage