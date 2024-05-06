"use client";

import ProductModal from "@/components/Modals/ProductModal";
import ContactAdminsModal from "@/components/Modals/ContactAdminsModal";
import { Button, Table } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { SellerInfo } from "@/types/SellerInfo";

const StatsCard = (props: {topText: string, bottomText: string}) => {
    return (
        <div className="w-48 border-slate-400 border-2 flex flex-col rounded-md py-1 px-2">
            <div className="text-lg font-medium">{props.topText}</div>
            <div className="self-end text-xl font-semibold">{props.bottomText}</div>
        </div>
    );
}

const Account = () => {
  const {token} = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showContactAdminsModal, setContactAdminsModal] = useState(false);

    const [stats, setStats] = useState<SellerInfo>();

    useEffect(() => {
        fetch("https://distributed-project-backend.onrender.com/api/stats/my-seller-info/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setStats(data);
        })
    }, [token]);

    const editProduct = () => {
        setShowEditModal(true);
    }

    const deleteProduct = () => {
        if (confirm("Are you sure you want to delete this product?")) {
            // delete product
        }
    }
    
    const addProduct = () => {
        setShowAddModal(true);
    }

    const contactAdmins = () => {
        setContactAdminsModal(true);
    }

    return (
        <>
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
                            onClick={contactAdmins}
                        >
                            Contact Admins
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
                        <StatsCard topText="Items listed" bottomText={stats?.products_num.toString() ?? ""}/>
                        <StatsCard topText="Items sold" bottomText={stats?.total_products_sold.toString() ?? ""}/>
                        <StatsCard topText="Total revenue" bottomText={stats?.total_revenue ?? ""}/>
                        <StatsCard topText="Rating" bottomText={stats?.average_product_rating ?? ""}/>
                        <StatsCard topText="Out of stock" bottomText={stats?.out_of_stock_num.toString() ?? ""}/>
                    </div>
                    
                    <p className="text-xl font-semibold mb-4">My Products</p>
                    <div className="overflow-x-auto mb-8">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Product name</Table.HeadCell>
                            <Table.HeadCell>Color</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Quantity sold</Table.HeadCell>
                            <Table.HeadCell>Remaining stock</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {'Apple MacBook Pro 17"'}
                                </Table.Cell>
                                <Table.Cell>Silver</Table.Cell>
                                <Table.Cell>Laptop</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>13</Table.Cell>
                                <Table.Cell>42</Table.Cell>
                                <Table.Cell className="flex gap-x-2">
                                    <Button size="sm" onClick={editProduct}>
                                        Edit
                                    </Button>
                                    <Button size="sm" onClick={deleteProduct} color="warning">
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    Microsoft Surface Pro
                                </Table.Cell>
                                <Table.Cell>White</Table.Cell>
                                <Table.Cell>Laptop PC</Table.Cell>
                                <Table.Cell>$1999</Table.Cell>
                                <Table.Cell>24</Table.Cell>
                                <Table.Cell>102</Table.Cell>
                                <Table.Cell className="flex gap-x-2">
                                    <Button size="sm" onClick={editProduct}>
                                        Edit
                                    </Button>
                                    <Button size="sm" onClick={deleteProduct} color="warning">
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
                                <Table.Cell>Black</Table.Cell>
                                <Table.Cell>Accessories</Table.Cell>
                                <Table.Cell>$99</Table.Cell>
                                <Table.Cell>145</Table.Cell>
                                <Table.Cell>85</Table.Cell>
                                <Table.Cell className="flex gap-x-2">
                                    <Button size="sm" onClick={editProduct}>
                                        Edit
                                    </Button>
                                    <Button size="sm" onClick={deleteProduct} color="warning">
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    </div>
                    
                    <p className="text-xl font-semibold mb-4">Products low on stock</p>
                    <div className="flex flex-wrap gap-x-2">
                        {/* <ProductCard onClick={editProduct} type="edit" stock={3}/>
                        <ProductCard onClick={editProduct} type="edit" stock={5}/> */}
                    </div>
                    
                    <div className="my-16"></div>
                </div>
            </div>
            <ProductModal type="edit" open={showEditModal} onClose={() => setShowEditModal(false)} error={null}/>
            <ProductModal type="add" open={showAddModal} onClose={() => setShowAddModal(false)} error={null}/>
            <ContactAdminsModal open={showContactAdminsModal} onClose={() => setContactAdminsModal(false)} error={null}/>
        </>
    );
}
 
export default Account;