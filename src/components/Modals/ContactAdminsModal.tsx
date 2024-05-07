"use client";

import { Alert, Button, Checkbox, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";

type ContactAdminsModalProps = {
    open: boolean;
    onClose: () => void;
    error: string | null;
}

export default function ContactAdminsModal({ open, onClose, error }: ContactAdminsModalProps) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    function onCloseModal() {
        onClose();
    }

    function onSubmitModal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setTimeout(() => {
            location.reload();
        }, 1500);
    }

    return (
        <>
            <Modal show={open} size="md" onClose={onCloseModal} className="bg-slate-700" popup>
                <Modal.Header />
                <Modal.Body>
                    <form className="space-y-6" onSubmit={onSubmitModal}>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Contact admins</h3>
                        {error && <Alert color="failure" className="bg-danger text-white">
                            <span className="font-medium">Error!</span> {error}
                        </Alert>}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Message title" />
                            </div>
                            <TextInput
                                id="title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="body" value="Message body" />
                            </div>
                            <Textarea 
                                id="body"
                                value={body}
                                rows={5}
                                onChange={(event) => setBody(event.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="w-full">
                            <Button type="submit">Send message</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
