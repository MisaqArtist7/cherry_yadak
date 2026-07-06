
import Link from "next/link"

export default function AboutUsPage() {
    // آمار و ارقام کلیدی البرز سی‌ان‌سی
    const stats = [
        { id: 1, value: "۱۰+", label: "سال سابقه درخشان صنعتی" },
        { id: 2, value: "۵,۰۰۰+", label: "مشتری وفادار و کارگاه فعال" },
        { id: 3, value: "۱,۵۰۰+", label: "تجهیزات و قطعات تخصصی CNC" },
    ];

    // ویژگی‌ها و ارزش‌های کلیدی برند
    const features = [
        { id: 1, title: "تضمین اصالت کادر و قطعات", desc: "تمامی اسپیندل‌ها، کنترلرها و قطعات یدکی با بالاترین کیفیت و ضمانت اصالت به دست شما می‌رسند.", icon: "#shield-check-icon" },
        { id: 2, title: "پشتیبانی و مشاوره فنی", desc: "تیم مهندسی ما در تمام مراحل انتخاب قطعه مناسب و عیب‌یابی دستگاه‌ها همراه کارگاه شماست.", icon: "#wrench-screwdriver-icon" },
        { id: 3, title: "تامین سریع و بدون واسطه", desc: "حذف واسطه‌ها و ارتباط مستقیم با برترین برندهای بین‌المللی جهت بهینه‌سازی قیمت تمام‌شده تجهیزات.", icon: "#truck-icon" },
    ];

    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-12 font-semibold" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* بخش اول: معرفی اصلی و داستان برند */}
                <section className="bg-white rounded-3xl p-6 md:p-10 border border-zinc-100 shadow shadow-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-[#D92F4E]/10 text-[#D92F4E] px-4 py-2 rounded-xl font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#D92F4E]"></span>
                            آشنایی با البرز سی‌ان‌سی
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            تامین‌کننده تخصصی تجهیزات و قطعات قطب صنعت ایران
                        </h1>
                        <p className=" text-gray-500 leading-7 font-medium text-justify">
                            مجموعه البرز سی‌ان‌سی با بیش از یک دهه تجربه در بستر صنایع ماشین‌کاری و اتوماسیون، به عنوان یکی از مراجع اصلی تامین قطعات یدکی و ملزومات دستگاه‌های CNC در کشور شناخته می‌شود. هدف ما ارائه و توزیع مستقیم قطعات باکیفیت بالا اعم از اسپیندل، اینسرت‌های تراشکاری، کنترلرهای صنعتی و ریل و واگن‌های دقیق است تا چرخ کارگاه‌ها و سوله‌های صنعتی کشور بدون وقفه بچرخد.
                        </p>
                    </div>

                    {/* باکس تصویر / تمپلیت بصری سمت چپ */}
                    <div className="w-full h-64 md:h-80 bg-linear-to-br from-gray-100 to-gray-50 rounded-3xl relative overflow-hidden border border-gray-100 flex items-center justify-center text-gray-400 ">
                        <div className="absolute inset-0 bg-gray-900/5 z-10"></div>
                        <span>تصویر کارخانه یا دفتر مرکزی</span>
                        {/* <Image src="/images/about-hero.jpg" fill className="object-cover" alt="درباره البرز سی‌ان‌سی" /> */}
                    </div>
                </section>

                {/* بخش دوم: ردیف آمار و افتخارات */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-white border border-zinc-100 shadow shadow-gray-200 rounded-3xl p-6 text-center space-y-1">
                            <span className="block text-2xl md:text-3xl font-bold text-[#D92F4E]">
                                {stat.value}
                            </span>
                            <span className="block  text-gray-600 font-bold">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </section>

                {/* بخش سوم: چرا البرز سی‌ان‌سی؟ (ارزش‌ها) */}
                <section className="space-y-6">
                    <div className="text-center space-y-1">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">چرا صنعت‌گران البرز سی‌ان‌سی را انتخاب می‌کنند؟</h2>
                        <p className=" text-gray-400 font-medium">مزیت‌هایی که ما را در تامین قطعات متمایز می‌کند</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
                        {features.map((feat) => (
                            <div key={feat.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm shadow-gray-100/50 flex flex-col gap-3 hover:border-gray-200 transition-all">
                                <div className="p-3 bg-[#D92F4E]/5 text-[#D92F4E] rounded-2xl w-fit">
                                    <svg className="w-6 h-6"><use href={feat.icon}></use></svg>
                                </div>
                                <h3 className=" font-bold text-gray-900">{feat.title}</h3>
                                <p className=" text-gray-500 leading-6 font-medium text-justify">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* بخش چهارم: دعوت به همکاری / تماس سریع */}
                <section className="bg-linear-to-r from-[#D92F4E] to-[#b8253f] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-lg shadow-[#D92F4E]/10">
                    <div className="space-y-1">
                        <h3 className=" md:text-lg font-bold">نیاز به مشاوره قبل از خرید قطعات دارید؟</h3>
                        <p className=" text-white/80 font-medium">کارشناسان فنی ما آماده پاسخگویی به سوالات شما درباره انواع قطعات و تجهیزات هستند.</p>
                    </div>
                    <Link 
                        href="/contact-us" 
                        className="bg-white text-[#D92F4E] hover:bg-gray-50 px-6 py-3 rounded-xl  font-bold transition-colors whitespace-nowrap cursor-pointer shadow-md"
                    >
                        ارتباط با کارشناسان فروش
                    </Link>
                </section>

            </div>
        </main>
    )
}