'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { updateQuantity, removeFromCart } from '@/action/cart'

type CartItemCardProps = {
    item: {
        id: number
        productId: number
        quantity: number
        product: {
            title: string
            slug: string
            price: number
            discount: number
            images?: { url: string }[]
        }
    }
}

export default function CartItemCard({ item }: CartItemCardProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const discountedPrice = Math.round(
        item.product.price - (item.product.price * item.product.discount) / 100
    )

    async function handleIncrease() {
        setLoading(true)
        await updateQuantity(item.productId, item.quantity + 1)
        router.refresh()
        setLoading(false)
    }

    async function handleDecreaseOrRemove() {
        setLoading(true)
        if (item.quantity <= 1) {
            await removeFromCart(item.productId)
        } else {
            await updateQuantity(item.productId, item.quantity - 1)
        }
        router.refresh()
        setLoading(false)
    }

    async function handleRemove() {
        setLoading(true)
        await removeFromCart(item.productId)
        router.refresh()
        setLoading(false)
    }

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md/5 group relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                
                {/* تصویر محصول */}
                <div className="w-44 h-44 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-gray-100/50">
                    <Image 
                        src={item.product.images?.[0]?.url || "/images/products/placeholder.webp"} 
                        alt={item.product.title} 
                        width={111} 
                        height={111} 
                        className="object-cover mix-blend-multiply"
                    />
                </div>

                {/* جزئیات محصول */}
                <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 text-center sm:text-right">
                        <h4 className="font-bold text-lg leading-snug text-(--primaryColor)">
                            {item.product.title}
                        </h4>
                        <div className="flex flex-col sm:justify-start gap-x-4 gap-y-1 text-gray-500">
                            <span className="flex items-center gap-1">
                                کد محصول: <span className="font-mono text-gray-800">{item.product.slug}</span>
                            </span>
                        </div>
                    </div>

                    {/* قیمت و مدیریت تعداد */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-200 w-full sm:w-auto">
                        <div className="flex items-center gap-1.5 font-black text-xl text-[#D92F4E]">
                            <span>{discountedPrice.toLocaleString('fa-IR')}</span>
                            <svg className="w-4 h-4 text-gray-400 fill-current"><use href="#toman"></use></svg>
                        </div>

                        <div className="flex items-center bg-gray-100 border border-gray-200/60 rounded-full p-1 gap-2 shadow-inner">
                            <button
                                onClick={handleIncrease}
                                disabled={loading}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-600 hover:bg-[#D92F4E] hover:text-white hover:border-[#D92F4E] font-bold cursor-pointer transition shadow-sm active:scale-95 disabled:opacity-50"
                            >
                                <svg className='w-6 h-6 fill-current'>
                                    <use href='#plus'></use>
                                </svg>
                            </button>
                            
                            <span className="font-bold text-gray-900 min-w-5 text-center">
                                {item.quantity.toLocaleString('fa-IR')}
                            </span>
                            
                            <button
                                onClick={item.quantity <= 1 ? handleRemove : handleDecreaseOrRemove}
                                disabled={loading}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:text-[#D92F4E] hover:bg-red-50 hover:border-red-100 cursor-pointer transition shadow-sm active:scale-95 disabled:opacity-50"
                            >
                                <svg className='w-6 h-6 fill-current'>
                                    <use href='#trash'></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}