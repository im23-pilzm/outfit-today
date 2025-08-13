"use client"
import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ClientLayout({ children }) {
    const excludedPaths = ['/', '/login', '/register']
    const pathname = usePathname()
    const showHeader = !excludedPaths.includes(pathname)

    return (
        <>
            {showHeader && <Header />}
            <main className={showHeader ? 'pt-16' : ''}>
                {children}
            </main>
        </>
    )
}