import { redirect } from "next/navigation";
import { checkIfSessionIsValid } from "../(actions)/auth.actions";
import Chat from "./Chat";
import "./style.css";

export default async function ChatPage() {
    const isValidSession = await checkIfSessionIsValid();

    if (!isValidSession) {
        redirect("/signup");
    }

    return <Chat></Chat>;
}
