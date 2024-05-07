"use client"
import Image from "next/image";
import JoinAsSeller from "./JoinAsSeller";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ProfileData } from "@/types/profileData";

const Profile = () => {
    const {token} = useContext(AuthContext)
    const [profile,setProfile] = useState<ProfileData>();
    const [openSellerModal,setOpenSellerModal] = useState(false);
    const [openAddProduct,setOpenAddModal] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("https://distributed-project-backend.onrender.com/api/stats/profile/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json();
            setProfile(data);
        }
        token && fetchUser();
    }, [token])

    return (
        <>
            <div className="flex flex-col items-center justify-center p-4">
                <div className="w-full md:w-1/2 lg:w-1/3 border-slate-200 border-2 flex flex-col rounded-md p-2">
                    <p className="text-xl font-semibold mb-8">My Profile</p>

                    <p className="font-medium">Profile Photo</p>
                    <div className="relative">
                    <Image
                        width={100}
                        height={100}
                        // TODO: Show image once we get rid of the stupid URLs in the db
                        src={"/images/user/user-01.png"}
                        
                        alt="User"
                    />
                    </div>


                    <p className="font-medium mt-4">Username</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.username}</p>
                    </div>

                    <p className="font-medium mt-4">Email</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.email}</p>
                    </div>

                    <p className="font-medium mt-4">First Name</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.first_name}</p>
                    </div>

                    <p className="font-medium mt-4">Last Name</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.last_name}</p>
                    </div>

                    <p className="font-medium mt-4">Address</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.address}</p>
                    </div>
                </div>
                {!profile?.user.is_seller && 
                <button className="text-xl bg-sky-500 text-white p-2 mt-2 rounded-md" onClick={e=>setOpenSellerModal(true)}>Join as seller</button>
                }
            </div>
            {
                openSellerModal?
                (
                    <JoinAsSeller setSeller={setOpenSellerModal} token={token}/>
                ):("")
            }
        <div className={`fixed top-0 left-0 w-full h-full bg-black z-10 ${openSellerModal || openAddProduct?"block":"hidden"} opacity-50`} onClick={e=>{setOpenSellerModal(false); setOpenAddModal(false)}}></div>
        </>
    );
}
 
export default Profile;