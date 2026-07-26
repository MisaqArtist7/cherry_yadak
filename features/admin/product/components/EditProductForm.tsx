"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { updateProduct } from "../services/update";

interface EditProductFormProps {
    product: {
        id: number;
        title: string;
        slug: string;
        price: number;
        discount: number;
        stock: number;
        description: string;
        images: { url: string }[];
        category: { name: string; slug: string };
        brand: { name: string; slug: string };
    };
    categories: { name: string; slug: string }[];
    brands: { name: string; slug: string }[];
}

export default function EditProductForm({ product, categories, brands }: EditProductFormProps) {
    const defaultImage = product.images.length > 0 ? product.images[0].url : "/images/admin.jpg";
    
    // استیت برای نگهداری آدرس پیش‌نمایش عکس
    const [previewImage, setPreviewImage] = useState<string>(defaultImage);

    const updateProductWithId = updateProduct.bind(null, product.id);

    // تابع هندل‌کننده تغییر فایل
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // ساخت یک URL موقت برای پیش‌نمایش تصویر انتخابی
            const objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);
        }
    };

    return (
        <div className="flex-1 bg-white shadow-sm shadow-gray-200/60 rounded-3xl p-8 border border-gray-100">
            <div className="mb-8 pb-4 border-b border-gray-50 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">ویرایش محصول: {product.title}</h1>
                <span className="font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-md">شناسه اسلاگ: {product.slug}</span>
            </div>
            
            <div className="max-w-4xl mx-auto">
                {/* اضافه شدن encType برای پشتیبانی از ارسال فایل */}
                <form action={updateProductWithId} encType="multipart/form-data" className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label className="block font-bold mb-2 text-gray-700">نام محصول</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={product.title}
                                placeholder="نام محصول را وارد کنید"
                                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">برند محصول</label>
                            <select
                                name="brand"
                                defaultValue={product.brand.slug}
                                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all appearance-none cursor-pointer font-medium"
                            >
                                {brands.map((b) => (
                                    <option key={b.slug} value={b.slug}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">قیمت (تومان)</label>
                            <input
                                type="number"
                                name="price"
                                defaultValue={product.price}
                                placeholder="قیمت جدید"
                                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">تخفیف (درصد)</label>
                            <input
                                type="number"
                                name="discount"
                                defaultValue={product.discount}
                                placeholder="میزان تخفیف"
                                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">دسته‌بندی</label>
                            <select 
                                name="category"
                                defaultValue={product.category.slug}
                                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all appearance-none cursor-pointer font-medium"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">موجودی انبار</label>
                            <input
                                type="number"
                                name="stock"
                                defaultValue={product.stock}
                                placeholder="تعداد موجودی"
                                className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {/* بخش آپلود و پیش‌نمایش تصویر */}
                    <div>
                        <label className="block font-bold mb-2 text-gray-700">تصویر محصول</label>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                            
                            {/* پیش‌نمایش تصویر (چه قبلی، چه جدید انتخابی) */}
                            <div className="relative h-32 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 text-center">
                                <Image 
                                    src={previewImage} 
                                    fill 
                                    className="object-cover" 
                                    alt="پیش‌نمایش عکس" 
                                />
                                <span className="absolute bottom-2 bg-black/60 text-white font-bold px-2 py-0.5 rounded-md backdrop-blur-xs text-xs">
                                    پیش‌نمایش
                                </span>
                            </div>

                            {/* باکس آپلود فایل */}
                            <label className="sm:col-span-3 border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center bg-gray-50/20 hover:bg-gray-50 hover:border-[#D92F4E]/40 transition-all cursor-pointer group">
                                <svg className="w-8 h-8 text-gray-400 group-hover:text-[#D92F4E] transition-colors mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-bold text-gray-500 group-hover:text-[#D92F4E] transition-colors text-sm">
                                    برای بارگذاری تصویر جدید کلیک کنید
                                </span>
                                
                                {/* اینپوت واقعی و مخفی فایل */}
                                <input 
                                    type="file" 
                                    name="image" 
                                    accept="image/*" 
                                    onChange={handleImageChange}
                                    className="hidden" 
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold mb-2 text-gray-700">توضیحات فنی و اجمالی</label>
                        <textarea
                            rows={5}
                            name="description"
                            defaultValue={product.description}
                            placeholder="مشخصات محصول..."
                            className="w-full border border-gray-200 bg-gray-50/30 rounded-xl p-3.5 outline-none focus:bg-white focus:border-[#D92F4E] focus:ring-4 focus:ring-[#D92F4E]/10 transition-all resize-none font-medium leading-6"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                        <Link 
                            href="/admin/products/manage-products"
                            className="px-6 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all cursor-pointer"
                        >
                            انصراف
                        </Link>
                        <button
                            type="submit"
                            className="bg-[#D92F4E] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#b92742] transition-all duration-300 shadow-lg shadow-[#D92F4E]/20 cursor-pointer"
                        >
                            ذخیره تغییرات محصول
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}