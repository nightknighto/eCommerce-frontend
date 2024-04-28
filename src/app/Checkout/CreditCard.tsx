import React, { MouseEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CreditCardProps {
    id: number;
    setLoader: Function,
    setBgDisplay: Function,
    closeConfirm: Number,
    setCloseConfirm: Function,
    setShowOtpForm: Function
}

const CreditCard = ({ id, setLoader, setBgDisplay, closeConfirm, setCloseConfirm, setShowOtpForm }: CreditCardProps)=>{

    const [confirmation,setConfirmation] = useState("hidden")
    const [numberBorder,setNumberBorder] = useState("border-slate-500");
    const [cvcBorder,setCvcBorder] = useState("border-slate-500");
    const [numberIndicator,setNumberIndictor] = useState("hidden")
    const [cvcIndicator,setCvcIndicator] = useState("hidden")

    const showConfirmHandler = (e:any)=>{
        setCloseConfirm(id);
        setConfirmation("block")
    }

    useEffect(()=>{
        if(closeConfirm !== id){
            setConfirmation("hidden")
        }
    },[closeConfirm])
    
    const confirm = (e:any)=>{
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const number = Array.from(form)[0][1] as string;
        const cvc = Array.from(form)[1][1] as string; 
        let flag = false;
        if(number.length !== 16){
            setNumberBorder("border-red")
            setNumberIndictor("block")
            flag =true;
        }else{
            setNumberBorder("border-slate-500")
            setNumberIndictor("hidden")
        } 
        if(cvc.length !== 3){
            setCvcBorder("border-red")
            setCvcIndicator("block")
            flag =true;
        }else{
            setCvcIndicator("hidden")
            setCvcBorder("border-slate-500")
        }
        if(flag) return;

        setBgDisplay("block")
        setLoader("block")
        setTimeout(()=>{
            setLoader("hidden")
            setShowOtpForm(true);
        },1200)
    }
    return(
        <>
            <div className="card bg-white hover:bg-slate-100 shadow-lg cursor-pointer flex flex-col text-sm font-semibold">
                <div className="bg-white hover:bg-slate-100 cursor-pointer bg-inherit py-5 flex flex-row text-sm font-semibold gap-x-10" onClick={showConfirmHandler}>
                    <div className="flex flex-row gap-x-1 w-35 items-center justify-center">
                        <Image
                            src={"/images/cards/visa-gold-affluent-800x450.webp"}
                            alt="card-image"
                            width={300}
                            height={300}
                            style={{width:"30px",height:"15px"}}
                            />
                        <span>Visa 1</span>
                    </div>
                    <div className="w-35 text-center">SHERIF KADASH</div>
                    <div className="w-35 text-center">xxxx-xxxx-xxxx-2343</div>
                    <div className="w-35 text-center">08-2026</div>
                </div>
                <div className={`credit-card-confirmation p-5 ${confirmation}`} id={`credit-card-confirmation-${id}`}>
                    <form className="flex flex-row gap-x-2 items-center text-xl" onSubmit={confirm}>
                        <label htmlFor={`number-${id}`}>Confirm number:&nbsp;</label>
                        <input type="number" name={`number-${id}`} id={`number-${id}`} className={`h-8 font-normal rounded-md border-1 ${numberBorder}`}/>
                        <label htmlFor={`cvc${id}`}>CVC</label>
                        <input type="password" name={`cvc-${id}`} id={`cvc-${id}`} className={`h-8 font-normal rounded-md border-1 ${cvcBorder}`}
                        onChange={e=>{
                            if(e.target.value.length > 3){
                                e.preventDefault();
                                e.target.value = e.target.value.substring(0,3);
                            }
                        }}/>
                        <input type="submit" value={"Confirm"} className="bg-sky-500 h-8 w-30 rounded-md 
                        text-white cursor-pointer hover:shadow-lg"/>
                    </form>
                    <p className={`${numberIndicator} text-red`}>&#9888;&nbsp;Enter a valid credit card number</p>
                    <p className={`${cvcIndicator} text-red`}>&#9888;&nbsp;Enter a valid cvc</p>
                </div>
            </div>
        </>
    )
}

export default CreditCard;