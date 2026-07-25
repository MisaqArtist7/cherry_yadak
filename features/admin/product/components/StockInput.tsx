'use client'

import { useState, useTransition } from "react"
import { updateStockAction } from "@/app/(admin)/admin/(protected)/products/action";

export default function StockInput({ productId, initialStock }: { productId: number; initialStock: number }) {
    const [stock, setStock] = useState(initialStock)
    const [isPending, startTransition] = useTransition()

    const handleSave = (val: number) => {
        if (val === initialStock || val < 0) return

        startTransition(async () => {
            const res = await updateStockAction(productId, val)
            if (!res.success) {
                alert(res.error)
                setStock(initialStock) // بازگرداندن مقدار قبلی در صورت خطا
            }
        })
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 max-w-[100px] mx-auto focus-within:border-rose-500 focus-within:bg-white transition-all relative">
            <input 
                type="number" 
                value={stock} 
                min="0"
                disabled={isPending}
                onChange={(e) => setStock(Number(e.target.value))}
                onBlur={() => handleSave(stock)} // موقع خارج شدن فوکوس ذخيره ميشه
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.currentTarget.blur() // با زدن اینتر ذخيره ميشه
                    }
                }}
                className="w-full bg-transparent border-0 text-center font-bold text-gray-900 outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
            />
            {isPending && (
                <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            )}
        </div>
    )
}