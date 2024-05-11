import { redirect } from "next/navigation";
import {
    checkIfSessionIsValid,
    deleteAccount,
    logOut,
} from "../(actions)/auth.actions";
import "./style.css";
import { getUserInfo } from "../(actions)/auth.actions";
import Image from "next/image";
import SlideDown from "../(components)/SlideDown";
import ClickConfirm from "../(components)/ClickConfirm";
import UserPfp from "@assets/bxs-user.svg";

export default async function page() {
    const hasAccount = await checkIfSessionIsValid();
    if (!hasAccount) {
        redirect("/signup");
    }
    const userInformation = await getUserInfo();
    if (userInformation == null) {
        redirect("/signup");
    }

    //TODO
    return (
        <main className="min-h-screen w-screen grid place-items-center p-3 bg-black">
            <section className="w-full h-full bg-stone-500 rounded p-2 text-white flex flex-col gap-1 md:max-w-screen-sm">
                <section className="management-grid rounded bg-stone-700 p-2 w-full gap-y-1 gap-x-1">
                    <Image
                        className="rounded-lg p-1 bg-stone-400 max-h-full h-full w-full management-c-pfp min-w-20"
                        src={UserPfp}
                        alt="User profile picture"
                    ></Image>
                    <big className="w-max grid items-center p-2 management-c-nm">
                        Welcome, {userInformation.userName}!
                    </big>
                    <p className="w-full bg-stone-600 rounded-e p-2 grid items-center management-c-if">
                        Manage Your account
                    </p>
                </section>
                <section className="w-full rounded bg-stone-700 p-2 flex flex-col gap-1">
                    <form
                        action={logOut}
                        className="w-full grid place-items-center"
                    >
                        <input
                            type="submit"
                            className="rounded bg-blue-600 text-white w-full p-2 hover:bg-neutral-600 cursor-pointer"
                            value="Log Out"
                        />
                    </form>
                    <SlideDown
                        isPassword={false}
                        className="w-full grid place-items-center"
                        btnClassName="rounded-t bg-stone-600 text-white w-full p-2 hover:bg-neutral-600"
                        content="Change UserName"
                    ></SlideDown>
                    <SlideDown
                        isPassword={true}
                        className="w-full grid place-items-center"
                        btnClassName="rounded-t bg-stone-600 text-white w-full p-2 hover:bg-neutral-600"
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

    // return (
    //     <main className="w-screen h-screen bg-black gap-5 text-white ">
    //         <section className="flex flex-col w-2/3 min-h-half-screen align-center-no-jumping-when-changecn-button-click bg-zinc-200 rounded gap-5 shadow-sm p-2 text-black md:max-w-96">
    //             <article className="w-full grid place-items-center h-52 ">
    //                 <big className="font-bold">
    //                     Hello, {userInformation.userName} !
    //                 </big>
    //             </article>
    //             <section className="flex flex-col gap-1 bg-stone-700 w-full rounded p-2">
    //                 <form
    //                     action={logOut}
    //                     className="w-full grid place-items-center"
    //                 >
    //                     <input
    //                         type="submit"
    //                         className="rounded bg-blue-600 text-white w-full p-2 hover:bg-blue-700"
    //                         value="Log Out"
    //                     />
    //                 </form>
    //                 <SlideDown
    //                     isPassword={false}
    //                     className="w-full grid place-items-center"
    //                     btnClassName="rounded-t bg-blue-600 text-white w-full p-2 hover:bg-blue-700"
    //                     content="Change UserName"
    //                 ></SlideDown>
    //                 <SlideDown
    //                     isPassword={true}
    //                     className="w-full grid place-items-center"
    //                     btnClassName="rounded-t bg-blue-600 text-white w-full p-2 hover:bg-blue-700"
    //                     content="Change Password"
    //                 ></SlideDown>
    //                 <ClickConfirm
    //                     confirm={
    //                         <form
    //                             action={deleteAccount}
    //                             className="w-full grid place-items-center"
    //                         >
    //                             <input
    //                                 type="submit"
    //                                 className="rounded cursor-pointer bg-red-500 text-white w-full p-2 hover:bg-red-600"
    //                                 value="Delete Account"
    //                             />
    //                         </form>
    //                     }
    //                     text="Delete Account"
    //                 ></ClickConfirm>
    //             </section>
    //         </section>
    //     </main>
    // );
}
