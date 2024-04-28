import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CreditCardProps {
    id: string;
}

const CreditCard = ({ id }: CreditCardProps)=>{


    const showConfirmHandler = (e:MouseEvent)=>{
        const confs = document.getElementsByClassName("credit-card-confirmation") as HTMLCollectionOf<HTMLElement>;
        for(let i = 0;i<confs.length;i++){
            confs[i].style.display = "none";
        }
        const confirmation = document.getElementById(`credit-card-confirmation-${id}`);
        if(confirmation) {
            confirmation.style.display = "block";
            confirmation.style.backgroundColor = "rgb(241,245,249)";
        }
    }
    
    const confirm = (e:MouseEvent)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const number = Array.from(form)[0];
        const cvc = Array.from(form)[1] 
        let flag = false;
        if(number[1].length !== 16){
            document.getElementById(`number-${id}`).style.border = "2px solid red";
            flag =true;
        }else{
            document.getElementById(`number-${id}`).style.border = "1px solid #6b7280";
        }
        if(cvc[1].length !== 3){
            document.getElementById(`cvc-${id}`).style.border = "2px solid red";
            flag =true;
        }else{
            document.getElementById(`cvc-${id}`).style.border = "1px solid #6b7280";
        }
        if(flag) return;

        const container:HTMLElement = document.getElementById("checkout-main-container");
        const loader = document.createElement("div");
        const bg = document.getElementById("checkout-background");
        const otpWindow = document.getElementById("card-otp");
        bg?.classList.toggle("hidden")
        // bg.style.opacity = "0.5";
        // bg.style.backgroundColor ="#fff"
        // bg.style.position = "absolute";
        // bg.style.top = "0px";
        // bg.style.left = "0px";
        // bg.style.width = "100%"
        // bg.style.height = "100%"
        loader.classList.toggle("loader");
        loader.style.borderWidth = "7px"
        container.appendChild(loader);
        setTimeout(()=>{
            container.removeChild(loader)
            otpWindow?.classList.toggle("hidden");
            otpWindow?.classList.add("pointer-events-auto");
        },2000)

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
                <div className="credit-card-confirmation p-5 hidden" id={`credit-card-confirmation-${id}`}>
                    <form className="flex flex-row gap-x-2 items-center text-xl" onSubmit={confirm}>
                        <label htmlFor={`number-${id}`}>Confirm number:&nbsp;</label>
                        <input type="number" name={`number-${id}`} id={`number-${id}`} className="h-8 font-normal 
                        rounded-md"/>
                        <label htmlFor={`cvc${id}`}>CVC</label>
                        <input type="password" name={`cvc-${id}`} id={`cvc-${id}`} className="w-20 h-8 rounded-md font-normal"
                        onChange={e=>{
                            if(e.target.value.length > 3){
                                e.preventDefault();
                                e.target.value = e.target.value.substring(0,3);
                            }
                        }}/>
                        <input type="submit" value={"Confirm"} className="bg-sky-500 h-8 w-30 rounded-md 
                        text-white cursor-pointer hover:shadow-lg"/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreditCard;