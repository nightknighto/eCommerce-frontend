"use client";

import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Alert, Button, Checkbox, Dropdown, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

type ProductModalProps = {
    type: "add" | "edit",
    open: boolean;
    onClose: () => void;
    error: string | null;
    token: string | null;
    onDone: () => void;
    product?: Product
}

export default function ProductModal(props: ProductModalProps) {
    const [name, setName] = useState(props.type === "edit" ? props.product?.name : "");
    const [description, setDescription] = useState(props.type === "edit" ? props.product?.description : "");
    const [specs, setSpecs] = useState(props.type === "edit" ? props.product?.specs : "");
    const [price, setPrice] = useState(props.type === "edit" ? props.product?.price : "");
    const [quantity, setQuantity] = useState(props.type === "edit" ? props.product?.quantity : "");
    const [category, setCategory] = useState(props.type === "edit" ? props.product?.category : 0);

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("https://distributed-project-backend.onrender.com/api/home/categories/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${props.token}`
            }
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setCategories(data);
        })
    }, [props.token])

    function onCloseModal() {
        props.onClose();
    }

    const addOrEditProduct = () => {
        const url = "https://distributed-project-backend.onrender.com/api/home/products/" + (props.type === "edit" ? `${props.product?.id}` : "");
        console.log(url);
        fetch(url,{
            method: props.type === "add" ? "POST" : "PATCH",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${props.token}`
            },
            body: JSON.stringify({
                name,
                description,
                price,
                specs,
                category,
                quantity
            })
        })
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then((data) => {
            console.log(data);
            props.onDone();
        })
    }

    function onSubmitModal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        addOrEditProduct();
        props.onClose();
    }

    return (
        <>
            <Modal show={props.open} size="md" onClose={onCloseModal} className="bg-slate-700 mt-8" popup>
                <Modal.Header />
                <Modal.Body>
                    <form className="space-y-1" onSubmit={onSubmitModal}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            {props.type === "add" ? "Add new product" : "Edit product details"}    
                        </h3>
                        {props.error && <Alert color="failure" className="bg-danger text-white">
                            <span className="font-medium">Error!</span> {props.error}
                        </Alert>}
                        <div>
                            <Label htmlFor="name" value="Product name" />
                            <TextInput
                                id="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" value="Product description" />
                            <TextInput
                                id="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                        <Label htmlFor="category" value="Product category" />
                        <Select id="category" required value={category} onChange={(event) => setCategory(parseInt(event.target.value))}>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Select>
                        </div>
                        <div>
                            <Label htmlFor="specs" value="Product specification" />
                            <TextInput
                                id="specs"
                                value={specs}
                                onChange={(event) => setSpecs(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="price" value="Product price" />
                            <TextInput
                                id="price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="quantity" value="Quantity" />
                            <TextInput
                                id="quantity"
                                value={quantity}
                                onChange={(event) => setQuantity(event.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="w-full">
                            <Button type="submit">
                                {props.type === "add" ? "Add product" : "Update product"}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
