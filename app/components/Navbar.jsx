import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar(){
    return(
        <nav className="w-full relative text-center flex justify-between max-w-2xl mx-auto px-4 py-5">
            <Link href='/' className="font-bold text-3xl">
                Geek<span className="text-primary">Blogs</span>
            </Link>
            <ModeToggle/>
        </nav>
    )
}