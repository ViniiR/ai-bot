"use client";
import { useEffect, useRef, useState } from "react";

interface ClickConfirmProps {
    text: string;
    confirm: JSX.Element;
}

export default function ClickConfirm(p: ClickConfirmProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        if (!menuRef.current) return;

        if (isHidden) {
            menuRef.current.classList.add("hide-menu");
        } else {
            menuRef.current.classList.remove("hide-menu");
        }
    }, [isHidden]);

    return (
        <>
            <button
                onClick={() => {
                    setIsHidden(!isHidden);
                }}
                className="h-10 rounded bg-blue-600 cursor-pointer text-center text-white hover:bg-blue-700"
            >
                {p.text}
            </button>
            <main
                ref={menuRef}
                className="w-screen hide-menu h-screen bg-opacity-50 bg-black grid place-items-center align-center-no-jumping-when-changecn-button-click-confirm z-20 "
            >
                <section className="bg-zinc-200 p-2 rounded grid place-items-end gap-1 w-1/2 md:max-w-96">
                    <big className="w-full flex flex-col justify-center items-center text-center text-base h-20">
                        Are you sure you want to{" "}
                        <span className="font-semibold inline-block">
                            {p.text} ?
                        </span>
                    </big>
                    {p.confirm}
                    <button
                        onClick={() => {
                            setIsHidden(true);
                        }}
                        className="bg-blue-600 rounded w-full h-10 text-center text-white hover:bg-blue-700"
                    >
                        Cancel {p.text}
                    </button>
                </section>
            </main>
        </>
    );
}
