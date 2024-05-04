export default function page() {
    return (
        <main className="w-screen h-screen grid place-items-center bg-black text-white">
            <big>Credits</big>
            <article>
                Made by{" "}
                <a
                    href="https://www.github.com/viniir/ai-bot"
                    className="text-blue-500 underline"
                >
                    Vinii
                </a>
            </article>
            <article className="flex flex-col w-2/3 gap-2 text-sm text-stone-500">
                <big className="text-white">Icons:</big>
                <span>https://br.freepik.com/icone/olho_3917052</span>
                <span>https://br.freepik.com/icone/olhos-cruzados_3917021</span>
                <span>
                    https://www.pexels.com/pt-br/foto/vista-panoramica-das-montanhas-durante-o-amanhecer-1261728/
                </span>
                <span>
                    https://www.pexels.com/pt-br/foto/cachoeira-na-floresta-11552326/
                </span>
                <span>https://boxicons.com/?query=user</span>
            </article>
        </main>
    );
}
