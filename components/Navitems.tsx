'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Companions', path: '/companions' },
    { label: 'My Journey', path: '/my-journey' }
]
const Navitems = () => {
    const pathname = usePathname()
    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({ label, path }) => (
                <Link 
                href={path} 
                key={label}
                className={cn(pathname === path && 'text-primary font-bold')}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default Navitems
