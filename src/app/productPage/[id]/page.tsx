"use client";

import React, { useState, MouseEvent, useEffect, useContext} from "react";
import Link from "next/link";
import Image from "next/image";
import Review from "./Review";
import ReviewWindow from "./ReviewWindow";
import RelatedItem from "./RelatedItem";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import { CartButtonContext } from "@/contexts/CartButtonContext";
import { AuthContext } from "@/contexts/AuthContext";

const ProductPage = () =>{
    const searchParams = useParams<{id: string}>();

    const {addToCart, cartData} = useContext(CartButtonContext);
    const {token} = useContext(AuthContext);

    const productId = parseInt(searchParams.id)
    const isInCart = cartData.cart.some(item => item.product_details.id === productId);

    const [product, setProduct] = useState<Product>();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [reviewDisplay,setReviewDisplay] = useState(false);
    const showReviewWindow = (show:boolean)=>{
        setReviewDisplay(show);
    }

    useEffect(() => {
        if (!token) return;
        fetch(`https://distributed-project-backend.onrender.com/api/home/products/${productId}`)
        .then(res => res.json())
        .then((data: Product) => {
            setProduct(data);
            fetch(`https://distributed-project-backend.onrender.com/api/home/products/`)
                .then(res2 => res2.json())
                .then((data2: Product[]) => {
                    console.log(data2);
                    setRelatedProducts(data2.slice(0, 3));             
            fetch(`https://distributed-project-backend.onrender.com/api/stats/get-wishlist`, {
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                    }
                })
                .then(res => res.json())
                .then((wishlist: Product[]) => {
                    console.log(wishlist);
                    setIsInWishlist(wishlist.filter(w => w.id === data.id).length > 0);
                })
            })
        })
    }, [productId, token])

    const addToWishlist = () => {
        fetch(`https://distributed-project-backend.onrender.com/api/stats/wishlist-product/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify({product: product?.id})
        })
        .then(() => {
            setIsInWishlist(true);
        })
    }

    return(
        <>
            <div style={{backgroundColor:"#f9f9f9"}} className="product-page flex flex-col flex-wrap px-10 my-30 gap-y-5 gap-x-10 w-full h-fit">
                <div className="flex flex-row items-center justify-between w-full h-fit">
                    <div className="product-side flex flex-row justify-center items-center px-10 box-border gap-x-10 w-fit h-full">
                        <div className="" id="image">
                            <Image
                                src={"/images/product/product-01.png"}
                                alt="profile cover"
                                className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                                width={970}
                                height={260}
                                style={{
                                    width: "450px",
                                    height: "auto",
                                }}
                            />
                        </div>
                        <div className="information " id="information">
                            <div className="flex flex-col justify-center h-full gap-y-4 text-2xl" id="">
                                <div className="name" id="name" style={{fontSize:"2rem",fontWeight:"600"}}>{product?.name}</div>
                                <div className="price" id="price">
                                    <span>Price:&nbsp;</span>
                                    <span>{product?.price} EGP</span>
                                </div>
                                <div className="rating" id="rating">
                                    <span>Rating:&nbsp;</span>
                                    <span>4.3</span>
                                </div>
                                {isInCart ? 
                                <span className="text-gray-900 dark:text-white text-2xl font-bold">Added to cart!</span>
                                :
                                <button 
                                    className="bg-sky-500 hover:bg-white hover:text-inherit border-2 duration-500 border-sky-500 w-50 h-13 text-white text-3xl"
                                    onClick={() => addToCart(productId)}
                                >
                                    Add To Cart
                                </button>
                                }
                                {isInWishlist ?
                                <span className="text-gray-900 bg-green-300 text-center rounded-md dark:text-white text-xl font-semibold">Item is in wishlist</span>
                                :
                                <button 
                                    className="flex flex-row justify-center items-center gap-x-2 w-fit my-1 h-10 text-xl hover:text-2xl duration-500"
                                    onClick={addToWishlist}
                                >
                                    <span>Add To Wishlist</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(100 116 139)" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>
                                </button>}
                                <span className="text-green-400">{product?.quantity} In-Stock</span>
                            </div>
                        </div>
                    </div>
                    <div className="cart-side flex flex-col flex-wrap justify-between px-5 py-5 gap-x-10 gap-y-6 w-fit h-full" style={{}}>
                        <div className="related-items flex flex-col">
                            <span className="text-2xl" style={{fontSize:"1.5rem",fontWeight:"600"}}>Related Items:</span>
                            <div className="r-items-container flex flex-row h-full
                             bg-slate-300 w-full text-xl px-1 py-5 box-border gap-x-4 items-center rounded-lg justify-center" style={{width:"400px" ,height:"140px"}}>
                                {relatedProducts.map(product => (
                                    <Link href={`/productPage/${product.id}`} key={product.id}>
                                        <RelatedItem name={product.name} image="abc"/>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div className="" style={{fontSize:"1.8rem",fontWeight:"bold"}}>Product Description</div>
                    <div className="flex flex-row justify-center py-5"> 
                        <div id="left" className="basis-3/4 text-2xl">
                            {product?.description}
                        </div>
                        <div id="right" className="basis-1/4 border-l-2 px-2 flex flex-row gap-x-20">
                            <div className="flex flex-col text-xl font-semibold justify-between">
                                <span>ABC:&nbsp;</span>
                                <span>ABC:&nbsp;</span>
                                <span>ABC:&nbsp;</span>
                                <span>ABC:&nbsp;</span>
                                <span>WWE:&nbsp;</span>
                                <span>AK-47:&nbsp;</span>
                            </div>
                            <div className="flex flex-col text-xl justify-between">
                                <span>Yes</span>
                                <span>Yes</span>
                                <span>N/A</span>
                                <span>Yes</span>
                                <span>Yes</span>
                                <span>No</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reviews flex flex-col gap-y-5" id="reviews">
                    <div style={{fontSize:"1.8rem",fontWeight:"bold"}}>Reviews</div>
                    <div className="reviews-div flex flex-row gap-x-90">
                        
                        <div className="customer-reviews flex flex-col gap-y-5">
                            <div className="text-xl font-bold">Customer Reviews</div>
                            <div className="customer-reviews-div flex flex-col gap-y-5">
                                <div className="flex flex-row items-center">
                                    <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                    <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                    <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                    <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                    <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                    <div className="text-md font-semibold ml-2">4 out of 5</div>
                                </div>
                                <div className="reviews-stats flex flex-col gap-y-4">
                                        <div className="1star flex flex-row items-center">
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                        <div className="flex flex-row ml-2 h-4 w-60 bg-slate-300 rounded-md">
                                            <div className="rounded-md" style={{backgroundColor:"#ffa534",marginLeft:"-4px",width:"50%"}}>&nbsp;</div>
                                        </div>
                                        <span className="ml-2 text-md font-black">50%</span>
                                    </div>
                                    <div className="1star flex flex-row items-center">
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                        <div className="flex flex-row ml-2 h-4 w-60 bg-slate-300 rounded-md">
                                            <div className="rounded-md" style={{backgroundColor:"#ffa534",marginLeft:"-4px",width:"50%"}}>&nbsp;</div>
                                        </div>
                                        <span className="ml-2 text-md font-black">50%</span>
                                    </div>
                                    <div className="1star flex flex-row items-center">
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                        <div className="flex flex-row ml-2 h-4 w-60 bg-slate-300 rounded-md">
                                            <div className="rounded-md" style={{backgroundColor:"#ffa534",marginLeft:"-4px",width:"50%"}}>&nbsp;</div>
                                        </div>
                                        <span className="ml-2 text-md font-black">50%</span>
                                    </div>
                                    <div className="1star flex flex-row items-center">
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                        <div className="flex flex-row ml-2 h-4 w-60 bg-slate-300 rounded-md">
                                            <div className="rounded-md" style={{backgroundColor:"#ffa534",marginLeft:"-4px",width:"50%"}}>&nbsp;</div>
                                        </div>
                                        <span className="ml-2 text-md font-black">50%</span>
                                    </div>
                                    <div className="1star flex flex-row items-center">
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9733;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                            <div className="text-3xl" style={{color:"#ffa534"}}>&#9734;</div>
                                        <div className="flex flex-row ml-2 h-4 w-60 bg-slate-300 rounded-md">
                                            <div className="rounded-md" style={{backgroundColor:"#ffa534",marginLeft:"-4px",width:"50%"}}>&nbsp;</div>
                                        </div>
                                        <span className="ml-2 text-md font-black">50%</span>
                                    </div>
                                </div>
                            </div>
                            <button className="border-2 border-black text-xl font-semibold text-black hover:bg-sky-500 
                            hover:text-white hover:border-sky-500 duration-500" onClick={e=>showReviewWindow(true)}>Add Review</button>
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <Review></Review>
                            <Review></Review>
                            <Review></Review>
                            <Review></Review>
                            <Review></Review>
                            <button className="hover:text-slate-600">Show more</button>
                        </div>
                    </div>
                </div>
            </div>
            {reviewDisplay?(
                <ReviewWindow productId={1}/>
            ):""}
            <div className={`bg ${reviewDisplay?"block":"hidden"} fixed h-full w-full top-0 left-0 bg-black opacity-50`} id="bg" onClick={e=>showReviewWindow(false)}></div>
            
        </>
    )
}

export default ProductPage;