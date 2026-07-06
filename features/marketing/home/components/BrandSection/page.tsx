import Image from "next/image";

const brands = [
    { src: '/images/brands/dahua.webp', alt: 'Dahua' },
    { src: '/images/brands/briton.webp', alt: 'Briton' },
    { src: '/images/brands/Hikvision.webp', alt: 'Hikvision' },
    { src: '/images/brands/imou.webp', alt: 'Imou' },
    { src: '/images/brands/axis.webp', alt: 'Axis' },
    { src: '/images/brands/dahua.webp', alt: 'Dahua' },
];

export default function BrandsComponent() {
    return (
        <section className="py-12 bg-gray-50/50 antialiased">
            <div className="container mx-auto px-4">
                
                {/* هدر بخش برندها */}
                <div className="flex items-center justify-between  border-b border-gray-100 pb-4">
                    <div className='flex items-center justify-center gap-2'>
                        <span className="flex justify-center items-center h-4 w-4 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                        <h2 className="font-bold text-lg md:text-xl text-gray-950">
                            برندهای معروف                        
                        </h2>
                    </div>
                </div>

                {/* گرید لوگوی برندها */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
                    {brands.map((brand, index) => (
                        <div 
                            key={index} 
                            className="group flex justify-center items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100/70 hover:border-gray-200/80 hover:shadow-md/5 transition-all duration-300 cursor-pointer hover:-translate-y-1 active:scale-95"
                        >
                            <Image 
                                src={brand.src} 
                                alt={brand.alt} 
                                width={120} 
                                height={60} 
                                className="max-h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out" 
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}