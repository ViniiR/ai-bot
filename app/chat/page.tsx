import { redirect } from "next/navigation";
import { checkIfSessionIsValid } from "../(actions)/auth.actions";
import dynamic from "next/dynamic";
import Loading from "./loading";

const DynamicChat = dynamic(() => import("./Chat"), {
    loading: () => <Loading></Loading>,
    ssr: false,
});

export default async function ChatPage() {
    const isValidSession = await checkIfSessionIsValid();

    if (!isValidSession) {
        redirect("/signup");
    }

    return <DynamicChat></DynamicChat>;
}
