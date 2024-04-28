"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CreditCard from "./CreditCard";
import ConfirmCard from "./confirmCard";

const Checkout = () =>{

    const steps = {1:"address",2:"payment",3:"done"};
    let [step,setStep] = useState(1);
    const [creditCardDisplay, setCreditCardDisplay] = useState("hidden");

    const next = (e:MouseEvent)=>{
        setStep(s=>++s);
    }
    const prev = (e:MouseEvent)=>{
        setStep(s=>--s);
    }

    useEffect(()=>{
        const prevBtn = document.getElementById("previous");
        const nextBtn = document.getElementById("next");
        const address = document.getElementById("address-step")
        const payment = document.getElementById("payment-step")
        const done = document.getElementById("done-step")
        const border = document.getElementById("progress");
        const order = document.getElementById("order");
        if(step === 1){
            border.style.width = "33.33%";
            nextBtn.style.pointerEvents = "auto";
            nextBtn?.classList.contains("hidden")?nextBtn?.classList.toggle("hidden"):""
            prevBtn.style.pointerEvents = "none";
            address.style.display = "flex";
            payment.style.display = "none";
            payment.style.left = "50vw";
            setTimeout(()=>{
                address.style.left = "0px";
            },2)
        }else if(step === 2){
            border.style.width = "66.66%";
            prevBtn.style.pointerEvents = "auto";
            nextBtn.style.pointerEvents = "auto";
            done.style.right = "-50vw";
            address.style.left = "-50vw";
            payment.style.display = "flex";
            done.style.display = "none";
            address.style.display = "none";
            setTimeout(()=>{
                payment.style.left = "0px";
            },2)
        }else if(step === 3){
            border.style.width = "100%";
            nextBtn.style.pointerEvents = "none";
            nextBtn.style.display = "none";
            prevBtn.style.display = "none";
            done.style.display = "flex";
            payment.style.display = "none";
            payment.style.left = "-50vw";
            setTimeout(()=>{
                done.style.right = "0px";
            },2)
            // order.style.top = "50%"
            order.style.right = "50%"
            order.style.transform = "translateX(50%)";
            const container:HTMLElement = document.getElementById("checkout-main-container");
            const bg:HTMLElement = document.getElementById("checkout-background");
            container.style.pointerEvents = "auto";
            console.log(container)
            console.log(bg)
            if(!bg.classList.contains("hidden"))
                bg.classList.toggle("hidden");
            
        }
    },[step])

    const methodHandler = (open: boolean)=>{
        const nextBtn = document.getElementById("next");
        if(!nextBtn?.classList.contains("hidden"))
            nextBtn?.classList.toggle("hidden")
        if(open){
            setCreditCardDisplay("flex");
        }else{
            setCreditCardDisplay("hidden");
        }
    }

    const addCardHandler = (e:MouseEvent)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        console.log(Array.from(form));
        let flag:boolean = false;
        for(let entry of Array.from(form)){
            if(entry[1] === ""){
                flag = true;
                document.getElementById(`${entry[0]}`).style.border = "2px solid red";
            }else document.getElementById(`${entry[0]}`).style.border = "1px solid #6b7280";
        }
        if(/[a-zA-z]/.test(Array.from(form)[0][1]) || Array.from(form)[0][1].length !== 16){
            document.getElementById(`${Array.from(form)[0][0]}`).style.border = "2px solid red";
            flag = true;
        }
        if(Array.from(form)[Array.from(form).length-1][1].length !== 3){
            document.getElementById(`${Array.from(form)[Array.from(form).length-1][0]}`).style.border = "2px solid red";
            flag = true;
        }
        let format = /[0123456789`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if(format.test(Array.from(form)[1][1])){
            document.getElementById(`${Array.from(form)[1][0]}`).style.border = "2px solid red";
            flag = true;
        }
        if(flag){
            const indicator:HTMLElement =  document.getElementById("indicator");
            if(indicator.classList.contains("hidden")){
                indicator.classList.toggle("hidden");
            }
            return;
        }

        const container:HTMLElement = document.getElementById("checkout-main-container");
        const bg:HTMLElement = document.getElementById("checkout-background");
        container.style.pointerEvents = "none";
        // container.style.opacity = "0.5";
        const loader = document.createElement("div");
        // const bg = document.createElement("div");
        const otpWindow = document.getElementById("card-otp");
        bg.classList.toggle("hidden");
        loader.classList.toggle("loader");
        container.appendChild(loader);
        setTimeout(()=>{
            container.removeChild(loader)
            // container.removeChild(bg)
            otpWindow?.classList.toggle("hidden");
            otpWindow?.classList.add("pointer-events-auto");
            // container.style.pointerEvents = "auto";
        },2000)
        otpWindow.onsubmit = (e)=>{
            console.log("true");
            // container.removeChild(bg);
            container.style.pointerEvents = "auto";
        }
    }

    return(
        <>
        <div className="outer-checkout">
            <div className="checkout-page m-auto bg-white rounded-md flex flex-col justify-between">
                <h1 className="h-15 flex flex-row justify-center items-center bg-slate-300 
                text-2xl font-semibold text-black">Checkout</h1>
                <div className="checkout flex flex-row" id="checkout-main-container">
                    <div id="checkout-background" className="absolute top-0 left-0 w-full h-full bg-white z-10 hidden opacity-50"></div>
                    <div id="address-step" className="address p-3 flex flex-col gap-y-5 w-3/5">
                        <div className="text-xl font-semibold">Enter your shipping address</div>
                        <form className="address-main flex flex-col gap-y-2">
                            <div className="flex flex-col text-xl gap-y-1">
                                <label className="font-semibold" htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" className="name rounded-md h-9 text-black"/>    
                            </div>
                            <div className="flex flex-col text-xl gap-y-1">
                                <label className="font-semibold" htmlFor="number">Phone number</label>
                                <div className="flex flex-row gap-x-3">
                                    <select className="rounded-md h-9 text-black bg-slate-100 w-30" name="code" id="code">
                                        <option value="eg">+20</option>
                                    </select>
                                    <input type="number" id="number" name="number" className="number rounded-md w-full h-9 text-black"/>
                                </div>
                            </div>
                            <div className="flex flex-col text-xl gap-y-1">
                                <label className="font-semibold" htmlFor="country">Country/Region</label>
                                <select name="country" id="country" className="rounded-md h-9 text-black">
                                    <option value="aaa">ABC</option>
                                </select>
                            </div>
                            <div className="flex flex-col text-xl gap-y-1">
                                <label className="font-semibold" htmlFor="street">Street</label>
                                <input type="text" id="street" name="street" className="rounded-md h-9 text-black"/>
                            </div>
                            <div className="flex flex-col text-xl gap-y-1">
                                <label className="font-semibold" htmlFor="building">Building name/no</label>
                                <input type="text" id="building" name="building" className="rounded-md h-9 text-black"/>
                            </div>
                            <div className="flex flex-col text-xl gap-y-1">
                                <label className="font-semibold" htmlFor="city">City</label>
                                <input type="text" id="city" name="city" className="rounded-md h-9 text-black"/>
                            </div>
                            <div className="flex flex-col text-xl gap-y-1">
                                <label className="font-semibold" htmlFor="governorate">Governorate/State</label>
                                <input type="text" id="governorate" name="governorate" className="rounded-md h-9 text-black"/>
                            </div>
                            <div className="flex flex-row text-xl items-center gap-x-2 mt-5">
                                <input type="checkbox" name="save-address" id="save-address"/>
                                <label className="font-semibold" htmlFor="save-address">Save address</label>
                            </div>
                        </form>
                    </div>
                    <div id="payment-step" className="payment flex flex-col gap-y-5 w-4/6 p-3">
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
                                <div className={`credit-card-div flex flex-col w-full gap-y-3 mt-3 text-xl ${creditCardDisplay}`} id="credit-card-div">
                                    <div className="card flex flex-row justify-between">
                                        <div className="add-new-card">
                                            <div className="flex flex-row items-center gap-x-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v240H160v240h400v80H160Zm0-480h640v-80H160v80ZM760-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM160-240v-480 480Z"/></svg>
                                                <div className="text-xl font-semibold">Add new card</div>
                                            </div>
                                            <form className="new-card-info flex flex-col w-fit gap-y-2" id="new-card-info" onSubmit={addCardHandler}>
                                                <div className="flex flex-row items-center gap-x-2">
                                                    <label htmlFor="new-card-number" className="w-35">Card number</label>
                                                    <input type="text" name="new-card-number" id="new-card-number" 
                                                    className="h-10 w-50 rounded-md"/>
                                                </div>
                                                <div className="flex flex-row items-center gap-x-2">
                                                    <label htmlFor="new-card-name" className="w-35">Name on card</label>
                                                    <input type="text" name="new-card-name" id="new-card-name" 
                                                    className="h-10 w-50 rounded-md"/>
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
                                                    className="h-10 w-50 rounded-md" onChange={e=>{
                                                        if(e.target.value.length > 3){
                                                            // console.log(e.target.value.substring(0,3))
                                                            e.target.value = e.target.value.substring(0,3);
                                                        }
                                                    }}/>
                                                </div>
                                                <input type="submit" value={"Add card"} className="bg-sky-500 text-white rounded-md 
                                                p-1 text-2xl hover:bg-sky-600 cursor-pointer duration-500"/>
                                                <p id="indicator" className="text-red hidden">&#9888;&nbsp;Please enter valid information</p>
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
                                                    <CreditCard id={1}></CreditCard>
                                                    <CreditCard id={2}></CreditCard>
                                                    <CreditCard id={3}></CreditCard>
                                                    <CreditCard id={4}></CreditCard>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ConfirmCard setStep={setStep}></ConfirmCard>
                    <div id="done-step" className="done flex flex-col w-full">
                        <h1 className="text-2xl absolute top-30 text-center 
                        w-full text-green-500 font-semibold">Order is successfully made&nbsp;<span className="text-3xl">&#10003;</span></h1>
                        <div className="absolute bottom-45 left-1/2 -translate-x-2/4 flex flex-row gap-x-10">
                            <button className="text-xl p-1 border-b-2 border-b-white hover:border-b-2 
                            hover:border-b-sky-500 hover:text-black">Track Order</button>
                            <button className="text-xl p-1 border-b-2 border-b-white hover:border-b-2 
                            hover:border-b-sky-500 hover:text-black">Continue shopping</button>
                        </div>
                    </div>
                    <div id="order" className="order absolute right-30 top-50 shadow-lg border-2 border-slate-200 
                    rounded-lg p-5 duration-500">
                        <div className="text-center text-2xl font-bold text-green-500">Order</div>
                        <div className="text-xl flex flex-col gap-y-2 mt-2">
                            <div className="flex flex-row">
                                <span className="font-semibold w-24">Sub total:&nbsp;</span>
                                <span>3000</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="font-semibold w-24">Delivery:&nbsp;</span>
                                <span>30</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="font-semibold w-24">Discount:&nbsp;</span>
                                <span>300</span>
                            </div>
                            <div className="border-t-2 border-t-black pt-2">
                                <span className="font-semibold text-red">Total:&nbsp;</span>
                                <span>2730</span>
                            </div>
                            <div className="">
                                <span className="">Estimated to be delivered on:&nbsp;</span>
                                <span className="text-green-500 font-semibold">Monday</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center h-15 bg-slate-300">
                    <button className="mx-3 h-fit px-2 py-1 w-20 box-border rounded-lg bg-sky-500 text-white 
                    text-xl hover:-translate-x-1 duration-200" id="previous" onClick={prev}>Before</button>
                    <button className="mx-3 h-fit px-2 py-1 w-20 box-border rounded-lg bg-sky-500 
                    text-white text-xl hover:translate-x-1 duration-200" id="next" onClick={next}>Next</button>
                </div>
                <div className={`bottom h-1 bg-sky-500 w-${step === 1 ? '1/3' : step === 2 ? '2/3' : 'full'}`} id="progress"></div>
                
                <div className="two"></div>
                <div className="three"></div>
                {
                    step === 1 ? (
                        <div className="one"></div>
                    ) : step === 2 ? (
                        <div className="two"></div>
                    ) : (
                        <div className="three"></div>
                    )
                }
            </div>
        </div>
        </>
    )
}

export default Checkout;