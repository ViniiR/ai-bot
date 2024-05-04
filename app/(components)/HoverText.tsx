"use client";

import { useEffect, useState } from "react";

interface HoverTextProps {
    content: string;
    className?: string;
}

/**
 *
 * shows <p>content</p> on hover of parent element
 *
 * requires class: .text-hover
 * parent requires class: .text-hover-parent
 * */
export default function HoverText(props: HoverTextProps) {
    const [component, setComponent] = useState<JSX.Element>(
        <p
            className={
                "min-h-4 bg-neutral-600 hidden p-1 rounded-s-sm rounded rounded-e-sm text-xs  " +
                props.className
            }
        >
            {props.content}
        </p>,
    );

    useEffect(() => {
        if (window.innerWidth < 999) {
            setComponent(<div className="hidden"></div>);
        } else {
            setComponent(
                <p
                    className={
                        "min-h-4 bg-neutral-600 hidden p-1 rounded-s-sm rounded rounded-e-sm text-xs  " +
                        props.className
                    }
                >
                    {props.content}
                </p>,
            );
        }
    }, [props]);

    return component;
}
