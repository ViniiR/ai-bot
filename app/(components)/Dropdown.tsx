"use client";

import { useEffect, useRef, useState } from "react";
import ChevronDown from "@assets/bxs-chevron-down.svg";
import ChevronUp from "@assets/bxs-chevron-up.svg";
import "./dropdown.css";
import { StaticImageData } from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../chat/Chat";

interface DropdownProps {
    children?: JSX.Element[] | JSX.Element;
    className?: string;
}

export default function Dropdown(p: DropdownProps) {
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [isDown, setIsDown] = useState(false);
    const [chevron, setChevron] = useState<StaticImageData>(ChevronDown);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        function showMenu() {
            setChevron(ChevronUp);
            dropdownRef.current!.classList.add("drop-down");
            document.removeEventListener("click", hideElement);
            document.addEventListener("click", hideElement);
        }

        function hideMenu() {
            setChevron(ChevronDown);
            dropdownRef.current!.classList.remove("drop-down");
            document.removeEventListener("click", hideElement);
        }

        function hideElement(e: Event) {
            if (!dropdownRef.current) return;

            if (!dropdownRef.current.contains(e.target as Node) && isDown) {
                hideMenu();
                setIsDown(!isDown);
                document.removeEventListener("click", hideElement);
            }
        }

        if (isDown) {
            showMenu();
        } else {
            hideMenu();
        }
    }, [isDown]);

    return (
        <button
            className={`w-4 h-4 cursor-pointer  ${p.className} dropdown-button-class-no-css`}
            onClick={(e) => {
                e.stopPropagation();
                if (
                    !(e.target as HTMLElement).classList.contains(
                        "dropdown-button-class-no-css",
                    )
                ) {
                    return;
                }
                setIsDown(!isDown);
            }}
            style={{
                backgroundImage: `url(${chevron.src})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
            }}
        >
            <ul
                ref={dropdownRef}
                className={`dropdown-menu  ${theme ? "dark-1 dark-text" : "light-1 light-text"}`}
            >
                {p.children}
            </ul>
        </button>
    );
}
