'use client'
import { createProductAction } from '@/features/admin/product/services/product'
import { useRef, useState } from "react"

type Category = { id: number, name: string }
type Brand = { id: number, name: string}

export default function ProductFormPage({ categories, brands }: { categories: Category[], brands: Brand[] }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [message, setMessage] = useState('')
    const [isPending, setIsPending] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsPending(true)
        const result = await createProductAction(formData)
        setMessage(result.message)
        setIsPending(false)

        if (result.success) {
            formRef.current?.reset()
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-6">

            {/* نام محصول و موجودی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-500 font-bold mb-2">نام محصول</label>
                    <input
                        name='title'
                        type="text"
                        required
                        placeholder="مثلاً: دستگاه CNC مدل تک محور X1"
                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none font-medium text-gray-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-gray-500 font-bold mb-2">موجودی انبار</label>
                    <input
                        name="stock"
                        type="number"
                        placeholder="مثلاً: ۱۲"
                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none font-medium text-gray-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all"
                    />
                </div>
            </div>

            {/* قیمت و تخفیف */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-500 font-bold mb-2">قیمت (تومان)</label>
                    <input
                        name='price'
                        type="number"
                        required
                        placeholder="مثلاً: ۴۵۰۰۰۰۰۰"
                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none font-black text-gray-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-gray-500 font-bold mb-2">تخفیف (درصد)</label>
                    <input
                        name='discount'
                        type="number"
                        placeholder="مثلاً: ۵"
                        className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none font-medium text-gray-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all"
                    />
                </div>
            </div>

            {/* دسته‌بندی و برند */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-gray-500 font-bold mb-2">دسته‌بندی</label>
                    <div className="relative">
                        <select 
                            name="categoryId" 
                            required
                            className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none font-bold text-gray-800 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all appearance-none cursor-pointer"
                        >
                            <option value="">انتخاب کنید</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-500 font-bold mb-2">برند</label>
                    <div className="relative">
                        <select 
                            name="brandId"
                            required
                            className='w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none font-bold text-gray-800 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all appearance-none cursor-pointer'
                        >
                            <option value="">انتخاب کنید</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* تصویر محصول */}
            <div>
                <label className="block text-gray-500 font-bold mb-2">تصویر محصول</label>
                <label className="border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-white hover:border-[#D92F4E] hover:bg-[#D92F4E]/5 transition-all cursor-pointer group">
                    <input type="file" name="image" accept="image/*" className="hidden" />
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-[#D92F4E] transition-colors mb-2">
                        <use href="#plus-circle"></use>
                    </svg>
                    <span className="font-bold text-gray-600 group-hover:text-[#D92F4E] transition-colors text-sm">
                        کلیک کنید یا تصویر را به این بخش بکشید
                    </span>
                    <span className="text-[11px] text-gray-400 mt-1 font-medium">فرمت‌های مجاز: PNG, JPG, WEBP</span>
                </label>
            </div>

            {/* توضیحات */}
            <div>
                <label className="block text-gray-500 font-bold mb-2">توضیحات فنی و اجمالی</label>
                <textarea
                    name="description"
                    rows={5}
                    placeholder="مشخصات موتور، ابعاد، توان مصرفی و..."
                    className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none font-medium text-gray-900 focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/5 transition-all resize-none"
                />
            </div>

            {message && (
                <div className={`p-4 rounded-xl font-bold text-sm border ${
                    message.includes('موفقیت') 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-rose-50 text-rose-500 border-rose-100'
                }`}>
                    {message}
                </div>
            )}

            <div className="flex justify-end pt-5 border-t border-gray-50">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl font-black hover:bg-[#b92742] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shadow-sm shadow-[#D92F4E]/20 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                    {isPending ? 'در حال ثبت...' : 'ذخیره و ثبت محصول'}
                </button>
            </div>

        </form>
    )
}