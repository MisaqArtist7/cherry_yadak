import Link from "next/link"
import Image from "next/image"

export default function WishlistPage() {
    // دیتای نمونه محصولات موجود در لیست علاقه‌مندی‌های کاربر
    const favoritesSample = [
        { id: 1, name: "بلبرینگ سرامیکی پیشرفته اسپیندل HQD", cat: "قطعات یدکی", price: "۴,۲۰۰,۰۰۰ تومان", inStock: true, image: "/images/bearing.jpg" },
        { id: 2, name: "تیغچه اینسرت برش الماسه تنگستن", cat: "ابزارآلات برش", price: "۸۵۰,۰۰۰ تومان", inStock: true, image: "/images/tool.jpg" },
        { id: 3, name: "اسپیندل موتور خطی مینیاتوری سی‌ان‌سی", cat: "قطعات الکترونیکی", price: "۱۲,۴۰۰,۰۰۰ تومان", inStock: false, image: "/images/spindle.jpg" }
    ];

    return (
        <>
            <section className="min-h-screen bg-gray-50 flex gap-8 p-6 md:p-8 font-semibold" dir="rtl">         
                
                {/* سایدبار خریدار */}
                <aside className="w-80 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 flex flex-col shrink-0 border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-gray-100">
                        <div className="relative w-24 h-24 rounded-full p-1 border-2 border-[#D92F4E]/20">
                            <Image src='/images/admin.jpg' fill alt="تصویر کاربر" className="object-cover rounded-full" />
                        </div>
                        <div>
                            <h2 className="font-black text-gray-900 text-base">میثاق باباخانی</h2>
                            <span className=" font-bold text-gray-400 block mt-1">به پنل کاربری خوش آمدید!</span>
                        </div>
                    </div>

                    <nav className="mt-6 flex-1">
                        <ul className="flex flex-col gap-2">
                            {[
                                { label: 'میز کار', icon: '#squares-2x2', href: '/profile' },
                                { label: 'سفارش ها', icon: '#shopping-bag', href: '/profile/orders' },
                                { label: 'لیست های من', icon: '#heart', href: '/profile/lists', active: true },
                                { label: 'آدرس ها', icon: '#building-library', href: '/profile/addresses' },
                                { label: 'اطلاعات حساب کاربری', icon: '#identification', href: '/profile/personal-info' },
                                { label: 'خروج از حساب کاربری', icon: '#arrow-left-start-on-rectangle', href: '/' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={item.href} 
                                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl  font-bold transition-all duration-200 group ${
                                            item.active 
                                            ? 'bg-[#D92F4E] text-white shadow-lg shadow-[#D92F4E]/20' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                        }`}
                                    >
                                        <svg className={`w-5 h-5 transition-colors ${item.active ? 'text-white' : 'text-gray-400 group-hover:text-black'}`}>
                                            <use href={item.icon}></use>
                                        </svg>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
            
                {/* بخش اصلی لیست علاقه‌مندی‌ها */}
                <div className="flex-1 flex flex-col gap-6">
                    
                    {/* باکس عنوان صفحه */}
                    <div className="bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-6 border border-gray-100 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-gray-900">لیست علاقه‌مندی‌ها</h1>
                            <p className=" text-gray-400 mt-1 font-medium">قطعات و محصولاتی که نشان کرده‌اید</p>
                        </div>
                        <span className=" font-bold text-[#D92F4E] bg-[#D92F4E]/10 px-3 py-1.5 rounded-xl">
                            {favoritesSample.length} محصول نشان‌شده
                        </span>
                    </div>

                    {/* گرید کارت‌های محصولات موردعلاقه */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoritesSample.map((product) => (
                            <div key={product.id} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm shadow-gray-100 flex flex-col justify-between relative group hover:border-gray-200 transition-all">
                                
                                {/* دکمه حذف (سطل زباله) در بالای کارت */}
                                <button className="absolute top-4 left-4 p-2 text-gray-400 hover:text-[#D92F4E] hover:bg-red-50 rounded-xl transition-colors cursor-pointer" title="حذف از لیست">
                                    <svg className="w-4 h-4"><use href="#trash-icon"></use></svg>
                                </button>

                                <div className="space-y-4">
                                    {/* تصویر محصول */}
                                    <div className="w-full h-40 bg-gray-50 rounded-2xl relative overflow-hidden flex items-center justify-center">
                                        <div className="text-gray-300  font-bold">تصویر قطعه</div>
                                        {/* در پروژه واقعی سورس کامنت زیر باز می‌شود: */}
                                        {/* <Image src={product.image} fill className="object-cover" alt={product.name} /> */}
                                    </div>

                                    {/* اطلاعات متنی قطعه */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-md inline-block">{product.cat}</span>
                                        <h3 className="font-bold text-gray-800  line-clamp-2 h-10 pt-1 leading-6">{product.name}</h3>
                                    </div>
                                </div>

                                {/* قیمت و دکمه خرید در پایین کارت */}
                                <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col gap-4">
                                    <div className="flex items-center justify-between ">
                                        <span className="text-gray-400 font-bold">قیمت کالا:</span>
                                        <span className="font-black text-gray-900 ">{product.price}</span>
                                    </div>

                                    {product.inStock ? (
                                        <button className="w-full bg-[#D92F4E] text-white py-3 rounded-xl  font-bold hover:bg-[#b8253f] transition-colors shadow-md shadow-[#D92F4E]/10 flex items-center justify-center gap-2 cursor-pointer">
                                            <svg className="w-4 h-4"><use href="#shopping-cart-icon"></use></svg>
                                            افزودن به سبد خرید
                                        </button>
                                    ) : (
                                        <div className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl  font-bold text-center select-none">
                                            ناموجود در انبار البرز سی‌ان‌سی
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </section>
        </>
    )
}