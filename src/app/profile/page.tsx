"use client"
import MainLayout from "@/components/Layouts/MainLayout"
import Image from "next/image";
import JoinAsSeller from "./JoinAsSeller";
import React, { useEffect, useState } from "react";
import AuthContextProvider from "@/contexts/AuthContext";
import AddPoroductToSell from "./AddProductToSell";

const Profile = () => {
    const [seller,setSeller] = useState(false);
    const [addProduct,setAddProduct] = useState(false);
    const [token,setToken] = useState<string | null>(null)
    const [userId,setUserId] = useState<number | null>(null)

    useEffect(()=>{
        const user = sessionStorage.getItem("loggedInUser");
        if(user){
            setToken(JSON.parse(user).token)
            setUserId(JSON.parse(user).user.id);
        }
    },[])

    return (
        <>
        <MainLayout>
            <div className="flex flex-col items-center justify-center p-4">
                <div className="w-full md:w-1/2 lg:w-1/3 border-slate-200 border-2 flex flex-col rounded-md p-2">
                    <p className="text-xl font-semibold mb-8">My Profile</p>

                    <p className="font-medium">Profile Photo</p>
                    <div className="relative">
                    <Image
                        width={100}
                        height={100}
                        src={"/images/user/user-01.png"}
                        
                        alt="User"
                    />
                    </div>


                    <p className="font-medium mt-4">Name</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>Username</p>
                    </div>

                    <p className="font-medium mt-4">Email</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>Email</p>
                    </div>

                    <p className="font-medium mt-4">Address</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>Address</p>
                    </div>

                    <p className="font-medium mt-4">Phone number</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>Phone number</p>
                    </div>
                </div>
                <button className="text-xl bg-sky-500 text-white p-2 mt-2 rounded-md" onClick={e=>setSeller(true)}>Join as seller</button>
                <div className="bg-white">
                <button className="" onClick={e=>{setAddProduct(true)}}>Add a product to sell</button>

                </div>
            </div>
            {
                seller?
                (
                    <JoinAsSeller setSeller={setSeller} token={token} userId={userId}/>
                ):("")
            }
            {
                addProduct?
                (
                    <AddPoroductToSell setAddProduct={setAddProduct} token={token} userId={userId}/>
                ):
                ("")
                
            }
        </MainLayout>
        <div className={`fixed top-0 left-0 w-full h-full bg-black z-10 ${seller || addProduct?"block":"hidden"} opacity-50`} onClick={e=>{setSeller(false); setAddProduct(false)}}></div>
        </>
    );
}
 
export default Profile;