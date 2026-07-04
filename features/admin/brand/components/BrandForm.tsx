
'use client'
import { useState, useRef } from 'react'
import { CreateBrandAction } from '@/features/admin/brand/services/brandAction' 

type Brand = {id: number, name: string }
export default function BrandForm({ brand } : { brand : Brand[] }) {
    const [message, setMessage] = useState('')
    const [isPending, setIsPending] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(formData: FormData) {
        setIsPending(true)
        const result = await CreateBrandAction(formData)
        setMessage(result.message)
        setIsPending(false)

        if(result.success) {
            formRef.current?.reset()
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-6">
            <div>
                <label className="block font-bold mb-2 text-gray-700">نام برند:</label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="مثال: داهوا"
                    className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all"
                />
            </div>
            {message && (
                <p className={`text-sm font-bold ${message.includes('موفقیت') ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {message}
                </p>
            )}

            <div className="flex justify-end pt-4 border-t border-gray-50">
                <button
                    type="submit"
                    className="bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer disabled:opacity-50"
                >
                    { isPending ? 'در حال ثبت...' : 'ساخته برند' }
                </button>
            </div>
        </form>
    )
}
