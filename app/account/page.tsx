import { redirect } from "next/navigation";
import {
    checkIfSessionIsValid,
    deleteAccount,
    logOut,
} from "../(actions)/auth.actions";
import "./style.css";
import { getUserInfo } from "../(actions)/auth.actions";
import Image from "next/image";
import SlideDown from "../(components)/SlideDown";
import ClickConfirm from "../(components)/ClickConfirm";
import UserPfp from "@assets/bxs-user.svg";
import Link from "next/link";
import HoverText from "../(components)/HoverText";
import VChatLogo from "@assets/vchataifinal.svg";

export default async function page() {
    const hasAccount = await checkIfSessionIsValid();
    if (!hasAccount) {
        redirect("/signup");
    }
    const userInformation = await getUserInfo();
    if (userInformation == null) {
        redirect("/signup");
    }

    return (
        <main className="min-h-screen w-screen h-screen flex flex-col bg-black items-center md:gap-20">
            <header className="h-10 border-b border-b-white w-full p-8 ps-4 flex items-center text-white">
                <section className="flex justify-between min-w-32 items-center">
                    <Link
                        href="/"
                        className="flex items-center w-max cursor-pointer text-hover-parent text-white no-underline"
                    >
                        <Image
                            src={VChatLogo}
                            width={20}
                            height={20}
                            className="w-16 h-full md:w-20"
                            alt="Website logo, VChat - AI in styled font"
                        ></Image>
                        <span className=" h-full w-10 font-bold text-lg flex items-center justify-center">
                            - 0.1
                        </span>
                        <HoverText
                            content="Home"
                            className={`absolute top-14 z-20 left-10 text-hover text-white}`}
                        ></HoverText>
                    </Link>
                </section>
            </header>
            <section
                className="w-full h-full bg-black text-white flex flex-col gap-1 
                md:max-w-xl md:h-max p-2"
            >
                <section className="management-grid rounded-sm bg-stone-700 p-2 w-full gap-y-1 gap-x-1">
                    <Image
                        className="rounded-lg p-1 bg-stone-400 max-w-28 max-h-full h-full w-full management-c-pfp min-w-20"
                        src={UserPfp}
                        alt="User profile picture"
                    ></Image>
                    <big className="w-max grid items-center p-2 management-c-nm">
                        Hello, {userInformation.userName}!
                    </big>
                </section>
                <section className="w-full flex flex-col gap-1">
                    <SlideDown
                        isPassword={false}
                        className="w-full grid place-items-center"
                        btnClassName="rounded-sm shadow bg-stone-600 text-white w-full p-2 hover:bg-stone-700"
                        content="Change UserName"
                    ></SlideDown>
                    <SlideDown
                        isPassword={true}
                        className="w-full grid place-items-center"
                        btnClassName="rounded-sm shadow bg-stone-600 text-white w-full p-2 hover:bg-stone-700"
                        content="Change Password"
                    ></SlideDown>
                    <form
                        action={logOut}
                        className="w-full grid place-items-center"
                    >
                        <input
                            type="submit"
                            className="bg-blue-600 shadow rounded-sm text-white w-full p-2 hover:bg-blue-700 cursor-pointer"
                            value="Log Out"
                        />
                    </form>
                    <ClickConfirm
                        className="h-10 rounded-sm shadow bg-red-600 cursor-pointer text-center text-white hover:bg-red-700"
                        confirm={
                            <form
                                action={deleteAccount}
                                className="w-full grid place-items-center"
                            >
                                <input
                                    type="submit"
                                    className="rounded cursor-pointer bg-red-500 text-white w-full p-2 hover:bg-red-600"
                                    value="Delete Account"
                                />
                            </form>
                        }
                        text="Delete Account"
                    ></ClickConfirm>
                </section>
            </section>
        </main>
    );
}
