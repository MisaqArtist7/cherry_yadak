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
                                src="/images/logo.svg"
                                width={140}
                                height={45}
                                alt="لوگوی سایت"
                                className="h-10 w-auto cursor-pointer"
                            />
                        </Link>

                        <form className="w-full max-w-xs relative hidden sm:block transition-all duration-300 ease-in-out focus-within:max-w-md">
                            <input
                                type="search"
                                placeholder="جستجو در محصولات دیجی دوربین..."
                                className="w-full font-medium bg-gray-50 border border-zinc-300 rounded-full pr-11 pl-4 py-3 outline-none transition-all focus:border-(--primaryColor) focus:bg-white focus:ring-4 focus:ring-[#D92F4E]/20"
                            />
                            <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <use href="#searchIcon"></use>
                            </svg>
                        </form>

                    </div>

                    {/* اکشن‌ها */}
                    <div className="flex items-center gap-4 shrink-0">

                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-5 py-2.5 border text-white rounded-xl font-bold border-(--primaryColor) bg-(--primaryColor) hover:bg-(--hoverColor) transition-all duration-300 shadow-md shadow-(--primaryColor)/10"
                        >
                            <svg className="w-5 h-5"><use href="#addUserIcon"></use></svg>
                            <span>ورود | ثبت نام</span>
                        </Link>

                        <div className="w-px h-6 bg-zinc-300"></div>

                        <Link
                            href="/checkout/cart"
                            className="p-3 bg-gray-100 border border-zinc-200 rounded-xl transition-all relative group"
                        >
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-(--primaryColor) transition-colors">
                                <use href="#shopping-cart"></use>
                            </svg>

                            <span className="absolute -top-1 -left-1 bg-(--primaryColor) text-white font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-sm">
                                ۳
                            </span>
                        </Link>

                    </div>
                </div>

                {/* ناوبری */}
                <MainNavComponent />
            </div>

            {/* overlay درست */}
            

            {/* progress bar */}
            <ScrollProgressBarComponent />
        </header>
    )
}