import MainLayout from "@/components/Layouts/MainLayout"
import Image from "next/image";

const Profile = () => {
    return (
        <>
            <div className="flex justify-center p-4">
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
            </div>
        </>
    );
}
 
export default Profile;