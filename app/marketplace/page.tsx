'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ShoppingCart, Play, Circle } from 'lucide-react'

const MOCK_ASSETS = [
    { id: '1', title: 'Capoeira Spin Kick', creator: 'MocapPro', price: '0.05 ETH', type: 'Combat', likes: 124 },
    { id: '2', title: 'Idle Breathing A', creator: 'AnimStding', price: '0.01 ETH', type: 'Idle', likes: 89 },
    { id: '3', title: 'Hip Hop Routine 1', creator: 'DanceLab', price: '0.12 ETH', type: 'Dance', likes: 432 },
    { id: '4', title: 'Zombie Walk', creator: 'HorrorFX', price: '0.03 ETH', type: 'Cinematic', likes: 56 },
    { id: '5', title: 'Sword Slash Combo', creator: 'MocapPro', price: '0.08 ETH', type: 'Combat', likes: 210 },
    { id: '6', title: 'Parkour Vault', creator: 'UrbanMove', price: '0.06 ETH', type: 'Sports', likes: 112 },
]

export default function MarketplacePage() {
    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-6">

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Motion Marketplace</h1>
                        <p className="text-muted-foreground">Discover and license professional IP-NFT motion assets.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative group w-full md:w-80">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative flex items-center bg-black/50 rounded-lg p-1 border border-white/10">
                                <Search className="w-5 h-5 text-muted-foreground ml-3" />
                                <Input className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/50" placeholder="Search movements..." />
                            </div>
                        </div>
                        <Button variant="outline" className="glass border-white/10"><Filter className="w-4 h-4" /></Button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {['All', 'Combat', 'Dance', 'Idle', 'Cinematic', 'Sports', 'Creature'].map((cat, i) => (
                        <Button
                            key={cat}
                            variant={i === 0 ? 'default' : 'outline'}
                            className={`rounded-full px-6 ${i === 0 ? 'bg-primary text-white hover:bg-primary/90' : 'glass border-white/10 hover:bg-white/10'}`}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MOCK_ASSETS.map((asset) => (
                        <Link href={`/view/${asset.id}`} key={asset.id} className="group">
                            <div className="glass rounded-2xl p-0 overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(94,85,255,0.2)]">

                                {/* Preview Image / Placeholder */}
                                <div className="h-64 bg-black/40 relative flex items-center justify-center group-hover:bg-black/30 transition-colors">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>

                                    {/* Floating Play Button on Hover */}
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 ring-1 ring-white/50 z-20">
                                        <Play className="w-5 h-5 text-white ml-1" />
                                    </div>

                                    {/* Simple Skeleton Graphic */}
                                    <svg className="w-32 h-32 text-primary/20 group-hover:text-primary/40 transition-colors absolute" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="4" r="2" />
                                        <path d="M12 4v7M12 11h-3M12 11h3M12 11v7M12 18l-2 3M12 18l2 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>

                                    <div className="absolute top-3 right-3 z-20">
                                        <Badge className="glass border-white/10 text-xs backdrop-blur-md">{asset.type}</Badge>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 relative z-20 -mt-12">
                                    <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-primary transition-colors">{asset.title}</h3>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm text-muted-foreground hover:text-secondary cursor-pointer">@{asset.creator}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground mb-1">License</p>
                                            <p className="font-bold text-secondary">{asset.price}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}
