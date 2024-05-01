"use client";

import { Alert, Button, Checkbox, Dropdown, Label, Modal, Select, TextInput } from "flowbite-react";
import { useState } from "react";

type ProductModalProps = {
    type: "add" | "edit",
    open: boolean;
    onClose: () => void;
    error: string | null;
}

export default function ProductModal(props: ProductModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [specs, setSpecs] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("category1");

    function onCloseModal() {
        props.onClose();
    }

    function onSubmitModal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(category);
        props.onClose();
    }

    return (
        <>
            <Modal show={props.open} size="md" onClose={onCloseModal} className="bg-slate-700" popup>
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
                        <Select id="category" required value={category} onChange={(event) => setCategory(event.target.value)}>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                            <option value="category3">Category 3</option>
                            <option value="category4">Category 4</option>
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
                        <div>
                            <Label htmlFor="image" value="Image thumbnail" />
                            <TextInput
                                id="image"
                                value={image}
                                onChange={(event) => setImage(event.target.value)}
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
