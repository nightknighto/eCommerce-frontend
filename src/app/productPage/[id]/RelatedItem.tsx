import React from "react";
import Link from "next/link";
import Image from "next/image";

interface RelatedItemProps {
    name: string,
    image: string
}

const RelatedItem = ({name}:RelatedItemProps)=>{
    return(
        <div id="item" className="item flex flex-col w-28 justify-center py-6 hover:translate-y-0.5 hover:translate-x-0.5 duration-500">
        <Image
            src={"/images/product/product-01.png"}
            alt="profile cover"
            className="h-full rounded-tl-sm rounded-tr-sm object-cover object-center duration-500"
            width={970}
            height={260}
            style={{
                width: "120px",
                height: "auto",
            }}
        />
        <span className="text-center text-base">{name}</span>
    </div>
    )
}

export default RelatedItem;