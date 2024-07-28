"use client";
import Preview from "@/components/site/preview";
import { useState, useEffect } from "react";
export const PreviewModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() =>{
        setIsMounted(true);
    }, [])
    if(!isMounted){
        return null;
    }
    return (
        <>
            <Preview />
        </> 
    )
}