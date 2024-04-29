"use client"

import React, { ReactEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CreditCard from "./CreditCard";
import ConfirmCard from "./confirmCard";
import Address from "./Address";
import Payment from "./Payment";
import Done from "./Complete";
import Order from "./OrderContainer";

const Checkout = () =>{

    const steps = {1:"address",2:"payment",3:"done"};
    let [step,setStep] = useState(1);
    const [nextDisplay,setNextDisplay] = useState(true);
    const [prevDisplay,setprevDisplay] = useState(true);
    const [bgDispaly,setBgDisplay] = useState(false);
    const [loaderDisplay,setLoader] = useState(false)
    const [showOtpForm,setShowOtpForm] = useState(false);


    const next = (e:any)=>{
        setStep(s=>++s);
    }
    const prev = (e:any)=>{
        setStep(s=>--s);
    }

    return(
        <>
        <div className="outer-checkout">
            <div className="checkout-page m-auto bg-white rounded-md flex flex-col justify-between">
                <h1 className="h-15 flex flex-row justify-center items-center bg-slate-300 
                text-2xl font-semibold text-black">Checkout</h1>
                <div className="checkout flex flex-row" id="checkout-main-container">
                    <div id="checkout-background" className={`absolute top-0 left-0 w-full h-full bg-white z-10 ${bgDispaly?"block":"hidden"} opacity-50`}></div>
                    <div className={`loader ${loaderDisplay?"block":"hidden"}`}></div>
                    {
                        step === 1?
                        (
                            <><Address></Address></>
                        ):step === 2?
                        (
                            <><Payment setNextDisplay={setNextDisplay} setBgDisplay={setBgDisplay} setLoader={setLoader} setShowOtpForm={setShowOtpForm}></Payment></>
                        ):
                        (
                            <Done></Done>
                        )
                    }
                    <Order step={step}></Order>
                    {
                        showOtpForm?(
                            <ConfirmCard setStep={setStep} setShowOtpForm={setShowOtpForm} setBgDisplay={setBgDisplay}></ConfirmCard>
                        ):("")
                    }
                    
                </div>
                <div className="flex flex-row justify-between items-center h-15 bg-slate-300">
                    <button className={`mx-3 h-fit px-2 py-1 w-20 box-border rounded-lg bg-sky-500 text-white 
                    text-xl hover:-translate-x-1 duration-200 ${step !== 2? "invisible":""}`} id="previous" onClick={prev}>Before</button>
                    <button className={`mx-3 h-fit px-2 py-1 w-20 box-border rounded-lg bg-sky-500 
                    text-white text-xl hover:translate-x-1 duration-200 ${step === 1?"block":(nextDisplay?"block":"hidden")} ${step === 3? "invisible":""}`} id="next" onClick={next}>Next</button>
                </div>
                <div className={`bottom h-1 bg-sky-500 duration-500 ${step === 1 ? `w-1/3` : step === 2 ? `w-2/3` : `w-full`}`} id="progress"></div>
            </div>
        </div>
        </>
    )
}

export default Checkout;
