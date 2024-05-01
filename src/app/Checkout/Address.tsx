import React, { useEffect, useState } from "react";
import Link from "next/link";

const Address = ()=>{

    const [position,setPosition] = useState('-translate-x-full')

    useEffect(()=>{
        setPosition("")
    },[])

    return (
        <>
            <div id="address-step" className={`address p-3 flex  flex-col gap-y-5 w-3/5 ${position} duration-500`}>
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
        </>
    )
}

export default Address;