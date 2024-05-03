import React from "react";
import Link from "next/link";

interface OrderProps {
    step: number
}

const Order = ({ step }:OrderProps)=>{
    return (
        <>
            <div id="order" className={`order absolute ${step === 3? `right-1/2 translate-x-1/2`:"right-30"} top-50 shadow-lg border-2 border-slate-200 
                rounded-lg p-5 duration-500`}>
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
        </>
    )
}

export default Order;