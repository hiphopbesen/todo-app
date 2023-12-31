import Link from "next/link"
import Image from "next/image"

export default function Example() {
    return (
        <div className="bg-gray-900">
            <main>
                {/* Hero section */}
                <div className="relative overflow-hidden isolate">
                    <svg
                        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
                    </svg>
                    <div
                        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                            }}
                        />
                    </div>
                    <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-40 lg:flex lg:px-8 lg:pt-40">
                        <div className="flex-shrink-0 max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:pt-8">
                            <img
                                className="h-11"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Logo"
                            />
                            <div className="mt-24 sm:mt-32 lg:mt-16">
                                <a href="#" className="inline-flex space-x-6">
                                    <span className="px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 rounded-full bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/20">
                                        ToDo App 1.0
                                    </span>
                                </a>
                            </div>
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Bachelorarbeit 
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Diese App entstand im Rahmen der Bachelorarbeit von Luca Schönherr
                            </p>
                            <div className="flex items-center mt-10 gap-x-6">
                                
                                <Link href="/login" className="text-sm font-semibold leading-6 text-white">
                                    Live demo <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                            <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
                                <Image
                                    height={632}
                                    width={1108}
                                    src="/dash.png"
                                    alt="App screenshot"
                                    className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer aria-labelledby="footer-heading" className="relative">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="px-6 pt-4 pb-8 mx-auto max-w-7xl lg:px-8">
                    <div className="pt-8 border-t border-white/10 md:flex md:items-center md:justify-between">
                        <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
                            &copy; 2023 Luca Schönherr.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
