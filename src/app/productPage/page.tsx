"use client";

import React, { useState, MouseEvent, useEffect, FormEvent} from "react";
import Link from "next/link";
import Image from "next/image";
import Review from "./Review";
import ReviewWindow from "./ReviewWindow";
import RelatedItem from "./RelatedItem";


interface product {
    name: string,
    id: number,
    price: string,
    description: string,
    category: number,
    qunatity: number,
    seller: number,
    specs: string
}

interface cart {
    items: number,
    totalAmount: number
}

const ProductPage = () =>{

    const [reviewDisplay,setReviewDisplay] = useState(false);
    const [rate,setRate] = useState(4)
    const [product,setProduct] = useState<product|null>(null)
    const [url,setUrl] = useState("https://distributed-project-backend.onrender.com/api/home/products/");
    const [addToCartWait,setAddToCartWait] = useState(false);
    const [userToken,setUserToken] = useState<string|null>(null)
    const [relatedProducts,setRelatedProducts] = useState<product[]|null>(null);
    const [cart,setCart] = useState<cart|null>(null);

    const showReviewWindow = (show:boolean)=>{
        setReviewDisplay(show);
    }

    const addToCart = async (e:MouseEvent)=>{
        setAddToCartWait(true);
        fetch("https://distributed-project-backend.onrender.com/api/stats/cart-items/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            },
            body:JSON.stringify({
                product: 1,
                quantity: 1
            })
        }).then(async response=>{
            setAddToCartWait(false);
            const res = await response.json();
            console.log(res);
        })
    }

    const addToWishList = (e:MouseEvent)=>{
        fetch("https://distributed-project-backend.onrender.com/api/stats/wishlist-product/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body:JSON.stringify({
                "product": 1,
            })
        }).then(async response=>{
            setAddToCartWait(false);
            console.log(response);
        })
    }

    useEffect(()=>{
        const userData = sessionStorage.getItem("loggedInUser");
        if(userData){
            const token = JSON.parse(userData).token
            setUserToken(token)
            console.log(token)
        }
        async function getDate(id: number){
            const response = await fetch(`${url+id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                }
            });
            const res = await response.json();
            console.log(res);
            setProduct(()=>{
                return {...res}
            })
            return res;
        }
        getDate(1);
        
    },[])

    useEffect(()=>{
        if(!userToken) return;
        fetch("https://distributed-project-backend.onrender.com/api/stats/cart-items/",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${userToken}`,
            },
        }).then(async (res)=>{
            const cart = await res.json();
            setCart(()=>{
                const totalAmount = cart.cart.reduce((acc:number,item:any)=>{
                    return acc + (item.quantity * +item.product_details.price)
                },0)
                console.log(totalAmount)
                return {
                    "items": cart.cart.length,
                    "totalAmount": totalAmount
                }
            })
            console.log(cart.cart)
        })
    },[userToken])

    useEffect(()=>{
        if(!product) return;
        fetch(`https://distributed-project-backend.onrender.com/api/home/products/?categories=${product?product.category:""}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }).then(async (res)=>{
            const products:product[] = await res.json();
            console.log(products);
            setRelatedProducts(() => {
                let relatedProducts = products?products.filter(prod=>prod.id !== product?.id):[];
                relatedProducts = relatedProducts.splice(0,3);
                console.log(relatedProducts);
                return relatedProducts;
            });

        })
    },[product])

    return(
        <>
            <div style={{backgroundColor:"#f9f9f9"}} className="product-page flex flex-col flex-wrap px-10 gap-y-5 gap-x-10 w-full h-fit">
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
                                <div className="name" id="name" style={{fontSize:"2rem",fontWeight:"600"}}>{product?product.name:""}</div>
                                <div className="price" id="price">
                                    <span>Price:&nbsp;</span>
                                    <span>{product?product.price:""} EGP</span>
                                </div>
                                <div className="rating" id="rating">
                                    <span>Rating:&nbsp;</span>
                                    <span>4.3</span>
                                </div>
                                <button className={`relative hover:bg-white bg-sky-500 hover:text-inherit border-2 duration-500 border-sky-500 w-50 h-13 text-white text-3xl
                                ${addToCartWait?"bg-sky-200 opacity-50":"bg-sky-500"}
                                `} onClick={addToCart}><div className={`w-full ${addToCartWait?"small-loader":""}`}></div> Add To Cart</button>
                                <button className="flex flex-row justify-center items-center w-fit gap-x-2 w-fit my-1 h-10 text-xl hover:text-2xl duration-500" onClick={addToWishList}>
                                    <span>Add To Wishlist</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(100 116 139)" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-501Zm0 381L313-234q-72-65-123.5-116t-85-96q-33.5-45-49-87T40-621q0-94 63-156.5T260-840q52 0 99 22t81 62q34-40 81-62t99-22q81 0 136 45.5T831-680h-85q-18-40-53-60t-73-20q-51 0-88 27.5T463-660h-46q-31-45-70.5-72.5T260-760q-57 0-98.5 39.5T120-621q0 33 14 67t50 78.5q36 44.5 98 104T440-228q26-23 61-53t56-50l9 9 19.5 19.5L605-283l9 9q-22 20-56 49.5T498-172l-58 52Zm280-160v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z"/></svg>
                                </button>
                                <div className="color flex flex-row items-center w-100" id="color">
                                    <span>Color:&nbsp;</span>
                                    <div className="flex flex-row justify-center py-1 px-1 rounded gap-x-1 bg-slate-300">
                                        <div className="bg-white w-8 h-8 cursor-pointer rounded border-2 border-sky-400">&nbsp;</div>
                                        <div className="bg-black w-8 h-8 cursor-pointer rounded">&nbsp;</div>
                                    </div>
                                </div>
                                <span className="text-green-400">{product?product.qunatity:""} In-Stock</span>
                            </div>
                        </div>
                    </div>
                    <div className="cart-side flex flex-col flex-wrap justify-between px-5 py-5 gap-x-10 gap-y-6 w-fit h-full" style={{}}>
                        <div className="related-items flex flex-col">
                            <span className="text-2xl" style={{fontSize:"1.5rem",fontWeight:"600"}}>Related Items:</span>
                            <div className="r-items-container flex flex-row items-center h-full
                            bg-slate-300 w-full text-xl px-10 py-5 box-border gap-x-6 items-center rounded-lg" style={{width:"400px" ,height:"140px"}}>
                                {
                                    relatedProducts?.map(product=>
                                        (
                                            <RelatedItem name={product.name} image={"abc"}/>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="cart-checkout-div text-2xl bg-slate-300 rounded-lg box-border shadow-lg shadow-slate-300">
                            <h1 className="bg-slate-500 rounded-t-lg px-2 py-1 text-white" style={{fontSize:"1.8rem",fontWeight:"1000"}}>Cart</h1>
                            <div className="flex flex-col justify-center gap-y-2 py-3 text-3lg px-2 bg-white rounded-b-lg">
                                <div>
                                    <span>Total Items:&nbsp;</span>
                                    <span>{cart?.items}</span>
                                </div>
                                <div>
                                    <span>Total Amount:&nbsp;</span>
                                    <span>{cart?.totalAmount}</span>
                                </div>
                                <Link href={'/Checkout'}>
                                <button className="bg-sky-500 text-center w-full text-white font-semibold text-2xl border-2 border-sky-500 
                                hover:bg-white hover:text-sky-500 duration-500 rounded-lg py-1 box-border">Prooced To Checkout</button> 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div className="" style={{fontSize:"1.8rem",fontWeight:"bold"}}>Product Description</div>
                    <div className="flex flex-row justify-center py-5"> 
                        <div id="left" className="basis-3/4 text-2xl">
                        {product?product.description:""}
                        </div>
                        <div id="right" className="basis-1/4 border-l-2 px-2 flex flex-row gap-x-20">
                        {product?product.specs:""}
                            {/* <div className="flex flex-col text-xl font-semibold justify-between">
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
                            </div> */}
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