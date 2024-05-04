"use client";

import { useEffect, useRef, useState } from "react";
import "./slide.css";
import { FormChangeName, FormChangePassword } from "./FormChangeName";

interface SlideDownProps {
    content: string;
    className?: string;
    btnClassName?: string;
    isPassword: boolean;
}
export default function SlideDown(p: SlideDownProps) {
    const [isHidden, setIsHidden] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formRef.current) return;

        function scroll(down: boolean) {
            if (!formRef.current) return;

            let height = formRef.current.style.height;
            if (height === "") {
                height = "0px";
            }
            let numericHeight = Number(height.slice(0, height.indexOf("p")));

            if (down) {
                requestAnimationFrame(() => {
                    if (!formRef.current) return;

                    numericHeight = numericHeight + 10;
                    formRef.current.style.height = numericHeight + "px";
                    formRef.current.classList.remove("hide-form");
                    if (numericHeight <= 110) {
                        scroll(true);
                    }
                });
            } else {
                requestAnimationFrame(() => {
                    if (!formRef.current) return;

                    numericHeight = numericHeight - 10;
                    formRef.current.style.height = numericHeight + "px";
                    formRef.current.classList.add("hide-form");
                    if (numericHeight >= 0) {
                        scroll(false);
                    }
                });
            }
        }

        if (isHidden) {
            scroll(false);
        } else {
            scroll(true);
        }
    }, [isHidden]);

    return (
        <section className={p.className}>
            <button
                onClick={() => {
                    setIsHidden(!isHidden);
                }}
                className={p.btnClassName}
            >
                {p.content}
            </button>
            {p.isPassword ? (
                <FormChangePassword fref={formRef}></FormChangePassword>
            ) : (
                <FormChangeName fref={formRef}></FormChangeName>
            )}
        </section>
    );
}
