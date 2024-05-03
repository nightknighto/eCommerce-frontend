import React, { MouseEventHandler, MouseEvent, useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

interface CreditCardProps {
    id: number;
    setLoader: (b:boolean)=>void,
    setBgDisplay: (b:boolean)=>void,
    closeConfirm: number,
    setCloseConfirm: (id:number)=>void,
    setShowOtpForm: (b:boolean)=>void
}

const CreditCard = ({ id, setLoader, setBgDisplay, closeConfirm, setCloseConfirm, setShowOtpForm }: CreditCardProps)=>{

    const [confirmation,setConfirmation] = useState(false);
    const [numberBorder,setNumberBorder] = useState(false);
    const [cvcBorder,setCvcBorder] = useState(false);

    const showConfirmHandler = (e:MouseEvent)=>{
        setCloseConfirm(id);
        setConfirmation(true)
    }

    useEffect(()=>{
        if(closeConfirm !== id){
            setConfirmation(false)
        }
    },[closeConfirm])
    
    const confirm = (e:FormEvent)=>{
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const number = Array.from(form)[0][1] as string;
        const cvc = Array.from(form)[1][1] as string; 
        let flag = false;
        if(number.length !== 16){
            setNumberBorder(true)
                flag =true;
        }else{
            setNumberBorder(false)
        } 
        if(cvc.length !== 3){
            setCvcBorder(true)
            flag =true;
        }else{
            setCvcBorder(false)
        }
        if(flag) return;

        setBgDisplay(true)
        setLoader(true)
        setTimeout(()=>{
            setLoader(false)
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
                <div className={`credit-card-confirmation p-5 ${confirmation?"flex":"hidden"} flex-row justify-center`} id={`credit-card-confirmation-${id}`}>
                    <form className="flex flex-row gap-x-2 items-center text-xl" onSubmit={confirm}>
                        <label htmlFor={`number-${id}`}>Confirm number:&nbsp;</label>
                        <input type="number" name={`number-${id}`} id={`number-${id}`} className={`h-8 font-normal rounded-md border-1 ${numberBorder?"border-red":"border-slate-500"}`}/>
                        <label htmlFor={`cvc-${id}`}>CVC</label>
                        <input type="password" name={`cvc-${id}`} id={`cvc-${id}`} className={`h-8 w-15 font-normal rounded-md border-1 ${cvcBorder?"border-red":"border-slate-500"}`}
                        onChange={e=>{
                            if(e.target.value.length > 3){
                                e.preventDefault();
                                e.target.value = e.target.value.substring(0,3);
                            }
                        }}/>
                        <input type="submit" value={"Confirm"} className="bg-sky-500 h-8 w-25 rounded-md 
                        text-white cursor-pointer hover:shadow-lg"/>
                    </form>
                    <p className={`${numberBorder?"block":"hidden"} text-red`}>&#9888;&nbsp;Enter a valid credit card number</p>
                    <p className={`${cvcBorder?"block":"hidden"} text-red`}>&#9888;&nbsp;Enter a valid cvc</p>
                </div>
            </div>
        </>
    )
}

export default CreditCard;