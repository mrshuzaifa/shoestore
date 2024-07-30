"use client"

import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
    valueKey: string;
    name: string;
    data: (Size | Color) []
}
const Filter: React.FC<FilterProps> = ({
    valueKey,
    name,
    data
}) => {
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const selectedValue = searchParams.get(valueKey); 
    const onClick = (id: string) => {
        const current = queryString.parse(searchParams.toString());
        const query = {
            ...current,
            [valueKey]: id
        }
        if(current[valueKey]=== id){
            query[valueKey]= null;
        }
        const url = queryString.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true })
        replace(url);
    } 
    return ( 
        <div className="mb-8">
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        {name === 'Colors' ? 
                        <Button className=
                        {cn("h-6 w-6 rounded-full border border-gray-600 hover:text-white", 
                            selectedValue ===filter.id && "h-8 w-8"
                        )}
                        style={{backgroundColor: filter.value}}
                        onClick={()=>onClick(filter.id)}>
                            </Button>
                        
                        :
                        <Button className=
                        {cn("rounded-md text-sm text-gray-800 p-2 bg-white dark:bg-gray-400 border border-gray-300 hover:text-white", 
                            selectedValue ===filter.id && "bg-primary text-white"
                        )}
                        onClick={()=>onClick(filter.id)}>
                            {filter.name}</Button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Filter;