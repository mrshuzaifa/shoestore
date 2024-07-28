import { Billboard as BillboardType} from "@/types";
interface BillboardProps {
    data: BillboardType
};
const Billboard: React.FC<BillboardProps> = ({
    data
}) => {
    return(
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div className="rounded-xl relative aspect-[2.4/1] overflow-hidden bg-cover" 
            style={{backgroundImage : `url(${data?.imageUrl})`}} >
                <div className="h-full w-full flex flex-col justify-center gap-y-8">
                    <div className="font-bold text-3xl sm:text-5xl lg:text-9xl sm:max-w-xl max-w-xs ml-20 text-amber-100">
                        {/*data.label*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Billboard;