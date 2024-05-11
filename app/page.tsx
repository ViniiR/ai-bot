import Link from "next/link";
import Image from "next/image";
import Logo from "@assets/vchataifinal.svg";
import LinkIcon from "@assets/bx-link-external.svg";
import BgImage from "@assets/bgaichatmooned.svg";
import ShowOnScroll from "./(components)/ShowOnScroll";
import WThemeShowcase from "@assets/bx-sun.svg";
import DThemeShowcase from "@assets/bx-moon.svg";
import { checkIfSessionIsValid } from "./(actions)/auth.actions";

export default async function Home() {
    const isLoggedIn = await checkIfSessionIsValid();
    return (
        <main
            className="h-screen w-screen text-white bg-black flex-col flex justify-between items-center overflow-y-scroll"
            style={{
                backgroundImage: `url(${BgImage.src})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
            }}
        >
            <header className="h-16 p-2 w-full bg-black sticky z-10 top-0 flex justify-between items-center backdrop-blur-sm bg-opacity-35">
                <Image
                    className="h-10 w-max cursor-pointer"
                    src={Logo}
                    alt="VChat - AI in styled font"
                ></Image>
                <section className="w-max flex justify-between items-center p-3 gap-2 text-sm">
                    {isLoggedIn ? (
                        <Link
                            href={"/account"}
                            className="w-max p-1 border border-gray-400 rounded-sm text-white cursor-pointer flex gap-1 items-center text-nowrap hover:text-neutral-200 hover:bg-stone-900"
                        >
                            My Account
                            <Image src={LinkIcon} alt="Icon for a link"></Image>
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={"/login"}
                                className="w-max p-1 border border-gray-400 rounded-sm text-white cursor-pointer flex gap-1 items-center text-nowrap hover:text-neutral-200 hover:bg-stone-900"
                            >
                                Login
                                <Image
                                    src={LinkIcon}
                                    alt="Icon for a link"
                                ></Image>
                            </Link>
                            <Link
                                href={"/signup"}
                                className="w-max cursor-pointer p-1 border border-gray-400 rounded-sm text-white gap-1 flex items-center text-nowrap hover:text-neutral-200 hover:bg-stone-900"
                            >
                                Sign Up
                                <Image
                                    src={LinkIcon}
                                    className="w-full h-full"
                                    alt="Icon for a link"
                                ></Image>
                            </Link>
                        </>
                    )}
                </section>
            </header>
            <section className="w-full p-2 pb-4 md:max-w-screen-sm min-desktop-h pt-10">
                <h1 className="text-xl font-bold w-full main-title text-center h-80 grid items-center ">
                    Introducing VChat - AI
                </h1>
                <Link
                    href={"/chat"}
                    className="w-max cursor-pointer p-1 border border-gray-400 rounded-sm text-white gap-1 flex items-center text-nowrap hover:text-neutral-200 hover:bg-stone-900"
                >
                    Try It!
                    <Image src={LinkIcon} alt="Icon for a link"></Image>
                </Link>
            </section>
            <main className="h-max w-full flex flex-col gap-5 items-center max-w-screen-third child-p-2 bg-black lg:pt-10">
                <article className="min-h-32 flex flex-col gap-2 text-start w-full">
                    <strong>
                        My own AI chatting website, feel welcome to use it.
                    </strong>
                    <p>
                        Using Vercel&apos;s AI SDK and google&apos;s Gemma-7b-it
                        LLM i&apos;ve created this AI chatting website
                    </p>
                </article>
                <article className="min-h-32 grid grid-rows-2 grid-cols-2 overflow-x-hidden auto-cols-fr backdrop-blur-sm rounded justify-between place-items-center gap-1 w-full lg:w-2/3">
                    <strong className="row-start-1 font-semibold font-sans col-span-2 grid place-items-center">
                        We feature Dark and Light modes on the chat!
                    </strong>
                    <ShowOnScroll className="min-h-32 row-start-2 grid place-items-center p-2">
                        <Image
                            src={DThemeShowcase}
                            className="bg-stone-500 w-2/3 max-w-52 rounded"
                            alt="Two panels showing dark and bright colors"
                        ></Image>
                    </ShowOnScroll>
                    <ShowOnScroll
                        className="min-h-32 row-start-2 grid place-items-center p-2"
                        fromRight={true}
                    >
                        <Image
                            src={WThemeShowcase}
                            className="bg-yellow-100 w-2/3 max-w-52 rounded"
                            alt="Two panels showing dark and bright colors"
                        ></Image>
                    </ShowOnScroll>
                </article>
                <ShowOnScroll className="min-h-32 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ratione cum accusamus, qui odit iste et mollitia itaque
                    perspiciatis, sint eveniet molestias nihil asperiores
                    deserunt ab doloribus molestiae fugit animi modi.
                </ShowOnScroll>
                <ShowOnScroll className="min-h-32 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ratione cum accusamus, qui odit iste et mollitia itaque
                    perspiciatis, sint eveniet molestias nihil asperiores
                    deserunt ab doloribus molestiae fugit animi modi.
                </ShowOnScroll>
                <ShowOnScroll className="min-h-32 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ratione cum accusamus, qui odit iste et mollitia itaque
                    perspiciatis, sint eveniet molestias nihil asperiores
                    deserunt ab doloribus molestiae fugit animi modi.
                </ShowOnScroll>
                <ShowOnScroll className="min-h-32 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ratione cum accusamus, qui odit iste et mollitia itaque
                    perspiciatis, sint eveniet molestias nihil asperiores
                    deserunt ab doloribus molestiae fugit animi modi.
                </ShowOnScroll>
            </main>
            <footer className="p-4 bg-stone-900 grid grid-cols-3 grid-rows-3 place-items-center w-full min-h-40 text-sm text-stone-400">
                <Link
                    href="https://www.github.com/viniir"
                    className="col-start-1 row-start-1 no-underline text-stone-400"
                >
                    Github
                </Link>
                <Link
                    href="/chat"
                    className="col-start-2 row-start-1 no-underline text-stone-400"
                >
                    Chat
                </Link>
                <Link
                    href="https://www.bibliaonline.com.br"
                    className="col-start-3 row-start-1 no-underline text-stone-400"
                >
                    Filler
                </Link>
                <Link
                    href="/account"
                    className="col-start-1 row-start-2 no-underline text-stone-400"
                >
                    My Account
                </Link>
                <Link
                    href="/login"
                    className="col-start-2 row-start-2 no-underline text-stone-400"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="col-start-3 row-start-2 no-underline text-stone-400"
                >
                    Sign Up
                </Link>
                <Link
                    href="/credits"
                    className="col-start-2 row-start-3 no-underline text-stone-400"
                >
                    Credits
                </Link>
            </footer>
        </main>
    );
}
