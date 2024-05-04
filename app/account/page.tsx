import { redirect } from "next/navigation";
import {
    checkIfSessionIsValid,
    deleteAccount,
    logOut,
} from "../(actions)/auth.actions";
import "./style.css";
import { getUserInfo } from "../(actions)/auth.actions";
import SlideDown from "../(components)/SlideDown";
import ClickConfirm from "../(components)/ClickConfirm";

export default async function page() {
    const hasAccount = await checkIfSessionIsValid();
    if (!hasAccount) {
        redirect("/signup");
    }
    const userInformation = await getUserInfo();
    if (userInformation == null) {
        redirect("/signup");
    }

    return (
        <main className="w-screen h-screen bg-black gap-5 text-white overflow-y-hidden ">
            <section className="flex flex-col w-2/3 min-h-half-screen align-center-no-jumping-when-changecn-button-click bg-zinc-200 rounded gap-5 shadow-sm p-2 text-black md:max-w-96">
                <article className="w-full grid place-items-center h-52 ">
                    <big className="font-bold">
                        Hello, {userInformation.userName} !
                    </big>
                </article>
                <section className="flex flex-col gap-1 bg-stone-700 w-full rounded p-2">
                    <form
                        action={logOut}
                        className="w-full grid place-items-center"
                    >
                        <input
                            type="submit"
                            className="rounded bg-blue-600 text-white w-full p-2 hover:bg-blue-700"
                            value="Log Out"
                        />
                    </form>
                    <SlideDown
                        isPassword={false}
                        className="w-full grid place-items-center"
                        btnClassName="rounded-t bg-blue-600 text-white w-full p-2 hover:bg-blue-700"
                        content="Change UserName"
                    ></SlideDown>
                    <SlideDown
                        isPassword={true}
                        className="w-full grid place-items-center"
                        btnClassName="rounded-t bg-blue-600 text-white w-full p-2 hover:bg-blue-700"
                        content="Change Password"
                    ></SlideDown>
                    <ClickConfirm
                        confirm={
                            <form
                                action={deleteAccount}
                                className="w-full grid place-items-center"
                            >
                                <input
                                    type="submit"
                                    className="rounded cursor-pointer bg-red-500 text-white w-full p-2 hover:bg-red-600"
                                    value="Delete Account"
                                />
                            </form>
                        }
                        text="Delete Account"
                    ></ClickConfirm>
                </section>
            </section>
        </main>
    );
}
