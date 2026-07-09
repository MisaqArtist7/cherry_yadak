'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function OrderSearchBox({ defaultValue }: { defaultValue: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [value, setValue] = useState(defaultValue)

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set("q", value)
        } else {
            params.delete("q")
        }
        router.push(`/profile/orders?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSearch} className="w-full md:w-72 relative">
            <input 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="جستجوی کد سفارش..." 
                className="w-full font-medium bg-gray-50 border border-gray-200 rounded-xl pr-9 pl-4 py-2.5 outline-none transition-all focus:border-[#D92F4E] focus:bg-white"
            />
            <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <use href="#searchIcon"></use>
            </svg>
        </form>
    )
}