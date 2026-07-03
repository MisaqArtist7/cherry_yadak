import { Metadata } from "next"
export const metadata : Metadata = {
    title: 'دیجی کالا - پنل ادمین',
    description: 'توضیحات'
}
export default function AdminLayout({ children, } : Readonly<{children : React.ReactNode}>) {
    return (
        <main>
            {children}
        </main>
    )
}
