"use client";

import { useEffect } from "react";
import "./scroll.css";

interface ShowOnScrollProps {
    children?: string | JSX.Element | JSX.Element[];
    className?: string;
    fromRight?: boolean;
}

export default function ShowOnScroll(p: ShowOnScrollProps) {
    useEffect(() => {
        const scrollElements = document.querySelectorAll(".hidden-scroll");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show-scroll");
                    } else {
                        entry.target.classList.remove("show-scroll");
                    }
                });
            },
            {
                threshold: 0.5,
            },
        );
        scrollElements.forEach((e) => observer.observe(e));
    });
    return (
        <section
            className={
                ` w-full hidden-scroll ${p.fromRight ? "from-r" : "from-l"}   ` +
                p.className
            }
        >
            {p.children}
        </section>
    );
}
