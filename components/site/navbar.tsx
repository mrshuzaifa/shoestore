import Logo from "@/components/logo";
import Container from "./container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { Category } from "@/types";

const Navbar = async () => {
    const categories : Category[] = await getCategories();
    return (
    <header className="h-16">
        <div className="fixed w-full top-0 flex h-16 items-center z-50 gap-1 md:gap-4 border-b bg-background px-4">
            <Logo />
            <MainNav data = {categories}/>
            <NavbarActions />
        </div>
    </header>
    );
}
 
export default Navbar;