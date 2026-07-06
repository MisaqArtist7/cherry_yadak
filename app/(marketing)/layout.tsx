import { Metadata } from 'next'
import HeaderComponent from '@/components/layout/Header/Header'
import FooterComponent from '@/components/layout/Footer/page'
export const metadata : Metadata = {
    title : 'فروشگاه پیشرو تک',
    description: 'توضیحات'
}

export default function HomeLayout({ children } : { children : Readonly<React.ReactNode> }) {
    return (
        <>
            <HeaderComponent />
            <main>{children}</main>
            <FooterComponent />
        </>
    )
}
