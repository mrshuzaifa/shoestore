"use client";

import { useEffect, useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary"

interface ImageUploadProps {
    disabled? : boolean;
    onChange : (value : string[]) => void;
    onRemove : (value : string) => void;
    value : string[];
    multiple: boolean;
}
const ImageUpload : React.FC<ImageUploadProps> = ({
    disabled,
    onChange, 
    onRemove, 
    value,
    multiple
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [urlList, setUrlList] = useState(value);
    useEffect(() =>{
        setIsMounted(true);
    }, []);
    const onSuccess = (result: any) => {
        let url = result.info.secure_url as string;
        if(multiple) {
            setUrlList(value);
        } else {
            value = [];
            value.push(url);
        }
        setUrlList(value);
        onChange(value);
        {/*widget.close({
            quiet: true,
          });*/}
    }
    if(!isMounted){
        return null;
    }
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {urlList.map((url) => (
                    <div 
                        key = {url} 
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button 
                                    type="button" 
                                    onClick={()=>{ 
                                        onRemove(url); 
                                        setUrlList(urlList.filter(((current) => current !== url)));
                                        console.log("on click urlList " + urlList);
                                        console.log("on click value " + value);
                                    }} 
                                    variant="destructive"
                                    size="icon"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url}
                            />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onSuccess} uploadPreset="npqshzol"> 
                { ( { open }) => {
                const onClick = () => {
                    open();
                }
                return (
                    <Button
                        type="button"
                        disabled = {disabled}
                        variant= "secondary"
                        onClick={onClick}
                    >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Upload an Image
                    </Button>   
                )
                }}
            </CldUploadWidget>
        </div>
    )
}
export default ImageUpload;