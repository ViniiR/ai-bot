"use client";
import { useChat } from "ai/react";
import Msg from "../(components)/Message";
import { useState } from "react";

export default function Chat() {
    const [err, setErr] = useState<Error | null>(null);
    const { messages, handleInputChange, handleSubmit, input } = useChat({
        onError: (err) => {
            setErr(err);
        },
    });

    return (
        <main className="h-full w-full bg-black flex flex-col justify-between overflow-y-scroll">
            <main className="bg-stone-500 p-2 w-full h-full overflow-y-scroll gap-2 flex flex-col">
                {messages.map((msg) => (
                    <Msg
                        isOwner={msg.role === "user"}
                        bearer={msg.role === "user" ? "You" : "V-AI"}
                        key={msg.id}
                        time={`${msg.createdAt?.getHours()}:${msg.createdAt?.getMinutes()}`}
                        content={msg.content}
                    ></Msg>
                ))}
                {err == null ? (
                    <main></main>
                ) : (
                    <Msg
                        content={err.message}
                        isOwner={false}
                        bearer={"Unexpected Error occurred"}
                    ></Msg>
                )}
            </main>
            <footer className="p-2 flex gap-1 bg-zinc-600 text-white ">
                <form onSubmit={handleSubmit} className="w-full h-max">
                    <input
                        onChange={handleInputChange}
                        value={input}
                        type="text"
                        placeholder="What are you wondering about?"
                        name="question"
                        id="question"
                        autoFocus
                        className="p-2 ps-3 w-full h-full outline-none rounded-full flex justify-center items-center bg-neutral-500 "
                    />
                </form>
            </footer>
        </main>
    );
}
