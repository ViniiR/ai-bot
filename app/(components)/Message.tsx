"use client";

import { JSONValue } from "ai";
import Markdown from "react-markdown";

interface MessageProps {
    children?: JSX.Element;
    isOwner: boolean;
    content: string;
    bearer: string;
    time?: JSONValue;
    theme: string;
}

export default function Message(props: MessageProps) {
    return (
        <span
            className={`rounded h-max w-full flex flex-col gap-2 p-2 text-wrap break-words max-w-msg  ${props.theme} `}
        >
            <span className={"flex rounded p-2 justify-between w-full "}>
                <strong className="font-semibold">{props.bearer}</strong>
                <span>{props.time?.toString()}</span>
            </span>
            <span className={"p-2 rounded "}>
                <Markdown>{props.content}</Markdown>
            </span>
        </span>
    );
}
