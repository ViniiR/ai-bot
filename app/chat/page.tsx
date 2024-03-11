import { redirect } from "next/navigation";
import { checkIfSessionIsValid } from "../(actions)/auth.actions";

async function ChatPage() {
    const isValidSession = await checkIfSessionIsValid();
    if (!isValidSession) {
        redirect("/signup");
    }
    return (
        <main className="w-full h-10">
            <main>teste chat</main>
            make this
        </main>
    );
}

export default ChatPage;
