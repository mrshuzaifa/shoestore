"use client"

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import IconButton from "../site/icon-button";
import { X } from "lucide-react";

interface PreviewModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const PreviewModal: React.FC<PreviewModalProps> = ({
    open, 
    onClose,
    children
}) => {
    return(
        <Transition show={open} appear as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black  bg-opacity-50" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex max-h-screen items-center justify-center p-4 text-center">
                        <TransitionChild 
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-h-screen rounded-lg text-left align-middle">
                                <div className="relative flex w-full items-center overflow-auto bg-white dark:bg-gray-950 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <div className="absolute right-4 top-4 z-40">
                                        <IconButton icon={<X size={15} />} onClick={onClose} className="hover:text-gray-600" />
                                    </div>
                                    {children} 
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default PreviewModal;