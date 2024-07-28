import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";
import { Button } from "../ui/button";

interface IconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactElement;
    className?: string;
}
const IconButton : React.FC<IconButtonProps> = ({
    onClick, 
    icon,
    className
}) => {
    return ( 
    <Button
        onClick={onClick}
        className={cn("rounded-full flex items-center justify-center hover:bg-white border shadow-md p-2 hover:scale-110 transition hover:text-white",
            className)}
    >
        {icon}
    </Button>
     );
}
 
export default IconButton;