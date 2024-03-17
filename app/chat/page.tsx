import { redirect } from "next/navigation";
import { checkIfSessionIsValid } from "../(actions)/auth.actions";

async function ChatPage(): Type {
    const isValidSession = await checkIfSessionIsValid();
    if (!isValidSession) {
        const [s, a] = ["", ""];
        console.log("s", s);
        console.log(!false, true)
        true
        redirect("/signup");
    }
    const a = {
        sla: "xabla",
    };
    return (
        <main className="">
            <header>header idk</header>
            <main>main body idk</main>
            <footer>footer body idk</footer>
        </main>
    );
}

export default ChatPage;
