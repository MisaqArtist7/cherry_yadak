import Link from 'next/link'
import { getCart } from '@/action/cart'
import CartItemCard from '@/components/ui/CartItemCard'

export default async function CartPage() {
    const cart = await getCart()
    const items = cart.items

    // محاسبه جمع‌ها
    const originalTotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    )
    const discountTotal = items.reduce(
        (sum, item) =>
            sum + Math.round((item.product.price * item.product.discount) / 100) * item.quantity,
        0
    )
    const finalTotal = originalTotal - discountTotal
    
    if (items.length === 0) {
        return (
            <section className="cart_section container mx-auto px-4 py-16 text-center text-gray-800 antialiased">
                <h1 className="font-extrabold text-xl text-gray-900 mb-2">سبد خرید شما خالی است</h1>
                <p className="text-gray-500 mb-6">هنوز محصولی به سبد خرید اضافه نکرده‌اید.</p>
                <Link
                    href="/"
                    className="inline-block bg-[#D92F4E] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#b8233f] transition-all"
                >
                    مشاهده محصولات
                </Link>
            </section>
        )
    }

    return (
        <section className="cart_section container mx-auto px-4 py-8 text-gray-800 antialiased">
            <div className="cart_wrapper flex flex-col lg:flex-row gap-6 items-start">
                
                {/* ستون راست: لیست کالاها و گزینه‌های جانبی */}
                <div className="w-full lg:flex-1 space-y-4">
                    
                    {/* هدر سبد خرید */}
                    <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between shadow-sm/5">
                        <div className="flex items-center gap-3">
                            <h1 className="font-extrabold text-xl text-gray-900 tracking-tight">سبد خرید شما</h1>
                            <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full">
                                {items.length.toLocaleString('fa-IR')} کالا
                            </span>
                        </div>
                        <button className="p-2 text-black hover:text-(--primaryColor) cursor-pointer">
                            <svg className='w-6 h-6'>
                                <use href='#ellipsis-vertical'></use>
                            </svg>
                        </button>
                    </div>

                    {/* کارت هر محصول */}
                    {items.map((item) => (
                        <CartItemCard key={item.id} item={item} />
                    ))}

                    {/* گزینه نصب در محل */}
                    <div className="bg-rose-50/40 border border-rose-200/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm/5">
                        <div className="flex items-start gap-3">
                            <div className="bg-rose-100 text-rose-700 p-2 rounded-lg shrink-0 mt-0.5">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-bold text-rose-900">نیاز به نصب و راه‌اندازی در محل دارید؟</h5>
                                <p className="text-rose-800/80 mt-1 leading-relaxed">
                                    برای هماهنگی اعزام تکنسین‌های مجرب تیم البرز CNC، لطفاً پس از ثبت سفارش با پشتیبانی تماس بگیرید.
                                </p>
                            </div>
                        </div>
                        
                        <a 
                            href="tel:09302340279" 
                            className="shrink-0 flex items-center justify-center gap-1.5 bg-white border border-rose-200 hover:border-rose-300 text-rose-800 px-4 py-2 rounded-xl font-bold transition shadow-sm hover:shadow active:scale-95 text-center"
                        >
                            <svg className='w-5 h-5'>
                                <use href='#phone'></use>
                            </svg>
                            تماس با پشتیبانی
                        </a>
                    </div>

                </div>

                {/* ستون چپ: فاکتور و جزئیات خرید */}
                <div className="w-full lg:w-110 shrink-0 bg-white border border-gray-100 rounded-xl p-5 shadow-sm lg:sticky lg:top-28 space-y-5">
                    <h2 className="font-extrabold text-gray-900 border-b border-gray-50 pb-3">
                        جزئیات خرید
                    </h2>
                    
                    <div className="space-y-3.5">
                        <div className="flex items-center justify-between text-gray-500">
                            <span>قیمت کالاها ({items.length.toLocaleString('fa-IR')})</span>
                            <div className="flex items-center gap-1 font-bold text-gray-800">
                                <span>{originalTotal.toLocaleString('fa-IR')}</span>
                                <svg className="w-3.5 h-3.5 text-gray-400 fill-current"><use href="#toman"></use></svg>
                            </div>
                        </div>

                        {discountTotal > 0 && (
                            <div className="flex items-center justify-between text-gray-500">
                                <span>تخفیف کالاها</span>
                                <div className="flex items-center gap-1 font-bold text-emerald-600">
                                    <span>{discountTotal.toLocaleString('fa-IR')}-</span>
                                    <svg className="w-3.5 h-3.5 text-emerald-600 fill-current"><use href="#toman"></use></svg>
                                </div>
                            </div>
                        )}

                        <div className="border-t border-gray-50 pt-4 flex items-center justify-between font-black text-gray-900 text-lg">
                            <span>مجموع سبد خرید</span>
                            <div className="flex items-center gap-1 text-[#D92F4E]">
                                <span>{finalTotal.toLocaleString('fa-IR')}</span>
                                <svg className="w-4 h-4 text-[#D92F4E] fill-current"><use href="#toman"></use></svg>
                            </div>
                        </div>
                    </div>

                    <Link href='/checkout/payment' className="w-full text-white py-3.5 rounded-xl font-bold bg-[#D92F4E] hover:bg-[#b8233f] shadow-lg shadow-[#D92F4E]/20 hover:shadow-[#D92F4E]/30 transition-all duration-300 cursor-pointer text-center block tracking-wide">
                        ثبت و ادامه سفارش
                    </Link>

                    <div className="bg-rose-50/60 border border-amber-100 rounded-xl p-3.5 flex gap-2.5">
                        <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-justify text-amber-800 leading-relaxed font-medium">
                            مبلغ سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالاها به صورت خودکار از سبد خرید شما حذف می‌شوند.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}