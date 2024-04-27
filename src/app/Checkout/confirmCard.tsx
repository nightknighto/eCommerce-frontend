import React from "react";
import Link from "next/link";

const ConfirmCard = (props:Object)=>{

    const submitOrder= (e:MouseEvent)=>{
        e.preventDefault();
        props.setStep(x=>++x);
        e.target.classList.toggle("hidden")
    }

    return(
        <>
            <form id="card-otp" className=" absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 
                bg-white p-5 h-fit rounded flex flex-col gap-y-5 hidden z-10" onSubmit={submitOrder}>
                <div className="text-xl font-bold text-center">
                    Card was successfully added
                </div>
                <div className="flex flex-row items-center gap-x-3">
                    <label htmlFor="otp" className="text-xl">Enter OTP:</label>
                    <input type="number" name="otp" id="otp" className="h-9 rounded-md text-xl"/>
                </div>
                <input type="submit" className="bg-sky-500 text-white text-xl font-semibold h-10 rounded-md 
                cursor-pointer"/>
            </form>
        </>
    )
}

export default ConfirmCard;