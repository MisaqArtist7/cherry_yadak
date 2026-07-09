// components/AddToCartButton.tsx
'use client'

import { useState } from "react"
import { addToCart } from "@/action/cart"
import { useRouter } from "next/navigation"

export default function AddToCartButton({ productId }: { productId: number }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState(false)

    async function handleAdd() {
        setLoading(true)
        const result = await addToCart(productId, 1)
        setLoading(false)

        if (result.success) {
            setAdded(true)
            router.refresh()
            setTimeout(() => setAdded(false), 2000)
        }
    }

    return (
        <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full bg-[#D92F4E] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#b92742] transition-all duration-300 disabled:opacity-60 cursor-pointer"
        >
            {loading ? "در حال افزودن..." : added ? "✓ اضافه شد" : "افزودن به سبد خرید"}
        </button>
    )
}