'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { Wallet, Menu } from 'lucide-react'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'

export function Navbar() {
    const pathname = usePathname()
    const { open } = useAppKit()
    const { address, isConnected } = useAppKitAccount()

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Portfolio', href: '/assets' },
        { name: 'Collaboration', href: '/collaboration' },
        { name: 'Governance', href: '/governance' },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 glass border-b-0">
            <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:opacity-80 transition-opacity">ROBOIP</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-white' : 'text-muted-foreground'}`}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </div>

                {/* Actions */}
                <div className="flex gap-4 items-center">
                    <Button
                        variant="ghost"
                        className="hover:text-primary rounded-full hidden md:flex"
                        onClick={() => open()}
                    >
                        <Wallet className="w-4 h-4 mr-2" />
                        {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect'}
                    </Button>

                    <Link href="/upload">
                        <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold">
                            Create Asset
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </nav>
    )
}
