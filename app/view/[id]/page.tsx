'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Play, Pause, Download, Share2, Shield, Activity, RefreshCw, Layers, Monitor, FileJson } from 'lucide-react'
import Link from 'next/link'

export default function AssetView({ params }: { params: { id: string } }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [activeTab, setActiveTab] = useState('motion')

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">

                {/* Left Sidebar: Metadata */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-6 rounded-3xl space-y-6">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight mb-1">Kung Fu Kick A</h2>
                            <p className="text-xs text-muted-foreground font-mono">ID: {params.id}</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase mb-1">Status</p>
                                <Badge variant="outline" className="border-secondary text-secondary bg-secondary/10">Protected IP-NFT</Badge>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground uppercase mb-1">Creator</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary" />
                                    <span className="text-sm font-medium">0x84...9a2</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground uppercase mb-1">Mint Data</p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="glass p-2 rounded">
                                        <span className="block text-xs text-muted-foreground">FPS</span>
                                        60
                                    </div>
                                    <div className="glass p-2 rounded">
                                        <span className="block text-xs text-muted-foreground">Bones</span>
                                        52
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-3">
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-xs justify-start h-8">
                                <Shield className="w-3 h-3 mr-2" /> View On-Chain Provenance
                            </Button>
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-xs justify-start h-8">
                                <FileJson className="w-3 h-3 mr-2" /> View AI Model Metadata
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Center: 3D Viewer & Tools */}
                <div className="lg:col-span-3 space-y-6">

                    {/* 3D Viewer Frame */}
                    <div className="glass rounded-3xl p-1 relative overflow-hidden group h-[500px]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent z-20 opacity-50"></div>

                        {/* Main Viewport */}
                        <div className="w-full h-full bg-black/60 rounded-[1.25rem] relative flex items-center justify-center overflow-hidden">
                            {/* Grid Floor */}
                            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)' }}></div>

                            {/* Skeleton Placeholder */}
                            <Activity className={`w-32 h-32 text-secondary z-10 ${isPlaying ? 'animate-bounce' : ''}`} />

                            {/* Controls Overlay */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full flex items-center gap-4 z-20">
                                <Button variant="ghost" size="icon" className="rounded-full hover:text-white" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                                </Button>
                                <div className="text-xs font-mono text-muted-foreground">00:04 / 00:15</div>
                            </div>

                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                <Button size="icon" variant="ghost" className="glass rounded-lg hover:bg-white/10"><Monitor className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" className="glass rounded-lg hover:bg-white/10"><Layers className="w-4 h-4" /></Button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs & Tools */}
                    <Tabs defaultValue="motion" className="w-full">
                        <TabsList className="bg-transparent border-b border-white/10 w-full justify-start h-12 p-0 rounded-none mb-6">
                            <TabsTrigger value="motion" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-6">Motion Data</TabsTrigger>
                            <TabsTrigger value="rig" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-6">Rig Variants</TabsTrigger>
                            <TabsTrigger value="license" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-6">Licensing</TabsTrigger>
                        </TabsList>

                        <TabsContent value="motion" className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* AI Tools */}
                                <div className="glass p-6 rounded-2xl">
                                    <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-secondary" /> AI Motion Tools</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                            <span className="text-sm">Clean Jitter / Foot Sliding</span>
                                            <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">Auto</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                                            <span className="text-sm">Motion Style Transfer</span>
                                            <Badge variant="outline" className="border-white/20">Beta</Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Download */}
                                <div className="glass p-6 rounded-2xl">
                                    <h3 className="font-bold mb-4 flex items-center gap-2"><Download className="w-4 h-4" /> Export Options</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="h-10 border-white/10 hover:bg-white/10 bg-transparent justify-between">
                                            FBX <span className="text-xs text-muted-foreground">Binary</span>
                                        </Button>
                                        <Button variant="outline" className="h-10 border-white/10 hover:bg-white/10 bg-transparent justify-between">
                                            GLB <span className="text-xs text-muted-foreground">Web</span>
                                        </Button>
                                        <Button variant="outline" className="h-10 border-white/10 hover:bg-white/10 bg-transparent justify-between">
                                            BVH <span className="text-xs text-muted-foreground">Legacy</span>
                                        </Button>
                                        <Button variant="outline" className="h-10 border-white/10 hover:bg-white/10 bg-transparent justify-between">
                                            USDZ <span className="text-xs text-muted-foreground">Apple</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="license">
                            <div className="glass p-8 rounded-2xl text-center">
                                <h3 className="text-xl font-bold mb-2">Commercial License</h3>
                                <p className="text-muted-foreground mb-6">License this IP for use in your game, film, or metaverse project.</p>
                                <Button size="lg" className="bg-gradient-to-r from-secondary to-primary text-white font-bold px-12">
                                    Purchase License (0.05 ETH)
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    )
}

function Sparkles(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M9 17v4" />
            <path d="M3 21h4" />
        </svg>
    )
}
