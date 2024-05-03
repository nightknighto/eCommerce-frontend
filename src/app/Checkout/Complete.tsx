import React, { useEffect, useState } from "react";
import Link from "next/link";

const Done = ()=>{
    const [position,setPosition] = useState('translate-x-full')

    useEffect(()=>{
        setPosition("")
    },[])
    return (
        <>
            <div id="done-step" className={`done flex flex-col w-full relative h-fit gap-y-70 top-40 ${position} duration-500`}>
                <h1 className="text-center w-full 
                text-green-500 text-2xl font-semibold">Order is successfully made&nbsp;<span className="text-3xl">&#10003;</span></h1>
                <div className="flex flex-row gap-x-10 w-full justify-center items-center">
                    <button className="text-xl p-1 border-b-2 border-b-white hover:border-b-2 
                    hover:border-b-sky-500 hover:text-black">Track Order</button>
                    <button className="text-xl p-1 border-b-2 border-b-white hover:border-b-2 
                    hover:border-b-sky-500 hover:text-black">Continue shopping</button>
                </div>
            </div>
        </>
    )
}

export default Done;