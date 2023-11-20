import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import Link from "./Link";
import { SelectedPage } from "@/atoms/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/atoms/ActionButton";
import { useGetUsersClassesQuery, useGetAccountTokenMutation, useLoginUserMutation, useCreateNewUserMutation, useGetTokenQuery } from "@/queries/account";

type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const NavBar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow"
    const [createNewUser] = useCreateNewUserMutation()
    const [loginUser] = useLoginUserMutation()
    // const [userToken] = useGetAccountTokenMutation()
    const { data: userClasses } = useGetUsersClassesQuery()
    const { data: userToken } = useGetTokenQuery()

    const [token, setToken] = useState('')

    useEffect(() => {
        setToken(userToken)
        console.log("please be the token", token)
    }, [loginUser])

    const userData = {
        "username": "string",
        "first_name": "test",
        "last_name": "test",
        "email": "gandalf2@gmail.com",
        "role": "string",
        "password": "test"
    }

    const loginData = {
        "username": "string",
        "password": "string"
    }

    const loginUserHandler = () => {
        console.log("login user")
        console.log("user data", loginData)
        loginUser(loginData)
    }

    const createUserHandler = () => {
        console.log("create user")
        console.log("user data", userData)
        createNewUser(userData)
    }

    const getClassesHandler = () => {
        setClasses(userClasses)
    }

    // const getUserTokenHandler = () => {
    //     const token = getUserTokenQuery()
    //     const userT = setToken(userToken)
    //     console.log("please fn work mfer token:", userT)
    // }

    return (
        <nav>
            <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        {/* LEFT SIDE */}
                        <img className={`${flexBetween} mx-auto w-1/12`} alt="logo" src={Logo} />

                        {/* RIGHT SIDE */}
                        {isAboveMediumScreens ? (
                            <div className={`${flexBetween} w-full`}>
                                <div className={`${flexBetween} gap-8 text-sm`}>
                                    <Link
                                        page="Home"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                    <Link
                                        page="Decks"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                    <Link
                                        page="Quizzes"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                    <Link
                                        page="Contact Us"
                                        selectedPage={selectedPage}
                                        setSelectedPage={setSelectedPage}
                                    />
                                </div>
                                <div className={`${flexBetween} gap-8`}>
                                    <p onClick={createUserHandler}>Sign In</p>
                                    {/* <p onClick={getUserTokenHandler}>Fucking token</p> */}
                                    <p onClick={loginUserHandler}>Login</p>
                                    <ActionButton>Sign Up</ActionButton>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="rounded-full bg-secondary-500 p-2"
                                onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                <Bars3Icon className="h-s w-6 text-white" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE MENU MODAL */}
            {
                !isAboveMediumScreens && isMenuToggled && (
                    <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
                        <div className="flex justify-end p-12">
                            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                <XMarkIcon className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>
                        {/* MENU ITEMS */}
                        <div className="ml-[33%] flex flex-col gap-10 text-2xl">
                            <Link
                                page="Home"
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <Link
                                page="Decks"
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <Link
                                page="Quizzes"
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                            <Link
                                page="Contact Us"
                                selectedPage={selectedPage}
                                setSelectedPage={setSelectedPage}
                            />
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default NavBar;
