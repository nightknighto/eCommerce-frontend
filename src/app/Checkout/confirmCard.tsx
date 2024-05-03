import React, { FormEvent, useState } from "react";
import Link from "next/link";

interface ConfirmCardProps {
    setStep: (f:(s:number)=>number)=>void,
    setShowOtpForm: (b:boolean)=>void,
    setBgDisplay: (b:boolean)=>void
}

const ConfirmCard = ({ setStep, setShowOtpForm, setBgDisplay }:ConfirmCardProps)=>{

    const [otpBorder,setOtpBorder] = useState(false);

    const submitOrder= (e: FormEvent)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const otp = Array.from(new FormData(form))[0][1] as string;
        if(otp.length === 0){
            setOtpBorder(true)
        }else{
            setStep((x: number)=>++x);
            setShowOtpForm(false);
            setBgDisplay(false)
        }
    }

    return(
        <>
            <form id="card-otp" className={`absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 
                bg-white p-5 h-fit rounded flex flex-col gap-y-5 z-10`} onSubmit={submitOrder}>
                <div className="text-xl font-bold text-center">
                    Card was successfully added
                </div>
                <div className="flex flex-row items-center gap-x-3">
                    <label htmlFor="otp" className="text-xl">Enter OTP:</label>
                    <input type="number" name="otp" id="otp" className={`h-9 rounded-md text-xl border-1 ${otpBorder?"border-red":"border-slate-500"}`}/>
                </div>
                <input type="submit" className="bg-sky-500 text-white text-xl font-semibold h-10 rounded-md 
                cursor-pointer"/>
            </form>
        </>
    )
}

export default ConfirmCard;