import ScrollProgressBarComponent from "./ScrollProgressBar"
import MainNavComponent from "./MainNav"

import Image from "next/image"
import Link from "next/link"

export default function HeaderComponent() {

    return (
        <header className="bg-white border-b border-gray-100 shadow sticky top-0 z-50 transition-all duration-300">

            <div className="mx-auto px-11">

                {/* هدر اصلی */}
                <div className="flex items-center justify-between py-5 gap-8">

                    {/* لوگو + سرچ */}
                    <div className="flex items-center gap-8 grow">

                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                width={140}
                                height={45}
                                alt="لوگوی سایت"
                                className="h-10 w-auto cursor-pointer"
                            />
                        </Link>

                        <form className="w-full max-w-xs relative hidden sm:block transition-all duration-300 ease-in-out focus-within:max-w-md">
                            <input
                                type="search"
                                placeholder="جستجو در محصولات چری یدک..."
                                className="w-full font-medium bg-gray-50 border border-zinc-300 rounded-full pr-11 pl-4 py-3 outline-none transition-all focus:border-(--primaryColor) focus:bg-white focus:ring-4 focus:ring-[#D92F4E]/20"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <use href="#searchIcon"></use>
                            </svg>
                        </form>

                    </div>
                </div>

                {/* ناوبری */}
                <MainNavComponent />
            </div>

            {/* progress bar */}
            <ScrollProgressBarComponent />
        </header>
    )
}