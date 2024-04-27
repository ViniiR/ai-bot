import { JSONValue } from "ai";
import Markdown from "react-markdown";

interface MessageProps {
    children?: JSX.Element;
    isOwner: boolean;
    content: string;
    bearer: string;
    time?: JSONValue;
    theme: string;
    className: string;
}

export default function Message(props: MessageProps) {
    return (
        <p
            className={`rounded h-max w-full flex flex-col gap-2 p-2 text-wrap break-words ${props.theme} ${props.className}`}
        >
            <p className={"flex rounded p-2 justify-between w-full "}>
                <span>{props.bearer}</span>
                <span>{props.time?.toString()}</span>
            </p>
            <p className={"p-2 rounded "}>
                <Markdown>{props.content}</Markdown>
            </p>
        </p>
    );
}
