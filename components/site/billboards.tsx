"use client"
import { Billboard as BillboardType} from "@/types";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
interface BillboardsProps {
    data: BillboardType[]
};
const Billboards: React.FC<BillboardsProps> = ({
    data
}) => {
    return(
        <Carousel
        opts={{
            align: "center",
            containScroll: false,
            loop: true,
            direction: "ltr",
            slidesToScroll: "auto",

          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
            Fade(),
          ]}
          className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden relative aspect-[2.4/1]"
    >
    <CarouselContent>
        {data.map((billboard)=>
            (<CarouselItem key={billboard.id} className="">
                <div className="rounded-xl relative aspect-[2.4/1] overflow-hidden bg-cover" 
                style={{backgroundImage : `url(${billboard?.imageUrl})`}} >
                    
                </div>
            </CarouselItem>)
        )}
    </CarouselContent>
    </Carousel>
    )
}
export default Billboards;