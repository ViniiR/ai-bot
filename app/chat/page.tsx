import { redirect } from "next/navigation";
import { checkIfSessionIsValid } from "../(actions)/auth.actions";
import Chat from "./Chat";

export default async function ChatPage() {
    const isValidSession = await checkIfSessionIsValid();

    if (!isValidSession) {
        redirect("/signup");
    }

    return (
        <main className="h-screen w-screen flex flex-col justify-between">
            <header className="text-white flex-row flex gap-1 p-2 items-center tems-center bg-neutral-500 w-screen h-12">
                <h1 className="font-semibold h-full text-lg items-center flex justify-center">
                    VChat AI
                </h1>
                <span className=" h-full w-10 font-bold text-lg flex items-center justify-center">
                    - 0.1
                </span>
            </header>
            <Chat></Chat>
        </main>
    );
}
