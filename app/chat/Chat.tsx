"use client";
import { useChat } from "ai/react";
import Msg from "../(components)/Message";
import { useContext, useState, createContext, useRef, useEffect } from "react";
import Image from "next/image";
import VChatLogo from "../(assets)/vchataifinal.svg";

const ThemeContext = createContext(localStorage.getItem("theme") === "dark");

export default function Chat() {
    const [err, setErr] = useState<Error | null>(null);
    const [theme, setTheme] = useState(useContext(ThemeContext));
    const messagesParentRef = useRef<HTMLElement>(null);

    const { messages, handleInputChange, handleSubmit, input } = useChat({
        onError: (err) => {
            setErr(err);
        },
    });

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
                <header className="main-header text-white flex-row flex gap-1 p-2 bg-darker items-center tems-center w-screen h-12 justify-between md:h-20">
                    <div className="flex items-center w-max">
                        <Image
                            src={VChatLogo}
                            className="w-16 h-full md:w-20"
                            alt="Website logo, VChat - AI in styled font"
                        ></Image>
                        <span className=" h-full w-10 font-bold text-lg flex items-center justify-center">
                            - 0.1
                        </span>
                    </div>
                    <div className="cursor-pointer w-11 theme-switch h-full flex items-center justify-center">
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
                    </div>
                </header>
                <main
                    className={`h-full w-full flex flex-col justify-between overflow-y-hidden ${theme ? "dark-3" : "light-3"}`}
                >
                    <main
                        ref={messagesParentRef}
                        className={`p-2 w-full h-full overflow-y-scroll gap-2 flex flex-col items-center ${theme ? "dark-scroll" : ""}`}
                    >
                        {messages.map((msg) => (
                            <Msg
                                theme={theme ? "dark-2" : "light-2"}
                                isOwner={msg.role === "user"}
                                bearer={msg.role === "user" ? "You" : "V-AI"}
                                key={msg.id}
                                className="md:max-w-2xl"
                                time={`${msg.createdAt?.getHours()}:${msg.createdAt?.getMinutes().toString().padStart(2, "0")}`}
                                content={msg.content}
                            ></Msg>
                        ))}
                        {err === null ? (
                            <main></main>
                        ) : (
                            <Msg
                                className=""
                                theme={theme ? "dark-2" : "light-2"}
                                content={err.message}
                                isOwner={false}
                                bearer={"Unexpected Error occurred"}
                            ></Msg>
                        )}
                    </main>
                    <footer
                        className={`p-2 flex gap-1 text-white z-10 h-max w-full items-center justify-center ${theme ? "dark-4" : "light-4"} md:h-20`}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="w-full md:max-w-2xl h-full"
                        >
                            <input
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
