    import Image from "next/image"
    import Link from "next/link"

    export default function FooterComponent() {
    const quickLinks = [
        { id: 1, title: "خانه", href: "/" },
        { id: 2, title: "شگفت انگیزها", href: "/discounts" },
        { id: 3, title: "تماس با ما", href: "/contact-us" },
        { id: 4, title: "درباره ما", href: "/about-us" },
    ]

    const features = [
        { src: 'express-delivery', label: 'تحویل اکسپرس' },
        { src: 'cash-on-delivery', label: 'پرداخت در محل' },
        { src: 'support', label: 'پشتیبانی ۲۴/۷' },
        { src: 'original-products', label: 'ضمانت اصل بودن' },
    ]

    return (
        <footer className="bg-linear-to-b from-white to-gray-50 border-t border-gray-200/80 mt-12 text-gray-700">
        <div className="container mx-auto px-4 sm:px-6 pt-8 md:pt-14 pb-6"> {/* کاهش pt در موبایل */}

            {/* ۱. بخش بالایی: اطلاعات تماس و پشتیبانی */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200/60">
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8  w-full lg:w-auto justify-center lg:justify-start text-center sm:text-right"> {/* تراز وسط در موبایل */}
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray-100/80 px-4 py-3 sm:py-2 rounded-2xl sm:rounded-full border border-gray-200/50 w-full sm:w-auto">
                <span className="text-gray-500 font-medium">پشتیبانی:</span>
                <div className="flex items-center gap-3" dir="ltr"> {/* شماره‌ها همیشه کنار هم */}
                    <a href="tel:09125880323" className="font-semibold text-gray-800 hover:text-[#D92F4E] transition-colors">
                    ۰۹۱۲-۵۸۸-۰۳۲۳
                    </a>
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <span className="text-gray-300 inline sm:hidden">-</span>
                    <a href="tel:09193385979" className="font-semibold text-gray-800 hover:text-[#D92F4E] transition-colors">
                    ۰۹۱۹-۳۳۸-۵۹۷۹
                    </a>
                </div>
                </div>

                <div className="flex items-center gap-2  sm: font-medium text-gray-500 justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
                </div>
            </div>
            </div>

            {/* ۲. بخش ویژگی‌ها (اصلاح گرید برای موبایل) */}
            {/* تغییر مهم: grid-cols-2 در موبایل برای نمایش بهتر */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-8 md:py-10 border-b border-gray-200/60">
            {features.map((item, index) => (
                <div
                key={index}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D92F4E]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D92F4E]/5 rounded-2xl flex items-center justify-center group-hover:bg-[#D92F4E]/10 transition-colors mb-3">
                    <Image
                    src={`/images/footer/${item.src}.svg`}
                    width={48}
                    height={48}
                    alt={item.label}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <span className=" sm: text-gray-800 font-bold text-center group-hover:text-[#D92F4E] transition-colors">
                    {item.label}
                </span>
                </div>
            ))}
            </div>

            {/* ۳. بخش اصلی و ستون‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 py-10">
            
            {/* ستون ۱: درباره فروشگاه */}
            <div className="flex flex-col text-center md:text-right items-center md:items-start"> {/* تراز در موبایل */}
                <h4 className="font-extrabold text-gray-900 mb-4  sm:text-lg relative inline-block">
                فروشگاه چری یدک
                <span className="block w-8 h-1 bg-[#D92F4E] rounded-full mt-1.5 mx-auto md:mx-0"></span>
                </h4>
                <p className=" sm: text-gray-600 leading-relaxed text-justify md:text-right"> {/* تراز متن */}
                بزرگترین مرجع تخصصی تامین و توزیع قطعات یدکی اصلی خودروهای چری، ام‌وی‌ام، فونیکس و لوکانو. تضمین اصالت کالا، ارسال سریع به سراسر کشور و پشتیبانی تخصصی اولویت همیشگی ماست.
                </p>
            </div>

            {/* ستون ۲: لینک‌های سریع */}
            <div className="flex flex-col text-center md:text-right items-center md:items-start">
                <h4 className="font-extrabold text-gray-900 mb-4  sm:text-lg">
                دسترسی سریع
                <span className="block w-8 h-1 bg-[#D92F4E] rounded-full mt-1.5 mx-auto md:mx-0"></span>
                </h4>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2  sm: text-gray-600 w-full max-w-sm md:max-w-none">
                {quickLinks.map((link) => (
                    <li key={link.id}>
                    <Link
                        href={link.href}
                        className="hover:text-[#D92F4E] hover:translate-x-1 inline-block transition-all duration-200 py-1"
                    >
                        {link.title}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            {/* ستون ۳: باکس مشاوره */}
            <div className="flex flex-col items-center md:items-end justify-between bg-[#D92F4E]/5 p-6 rounded-2xl border border-[#D92F4E]/10 mt-4 md:mt-0">
                <div className="text-center md:text-right w-full mb-4 md:mb-0">
                <h5 className="font-bold text-gray-900  mb-1.5">نیازمند مشاوره فنی هستید؟</h5>
                <p className=" text-gray-500 max-w-xs mx-auto md:mx-0">کارشناسان ما آماده پاسخگویی به سوالات فنی و ثبت سفارش شما هستند.</p>
                </div>
                <a
                href="tel:09125880323"
                className="w-full text-center bg-[#D92F4E] hover:bg-[#b8233e] text-white  sm: font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
                >
                تماس با کارشناس فروش
                </a>
            </div>

            </div>

            {/* ۴. کپی‌رایت */}
            <div className="text-center pt-6 pb-2 border-t border-gray-200/50  text-gray-500 flex flex-col-reverse sm:flex-row items-center justify-between gap-3"> {/* ترتیب معکوس در موبایل */}
            <p className="text-gray-400">طراحی و توسعه یافته توسط تیم نووا لبز</p>
            <p>© تمامی حقوق این وب‌سایت متعلق به <span className="font-semibold text-gray-700">چری یدک</span> می‌باشد.</p>
            </div>

        </div>
        </footer>
    )
    }