// features/admin/brand/components/BrandForm.tsx
'use client'

import React, { useRef, useState } from 'react'
import { createBrandAction } from '../services/brandAction'

export default function BrandForm() {
    const [message, setMessage] = useState('')
    const [isPending, setIsPending] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(formData: FormData) {
        setIsPending(true)
        const result = await createBrandAction(formData)
        setMessage(result.message)
        setIsPending(false)

        if (result.success) {
            formRef.current?.reset()
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-gray-700 font-bold mb-1.5 text-sm">
                    نام برند
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="مثلاً: بوش (Jepan)"
                    className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 outline-none font-medium text-gray-900 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-gray-400"
                />
            </div>

            {/* پیام نتیجه */}
            {message && (
                <div className={`p-3.5 rounded-xl font-bold border text-xs ${
                    message.includes('موفقیت') 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' 
                        : 'bg-rose-50 text-rose-600 border-rose-200/80'
                }`}>
                    {message}
                </div>
            )}

            {/* دکمه ثبت */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#D92F4E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#b92742] transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                    {isPending ? 'در حال ثبت...' : 'ساخت برند'}
                </button>
            </div>
        </form>
    )
}