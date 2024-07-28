import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <div className="flex mt-1">
                <Image src="/logo.png" alt="StepOn logo" width={100} height={100} className="h-10 w-10 mt-1"/>
                <div>
                    <h1 className="text-red-700 font-extrabold text-lg ml-2">StepOn</h1>
                    <p className="text-red-700 text-xs ml-2">Step into Style</p>
                </div>
            </div>
        </Link>
     );
}
 
export default Logo;