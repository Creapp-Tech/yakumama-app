import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f9f0] p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between text-center font-mono text-sm lg:flex">
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <h1 className="text-4xl font-bold text-[#8dbf44] mb-4">YAKUMAMA</h1>
                </div>
            </div>

            <div className="relative flex flex-col place-items-center">
                <h2 className="text-2xl font-semibold mb-8 text-gray-700">Bienestar Cognitivo</h2>
                <div className="flex gap-4">
                    <Link
                        href="/auth/login"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold text-[#8dbf44]`}>
                            Iniciar Sesión <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-600`}>
                            Accede a tu panel y evaluaciones.
                        </p>
                    </Link>

                    <Link
                        href="/auth/register"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold text-[#8dbf44]`}>
                            Registrarse <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-gray-600`}>
                            Crea una cuenta nueva.
                        </p>
                    </Link>
                </div>
            </div>
        </main>
    );
}
