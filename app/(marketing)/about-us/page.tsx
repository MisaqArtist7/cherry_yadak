import Link from "next/link"

export default function AboutUsPage() {
    // آمار و ارقام کلیدی چری یدک
    const stats = [
        { id: 1, value: "۱۰+", label: "سال سابقه درخشان در تامین قطعات" },
        { id: 2, value: "۸,۰۰۰+", label: "مشتری وفادار و تعمیرکار راضی" },
        { id: 3, value: "۱,۵۰۰+", label: "قطعات اصلی و وارداتی چری" },
    ];

    // ویژگی‌ها و ارزش‌های کلیدی برند
    const features = [
        { id: 1, title: "تضمین اصالت و کیفیت قطعات", desc: "تمامی لوازم و قطعات یدکی خودروهای چری با بالاترین کیفیت و ضمانت اصالت به دست شما می‌رسند.", icon: "#check-badge" },
        { id: 2, title: "پشتیبانی و مشاوره تخصصی", desc: "تیم فنی ما در تمام مراحل انتخاب قطعه مناسب و عیب‌یابی خودروهای چری همراه شماست.", icon: "#phone-arrow-down-left" },
        { id: 3, title: "تامین سریع و بدون واسطه", desc: "حذف واسطه‌ها و ارتباط مستقیم جهت ارائه بهترین قیمت قطعات یدکی انواع مدل‌های چری.", icon: "#truck" },
    ];

    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-12 font-semibold" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* بخش اول: معرفی اصلی و داستان برند */}
                <section className="bg-white rounded-3xl p-6 md:p-10 border border-zinc-100 shadow shadow-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-[#D92F4E]/10 text-[#D92F4E] px-4 py-2 rounded-xl font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#D92F4E]"></span>
                            آشنایی با چری یدک
                        </div>
                        <h1 className="text-2xl md:text-2xl font-bold text-gray-900 leading-tight text-justify">
                            مرجع تخصصی تامین لوازم یدکی و قطعات اصلی خودروهای چری
                        </h1>
                        <p className="text-gray-500 leading-7 font-medium text-justify">
                            مجموعه چری یدک با سال‌ها تجربه در بازار لوازم یدکی خودرو، به عنوان یکی از مراجع اصلی تامین قطعات اورجینال و شرکتی انواع خودروهای چری در کشور شناخته می‌شود. هدف ما ارائه و توزیع مستقیم قطعات باکیفیت بالا اعم از لوازم موتوری، بدنه، جلوبندی و سیستم‌های الکترونیکی است تا رانندگان و تعمیرگاه‌ها دغدغه‌ای برای تامین قطعات نداشته باشند.
                        </p>
                    </div>

                    {/* باکس تصویر / تمپلیت بصری سمت چپ */}
                    <div className="w-full h-64 md:h-80 bg-linear-to-br from-gray-100 to-gray-50 rounded-3xl relative overflow-hidden border border-gray-100 flex items-center justify-center text-gray-400">
                        <div className="absolute inset-0 bg-gray-900/5 z-10"></div>
                        <span>تصویر فروشگاه یا انبار چری یدک</span>
                        {/* <Image src="/images/about-hero.jpg" fill className="object-cover" alt="درباره چری یدک" /> */}
                    </div>
                </section>

                {/* بخش دوم: ردیف آمار و افتخارات */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-white border border-zinc-100 shadow shadow-gray-200 rounded-3xl p-6 text-center space-y-1">
                            <span className="block text-2xl md:text-3xl font-bold text-[#D92F4E]">
                                {stat.value}
                            </span>
                            <span className="block text-gray-600 font-bold">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </section>

                {/* بخش سوم: چرا چری یدک؟ (ارزش‌ها) */}
                <section className="space-y-6">
                    <div className="text-center space-y-1">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">چرا رانندگان و تعمیرکاران چری یدک را انتخاب می‌کنند؟</h2>
                        <p className="text-gray-400 font-medium">مزیت‌هایی که ما را در تامین قطعات خودرو متمایز می‌کند</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
                        {features.map((feat) => (
                            <div key={feat.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm shadow-gray-100/50 flex flex-col gap-3 hover:border-gray-200 transition-all">
                                <div className="p-3 bg-[#D92F4E]/5 text-[#D92F4E] rounded-2xl w-fit">
                                    <svg className="w-7 h-7"><use href={feat.icon}></use></svg>
                                </div>
                                <h3 className="font-bold text-gray-900">{feat.title}</h3>
                                <p className="text-gray-500 leading-6 font-medium text-justify">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* بخش چهارم: دعوت به همکاری / تماس سریع */}
                <section className="bg-linear-to-r from-[#D92F4E] to-[#b8253f] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-center md:items-start gap-6 shadow-lg shadow-[#D92F4E]/10">
                    <div className="space-y-1">
                        <h3 className="md:text-lg font-bold">نیاز به مشاوره قبل از خرید قطعات خودرو دارید؟</h3>
                        <p className="text-white/80 font-medium">کارشناسان فنی ما آماده پاسخگویی به سوالات شما درباره انواع لوازم یدکی چری هستند.</p>
                    </div>
                    <Link 
                        href="/contact-us" 
                        className="bg-white text-[#D92F4E] hover:bg-gray-50 px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap cursor-pointer shadow-md"
                    >
                        ارتباط با کارشناسان فروش
                    </Link>
                </section>

            </div>
        </main>
    )
}