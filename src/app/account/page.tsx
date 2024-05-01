import ProductCard from "@/components/Cards/ProductCard";
import MainLayout from "@/components/Layouts/MainLayout";
import { Button } from "flowbite-react";

const StatsCard = (props: {topText: string, bottomText: string}) => {
    return (
        <div className="w-48 border-slate-400 border-2 flex flex-col rounded-md py-1 px-2">
            <div className="text-lg font-medium">{props.topText}</div>
            <div className="self-end text-xl font-semibold">{props.bottomText}</div>
        </div>
    );
}

const Account = () => {
    return (
        <MainLayout>
            <div className="flex flex-col items-center p-8">
                <div className="flex w-full justify-between mb-4">
                    <p className="text-2xl font-bold">My Account</p>
                    <Button
                        color="blue"
                        href="/profile"
                    >
                        View Profile
                    </Button>
                </div>
                <div className="w-full border-slate-200 border-2 flex flex-col rounded-md p-4">
                    <p className="text-xl font-semibold mb-4">Statistics</p>
                    <div className="flex gap-x-4 mb-8">
                        <StatsCard topText="Items listed" bottomText="24"/>
                        <StatsCard topText="Items sold" bottomText="174"/>
                        <StatsCard topText="Total revenue" bottomText="$3,472"/>
                        <StatsCard topText="Remaining stock" bottomText="846"/>
                    </div>
                    
                    <p className="text-xl font-semibold mb-4">Listed Products</p>
                    <div className="flex justify-around gap-x-2 mb-8">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    
                    <p className="text-xl font-semibold mb-4">Products low on stock</p>
                    <div className="flex gap-x-2">
                        <ProductCard />
                        <ProductCard />
                    </div>
                    
                    <div className="my-16"></div>
                </div>
            </div>
        </MainLayout>
    );
}
 
export default Account;