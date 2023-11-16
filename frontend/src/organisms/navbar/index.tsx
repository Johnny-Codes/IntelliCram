import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import Link from "./Link";

type Props = {
    selectedPage: string;
    setSelectedPage: (value: string) => void;
}

const NavBar = (props: Props) => {
    const flexBetween = "flex items-center justify-between";
    return <nav>
        <div className={`${flexBetween} fixed top-0 z-30 w-full py-6`}>
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} w-full gap-16`}>
                    {/* LEFT SIDE */}
                    <img className={`${flexBetween} mx-auto w-1/12`} alt="logo" src={Logo} />

                    {/* RIGHT SIDE */}
                    <div className={`${flexBetween} w-full`}>
                        <div className={`${flexBetween} gap-8 text-sm`}>
                            <Link page="Home" />
                            <Link page="Decks" />
                            <Link page="Quizzes" />
                            <Link page="Contact Us" />
                        </div>
                        <div className={`${flexBetween} gap-8`}>
                            <p>Sign In</p>
                            <button>Sign Up</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </nav>;
    };


export default NavBar
