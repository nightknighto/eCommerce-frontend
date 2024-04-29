import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import CreditCard from "./CreditCard";

interface PaymentProps {
    setNextDisplay:Function,
    setBgDisplay:Function,
    setLoader:Function,
    setShowOtpForm: Function
}
const Payment = ({setNextDisplay, setBgDisplay, setLoader, setShowOtpForm}:PaymentProps)=>{

    const [creditCardDisplay,setCreditCardDisplay] = useState(false);
    const [credeitNumberBorder,setCreditNumberBorder] = useState(false) //false=>border-slate-500
    const [credeitNameBorder,setCreditNameBorder] = useState(false)
    const [cvcBorder,setCvcBorder] = useState(false)
    const [invalidInfoPropmpt,setinvalidInfoPropmpt] = useState(false)
    const [closeConfirm,setCloseConfirm] = useState(0);
    const [position,setPosition] = useState(false) //false => translate-x-full

    useEffect(()=>{
        setPosition(true)
    },[])

    const methodHandler = (open: boolean)=>{
        if(open){
            setCreditCardDisplay(true);
            setNextDisplay(false)
        }else{
            setCreditCardDisplay(false);
            setNextDisplay(true)
        }
    }

    const addCardHandler = (e:FormEvent)=>{
        e.preventDefault()
        const values = new FormData(e.target as HTMLFormElement);
        let flag:boolean = false;
        let format = /[0123456789`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        for(let i = 0;i<Array.from(values).length;i++){
            const value = Array.from(values)[i][1] as string;
            if(i === 0){
                if(value.length !== 16){
                    setCreditNumberBorder(true);
                    flag = true;
                }else setCreditNumberBorder(false);
            }
            if(i === 1){
                if(format.test(value) || value.length === 0){
                    setCreditNameBorder(true);
                    flag = true;
                }else setCreditNameBorder(false)
            }
            if(i === 4){
                console.log(value)
                if(value.length !== 3){
                    setCvcBorder(true);
                    flag = true;
                }else setCvcBorder(false);
            }
        }
        if(flag){
            setinvalidInfoPropmpt(true)
            return;
        }

        setBgDisplay(true)
        setLoader(true)
        setTimeout(()=>{
            // setBgDisplay("hidden")
            setLoader(false)
            setShowOtpForm(true)
        },1800)


    }

    useEffect(()=>{
        setNextDisplay(true)
    },[])

    return (
        <>
            <div id="payment-step" className={`payment flex flex-col gap-y-5 w-4/6 p-3 ${position?"":"translate-x-full"} duration-500`}>
                <div className="text-xl font-semibold">Enter Your Billing Info</div>
                <div className="Billing flex flex-col gap-y-5">
                    <div className="cod">
                        <div className="flex flex-row text-xl items-center gap-x-2">
                            <input type="radio" name="payment-method" defaultChecked onChange={methodHandler.bind(null, false)} id="cod"/>
                            <label htmlFor="cod" className="font-semibold">Cash on Delivery &#40;COD&#41;</label>
                        </div>
                        <div>
                            <p>Cash on Delivery is Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quisquam dolorem, ipsam ut omnis itaque perferendis adipisci sequi, et quia quam, quidem veniam velit ab dolorum doloribus explicabo nesciunt natus.</p>
                        </div>
                    </div>
                    <div className="master-card flex flex-col">
                        <div className="flex flex-row text-xl items-center gap-x-2">
                            <input type="radio" name="payment-method" onChange={e => methodHandler(true)} id="credit-card"/>
                            <label htmlFor="credit-card" className="font-semibold">Credit card</label>
                        </div>
                        <div className={`credit-card-div flex flex-col w-full gap-y-3 mt-3 text-xl ${creditCardDisplay ? "flex":"hidden"}`} id="credit-card-div">
                            <div className="card flex flex-row justify-between">
                                <div className="add-new-card">
                                    <div className="flex flex-row items-center gap-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v240H160v240h400v80H160Zm0-480h640v-80H160v80ZM760-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM160-240v-480 480Z"/></svg>
                                        <div className="text-xl font-semibold">Add new card</div>
                                    </div>
                                    <form className="new-card-info flex flex-col w-fit gap-y-2" id="new-card-info" onSubmit={addCardHandler}>
                                        <div className="flex flex-row items-center gap-x-2">
                                            <label htmlFor="new-card-number" className="w-35">Card number</label>
                                            <input type="number" name="new-card-number" id="new-card-number" 
                                            className={`h-10 w-50 rounded-md border-1 ${credeitNumberBorder?"border-red":"border-slate-500"}`}/>
                                        </div>
                                        <div className="flex flex-row items-center gap-x-2">
                                            <label htmlFor="new-card-name" className="w-35">Name on card</label>
                                            <input type="text" name="new-card-name" id="new-card-name" 
                                            className={`h-10 w-50 rounded-md border-1 ${credeitNameBorder?"border-red":"border-slate-500"}`}/>
                                        </div>
                                        <div className="flex flex-row items-center gap-x-2">
                                            <label htmlFor="new-card-exp-date" className="w-35">Expiration date</label>
                                            <div>
                                                <select className="h-10 rounded-md w-20" name="month" id="month">
                                                    <option value="1">1</option>
                                                </select>
                                                <select className="h-10 rounded-md w-30" name="year" id="year">
                                                    <option value="2024">2024</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-x-2">
                                            <label htmlFor="new-card-cvc" className="w-35">CVC</label>
                                            <input type="password" name="new-card-cvc" id="new-card-cvc"
                                            className={`h-10 w-50 rounded-md border-1 ${cvcBorder?"border-red":"border-slate-500"}`} onChange={e=>{
                                                if(e.target.value.length > 3){
                                                    // console.log(e.target.value.substring(0,3))
                                                    e.target.value = e.target.value.substring(0,3);
                                                }
                                            }}/>
                                        </div>
                                        <input type="submit" value={"Add card"} className="bg-sky-500 text-white rounded-md 
                                            p-1 text-2xl hover:bg-sky-600 cursor-pointer duration-500"/>
                                        <p id="indicator" className={`text-red ${invalidInfoPropmpt?"block":"hidden"}`}>&#9888;&nbsp;Please enter valid information</p>
                                    </form>
                                </div>
                                <div className="saved-cards w-fit flex flex-col">
                                    <div className="text-xl font-semibold">
                                        Saved Cards
                                    </div>
                                    <div className="saved-cards-div flex flex-col gap-y-1 mt-1">
                                        <div className="header flex flex-row gap-x-10 bg-white shadow-md">
                                            <div className="w-35 text-center">Visa</div>
                                            <div className="w-35 text-center">Name on card</div>
                                            <div className="w-35 text-center">Number</div>
                                            <div className="w-35 text-center">Expires at</div>
                                        </div>
                                        <div className="cards-container flex flex-col gap-y-3">
                                            <CreditCard id={1} setLoader={setLoader} setShowOtpForm={setShowOtpForm} setBgDisplay={setBgDisplay} closeConfirm={closeConfirm} setCloseConfirm={setCloseConfirm}></CreditCard>
                                            <CreditCard id={2} setLoader={setLoader} setShowOtpForm={setShowOtpForm} setBgDisplay={setBgDisplay} closeConfirm={closeConfirm} setCloseConfirm={setCloseConfirm}></CreditCard>
                                            <CreditCard id={3} setLoader={setLoader} setShowOtpForm={setShowOtpForm} setBgDisplay={setBgDisplay} closeConfirm={closeConfirm} setCloseConfirm={setCloseConfirm}></CreditCard>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment;