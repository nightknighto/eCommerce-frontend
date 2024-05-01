import React from "react";
import Link from "next/link";
import Image from "next/image";

const Review = (props:Object)=>{
    return(
        <>
            <div className="review flex flex-col">
                <div className="profile flex flex-row items-center gap-x-3">
                    <Image
                        src={"/images/user/user-01.png"}
                        alt="profile cover"
                        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                        width={970}
                        height={260}
                        style={{
                            width: "50px",
                            height: "auto",
                        }}
                    />
                    <div className="profile text-xl">Reviewer 1</div>
                </div>
                <div className="rating flex flex-row gap-x-2 items-center" id="rating">
                    <div className="flex flex-row">
                        <div className="text-2xl" style={{color:"#ffa534"}}>&#9733;</div>
                        <div className="text-2xl" style={{color:"#ffa534"}}>&#9733;</div>
                        <div className="text-2xl" style={{color:"#ffa534"}}>&#9733;</div>
                        <div className="text-2xl" style={{color:"#ffa534"}}>&#9734;</div>
                        <div className="text-2xl" style={{color:"#ffa534"}}>&#9734;</div>
                    </div>
                    <div className="review-header font-semibold text-black">أف أح</div>
                </div>
                <div className="review-text text-md text-black">
                    برودكت جامد فشخ
                </div>
            </div>
        </>
    )
}

export default Review;