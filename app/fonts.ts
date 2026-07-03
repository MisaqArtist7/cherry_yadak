import localFont from 'next/font/local'

export const iranYekan = localFont({
    src: [
        {
            path: './fonts/BYekan.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/BYekanBold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-iranYekan',
    display: 'swap',
})