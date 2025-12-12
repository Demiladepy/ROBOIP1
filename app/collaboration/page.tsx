'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, MessageSquare, Users, Play, Settings, MousePointer2 } from 'lucide-react'
import Image from 'next/image'

export default function CollaborationPage() {
    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-6 overflow-hidden">

            {/* Header */}
            <div className="max-w-[1600px] mx-auto mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">Project: Neon Samurai Fight</h1>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary" />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-xs">+2</div>
                    </div>
                    <Button variant="outline" className="rounded-full glass h-8 text-xs border-white/10">Share</Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Settings className="w-5 h-5" /></Button>
                    <Button className="bg-primary text-white rounded-full">Export Project</Button>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto h-[calc(100vh-200px)] grid grid-cols-12 gap-6">

                {/* Left: Layers/Assets */}
                <div className="col-span-2 glass rounded-2xl p-4 flex flex-col">
                    <h3 className="font-bold mb-4 text-sm text-muted-foreground uppercase">Layers</h3>
                    <div className="space-y-2 flex-1">
                        {['Base Skeleton', 'IK Solvers', 'Refinement AI', 'Style Transfer'].map((layer, i) => (
                            <div key={i} className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer ${i === 0 ? 'bg-primary/20 border border-primary/30' : 'hover:bg-white/5'}`}>
                                <div className="w-2 h-2 rounded-full bg-secondary" />
                                <span className="text-sm">{layer}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center: Canvas / Viewport */}
                <div className="col-span-8 glass rounded-2xl p-1 relative group overflow-hidden bg-black/40">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Fake Cursor 1 */}
                    <div className="absolute top-1/3 left-1/3 flex flex-col items-start gap-1 animate-pulse">
                        <MousePointer2 className="w-5 h-5 text-secondary fill-secondary" />
                        <div className="bg-secondary text-black text-xs font-bold px-2 py-0.5 rounded-full">Alice_Dev</div>
                    </div>

                    {/* Fake Cursor 2 */}
                    <div className="absolute bottom-1/3 right-1/3 flex flex-col items-start gap-1">
                        <MousePointer2 className="w-5 h-5 text-pink-500 fill-pink-500" />
                        <div className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Animator_Bob</div>
                    </div>

                    {/* Central Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center opacity-50">
                            <Play className="w-16 h-16 mx-auto mb-4 text-white" />
                            <p className="text-sm font-mono">Real-time Sync Active</p>
                        </div>
                    </div>

                    {/* Timeline at bottom */}
                    <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>00:00</span>
                            <span>00:15</span>
                        </div>
                        <div className="w-full h-8 bg-black/50 rounded overflow-hidden relative">
                            <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-primary/30 border-r border-primary" />
                            <div className="absolute inset-y-0 left-1/3 w-0.5 bg-red-500 z-10" /> {/* Scrubber */}
                        </div>
                    </div>
                </div>

                {/* Right: Comments / Chat */}
                <div className="col-span-2 glass rounded-2xl p-4 flex flex-col">
                    <h3 className="font-bold mb-4 text-sm text-muted-foreground uppercase flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Team Chat
                    </h3>

                    <div className="flex-1 space-y-4 overflow-y-auto mb-4 custom-scrollbar">
                        {[
                            { user: 'Alice', msg: 'Adjusted the foot planting on frame 45.', time: '2m ago' },
                            { user: 'Bob', msg: 'Looks cleaner. Checking the hip rotation now.', time: '1m ago' },
                            { user: 'System', msg: 'New version v0.42 minted automatically.', time: 'Just now', type: 'system' }
                        ].map((chat, i) => (
                            <div key={i} className={`text-sm ${chat.type === 'system' ? 'text-secondary font-mono text-xs my-4 text-center' : ''}`}>
                                {chat.type !== 'system' && (
                                    <>
                                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                            <span className="font-bold text-white">{chat.user}</span>
                                            <span>{chat.time}</span>
                                        </div>
                                        <div className="bg-white/5 p-2 rounded-lg">
                                            {chat.msg}
                                        </div>
                                    </>
                                )}
                                {chat.type === 'system' && <span>✨ {chat.msg}</span>}
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <input type="text" placeholder="Type a message..." className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                    </div>
                </div>

            </div>
        </div>
    )
}
