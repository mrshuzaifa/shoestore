import Navbar from "@/components/site/navbar";

export default function HomeLayout ({
    children
} : {
    children : React.ReactNode;
}) { 
    return(
        <main className="mb-7 w-full">
            <Navbar  />
            {children}
        </main>
    )
}