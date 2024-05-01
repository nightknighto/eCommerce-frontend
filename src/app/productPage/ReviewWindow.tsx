import React, { useState } from "react";
import Link from "next/link";
import { Span } from "next/dist/trace";

interface reviewWindowProps {
    productId: number,
}

const ReviewWindow = ({productId}:reviewWindowProps)=>{

    const [rate,setRate] = useState(0);

    return(
        <>
            <div className={`review-window flex flex-col rounded-md`} id="add-review">
                <div className="text-2xl font-bold text-white text-center w-full border-b-2 border-black
                bg-slate-500 h-10 flex flex-col justify-center rounded-t-md">Make Review</div>
                <form className="flex flex-col justify-between gap-y-5 h-full w-full py-5 px-5">
                    <div className="font-semibold">
                        <span className="text-xl font-semibold">Profile:&nbsp;</span>
                        <span className="text-xl">Reviewer 2020</span>
                    </div>
                    <div className="flex flex-row items-center text-xl font-semibold">
                        <span>Rating:&nbsp;</span>
                        <div className="flex flex-row gap-x-1">
                            <div className="cursor-pointer text-2xl" style={{color:"#ffa534"}} onClick={e=>setRate(1)} >{rate >= 1?<span>&#9733;</span>:<span>&#9734;</span>}</div>
                            <div className="cursor-pointer text-2xl" style={{color:"#ffa534"}} onClick={e=>setRate(2)} >{rate >= 2?<span>&#9733;</span>:<span>&#9734;</span>}</div>
                            <div className="cursor-pointer text-2xl" style={{color:"#ffa534"}} onClick={e=>setRate(3)} >{rate >= 3?<span>&#9733;</span>:<span>&#9734;</span>}</div>
                            <div className="cursor-pointer text-2xl" style={{color:"#ffa534"}} onClick={e=>setRate(4)} >{rate >= 4?<span>&#9733;</span>:<span>&#9734;</span>}</div>
                            <div className="cursor-pointer text-2xl" style={{color:"#ffa534"}} onClick={e=>setRate(5)} >{rate >= 5?<span>&#9733;</span>:<span>&#9734;</span>}</div>
                        </div>

                    </div>
                    <div className="flex flex-col text-xl ">
                        <label className="font-semibold" htmlFor="title">Title</label>
                        <input className="text-2xl text-black rounded-md mt-1" type="text" id="title" />
                    </div>
                    <div className="flex flex-col text-xl">
                        <label className="font-semibold" htmlFor="description">Description</label>
                        <textarea className="text-2xl text-black rounded-md mt-1" name="" id="description" cols={30} rows={10} style={{resize:"none"}}></textarea>
                    </div>
                    <input type="submit" className="bg-slate-200 m-auto text-black text-2xl font-semibold rounded-md w-50 
                    shadow-sm shadow-slate-300 h-10 hover:shadow-md hover:bg-slate-300 duration-500 cursor-pointer"/>
                </form>
            </div>
        </>
    )
}

export default ReviewWindow;