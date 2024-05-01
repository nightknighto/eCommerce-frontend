"use client";

import { Alert, Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

type EditProductModalProps = {
    open: boolean;
    onClose: () => void;
    error: string | null;
}

export default function EditProductModal({ open, onClose, error }: EditProductModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    function onCloseModal() {
        onClose();
    }

    function onSubmitModal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onClose();
    }

    return (
        <>
            <Modal show={open} size="md" onClose={onCloseModal} className="bg-slate-700" popup>
                <Modal.Header />
                <Modal.Body>
                    <form className="space-y-6" onSubmit={onSubmitModal}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit product details</h3>
                        {error && <Alert color="failure" className="bg-danger text-white">
                            <span className="font-medium">Error!</span> {error}
                        </Alert>}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Product name" />
                            </div>
                            <TextInput
                                id="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Product description" />
                            </div>
                            <TextInput
                                id="description"
                                type="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Product price" />
                            </div>
                            <TextInput
                                id="price"
                                type="price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="w-full">
                            <Button type="submit">Update product</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
