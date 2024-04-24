import { JSONValue } from "ai";

interface MessageProps {
    children?: JSX.Element;
    isOwner: boolean;
    content: string;
    bearer: string;
    time?: JSONValue;
}

export default function Message(props: MessageProps) {
    return (
        <p
            className="rounded h-max bg-green-400 w-full flex flex-col gap-2 p-2 text-wrap break-words"
            style={{
                backgroundColor: props.isOwner ? "gray" : "#5c5c5c",
            }}
        >
            <p className="flex rounded bg-neutral-500 p-2 justify-between w-full ">
                <span>{props.bearer}</span>
                <span>{props.time?.toString()}</span>
            </p>
            <p className="p-2 rounded bg-stone-600">{props.content}</p>
        </p>
    );
}
