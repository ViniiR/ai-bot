"use client";

import Link from "next/link";
import HoverText from "../(components)/HoverText";
import Msg from "../(components)/Message";
import Image from "next/image";
import VChatLogo from "../(assets)/vchataifinal.svg";
import Dropdown from "@/app/(components)/Dropdown";
import InfoIcon from "@assets/Info-icon.svg";
import CreditsIcon from "@assets/Credits.svg";
import { useContext, useState, createContext, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import "./chat.css";

export const ThemeContext = createContext(
    localStorage.getItem("theme") === "dark",
);

export default function Chat() {
    const { messages, handleInputChange, handleSubmit, input } = useChat({
        onError: (err) => {
            setErr(err);
        },
    });

    const [theme, setTheme] = useState(useContext(ThemeContext));

    useEffect(() => {
        setTheme(localStorage.getItem("theme") === "dark");
    }, []);

    const [err, setErr] = useState<Error | null>(null);
    const messagesParentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = messagesParentRef.current;
        if (!element) return;

        element.scrollTop = element.scrollHeight - element.clientHeight;
    }, [messages]);

    return (
        <ThemeContext.Provider value={theme}>
            <main
                className={`h-screen w-screen flex flex-col justify-between ${theme ? "dark-1 dark-text" : "light-1 light-text"}`}
            >
                <header className="main-header text-white flex-row flex gap-1 p-2 bg-darker items-center tems-center w-screen h-12 justify-between md:h-20 lg:p-4">
                    <section className="flex justify-between min-w-32 items-center">
                        <Link
                            href="/"
                            className="flex items-center w-max cursor-pointer text-hover-parent no-underline"
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
                                className={`absolute top-14 left-10 text-hover ${theme ? "dark-2" : "light-2"}`}
                            ></HoverText>
                        </Link>
                        <Dropdown className="">
                            <Link
                                href={"/account"}
                                className={`text-sm items-center flex justify-between gap-2 p-2 text-center no-underline  ${theme ? "dark-2 hover:bg-stone-500" : "light-2 hv-l-2 hover:bg-yellow-50"}`}
                            >
                                <span>Manage Account</span>
                                <Image
                                    src={InfoIcon}
                                    alt="I icon for information"
                                    className="w-4"
                                ></Image>
                            </Link>
                            <Link
                                href={"/credits"}
                                className={`text-sm items-center flex justify-between gap-2 p-2 text-center no-underline  ${theme ? "dark-2 hover:bg-stone-500" : "light-2 hv-l-2 hover:bg-yellow-50"}`}
                            >
                                <span>Credits</span>
                                <Image
                                    src={CreditsIcon}
                                    alt="I icon for information"
                                    className="w-4"
                                ></Image>
                            </Link>
                        </Dropdown>
                    </section>
                    <div className="cursor-pointer w-11 theme-switch h-full flex items-center justify-center text-hover-parent">
                        <input
                            type="checkbox"
                            onChange={() => {
                                setTheme(!theme);
                                localStorage.getItem("theme") === "dark"
                                    ? localStorage.setItem("theme", "light")
                                    : localStorage.setItem("theme", "dark");
                            }}
                            checked={!theme}
                            className={`z-10 opacity-0 cursor-pointer w-full h-full md:w-20`}
                            name="color-switch"
                            id="color-switch"
                        />
                        <HoverText
                            content="Switch Theme"
                            className={`absolute top-10 right-6 text-hover w-max ${theme ? "dark-2" : "light-2"}`}
                        ></HoverText>
                    </div>
                </header>
                <main
                    className={`h-full w-full flex flex-col justify-between overflow-y-hidden ${theme ? "dark-3" : "light-3"}`}
                >
                    <main
                        ref={messagesParentRef}
                        className={`p-2 w-full h-full overflow-y-scroll gap-1 flex flex-col items-center  ${theme ? "dark-scroll" : "light-scroll"}`}
                    >
                        {messages.length === 0 ? (
                            <>
                                <Msg
                                    theme={theme ? "dark-2" : "light-2"}
                                    content="How can i ask a question?"
                                    isOwner={true}
                                    bearer="Prompter"
                                ></Msg>
                                <Msg
                                    theme={theme ? "dark-2" : "light-2"}
                                    content='Here is an example: "Hello, how can i start learning JavaScript today?"'
                                    isOwner={false}
                                    bearer="V-AI"
                                ></Msg>
                            </>
                        ) : (
                            <div className="hidden"></div>
                        )}
                        {messages.map((msg) => (
                            <Msg
                                theme={theme ? "dark-2" : "light-2"}
                                isOwner={msg.role === "user"}
                                bearer={msg.role === "user" ? "You" : "V-AI"}
                                key={msg.id}
                                time={`${msg.createdAt?.getHours().toString().padStart(2, "0")}:${msg.createdAt?.getMinutes().toString().padStart(2, "0")}`}
                                content={msg.content}
                            ></Msg>
                        ))}
                        {err !== null ? (
                            <Msg
                                theme={theme ? "dark-2" : "light-2"}
                                content={err.message}
                                isOwner={false}
                                bearer={
                                    "Unexpected Error occurred, try again later."
                                }
                            ></Msg>
                        ) : (
                            <div className="hidden"></div>
                        )}
                    </main>
                    <footer
                        className={`p-2 flex gap-1 text-white gutter-true z-10 h-max w-full items-center justify-center ${theme ? "dark-4" : "light-4"} md:h-20`}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="w-full md:max-w-2xl h-full"
                        >
                            <input
                                autoComplete="off"
                                onChange={handleInputChange}
                                value={input}
                                type="text"
                                placeholder="What are you wondering about?"
                                name="question"
                                id="question"
                                autoFocus
                                className={`p-2 ps-3 w-full h-full z-10 outline-none rounded-r-lg rounded-l-lg flex justify-center items-center ${theme ? "dark-2" : "light-2"}`}
                            />
                        </form>
                    </footer>
                </main>
            </main>
        </ThemeContext.Provider>
    );
}
