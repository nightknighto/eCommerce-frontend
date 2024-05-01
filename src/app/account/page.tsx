"use client";

import AccountProductCard from "@/components/Cards/AccountProductCard";
import MainLayout from "@/components/Layouts/MainLayout";
import AddProductModal from "@/components/Modals/AddProductModal";
import EditProductModal from "@/components/Modals/EditProductModal";
import { Button } from "flowbite-react";
import { useState } from "react";

const StatsCard = (props: {topText: string, bottomText: string}) => {
    return (
        <div className="w-48 border-slate-400 border-2 flex flex-col rounded-md py-1 px-2">
            <div className="text-lg font-medium">{props.topText}</div>
            <div className="self-end text-xl font-semibold">{props.bottomText}</div>
        </div>
    );
}

const Account = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const editProduct = () => {
        setShowEditModal(true);
    }
    
    const addProduct = () => {
        setShowAddModal(true);
    }

    return (
        <MainLayout>
            <div className="flex flex-col items-center p-8">
                <div className="flex w-full justify-between mb-4">
                    <p className="text-2xl font-bold">My Account</p>
                    <div className="flex gap-x-2">
                        <Button
                            color="blue"
                            onClick={addProduct}
                        >
                            Add New Product
                        </Button>
                        <Button
                            color="blue"
                            href="/profile"
                        >
                            View Profile
                        </Button>
                    </div>
                </div>
                <div className="w-full border-slate-200 border-2 flex flex-col rounded-md p-4">
                    <p className="text-xl font-semibold mb-4">Statistics</p>
                    <div className="flex flex-wrap gap-x-4 mb-8">
                        <StatsCard topText="Items listed" bottomText="24"/>
                        <StatsCard topText="Items sold" bottomText="174"/>
                        <StatsCard topText="Total revenue" bottomText="$3,472"/>
                        <StatsCard topText="Rating" bottomText="4.9/5"/>
                        <StatsCard topText="Out of stock" bottomText="17"/>
                    </div>
                    
                    <p className="text-xl font-semibold mb-4">Listed Products</p>
                    <div className="flex flex-wrap gap-x-2 mb-8">
                        <AccountProductCard onClick={editProduct}/>
                        <AccountProductCard onClick={editProduct}/>
                        <AccountProductCard onClick={editProduct}/>
                        <AccountProductCard onClick={editProduct}/>
                    </div>
                    
                    <p className="text-xl font-semibold mb-4">Products low on stock</p>
                    <div className="flex flex-wrap gap-x-2">
                        <AccountProductCard onClick={editProduct}/>
                        <AccountProductCard onClick={editProduct}/>
                    </div>
                    
                    <div className="my-16"></div>
                </div>
            </div>
            <EditProductModal open={showEditModal} onClose={() => setShowEditModal(false)} error={""}/>
            <AddProductModal open={showAddModal} onClose={() => setShowAddModal(false)} error={""}/>
        </MainLayout>
    );
}
 
export default Account;