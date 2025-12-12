'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Vote, Wallet, ArrowUpRight, Plus, Droplets, Users } from 'lucide-react'

export default function GovernancePage() {
    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Motion DAO & Economy</h1>
                        <p className="text-muted-foreground">Governed by the community. Powered by Motion Pools.</p>
                    </div>
                    <Button className="rounded-full bg-secondary text-black hover:bg-secondary/90 font-bold">
                        <Wallet className="w-4 h-4 mr-2" /> Connect Governance Wallet
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="glass border-white/10">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/10 rounded-xl"><Droplets className="w-6 h-6 text-primary" /></div>
                                <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">+12.5%</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">Total Value Locked</p>
                            <h2 className="text-3xl font-bold">$4,291,042</h2>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/10">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary/10 rounded-xl"><Vote className="w-6 h-6 text-secondary" /></div>
                                <Badge variant="outline" className="border-white/20">Active</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">Active Proposals</p>
                            <h2 className="text-3xl font-bold">8</h2>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/10">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-pink-500/10 rounded-xl"><Users className="w-6 h-6 text-pink-500" /></div>
                                <Badge variant="outline" className="border-white/20">Global</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">DAO Members</p>
                            <h2 className="text-3xl font-bold">12,405</h2>
                        </CardContent>
                    </Card>
                </div>

                {/* Motion Pools Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Motion Pools (Royalty Baskets)</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'Combat Motion Pool', apy: '18%', tvl: '$1.2M', risk: 'Medium' },
                            { name: 'Dance Trends V2', apy: '42%', tvl: '$850K', risk: 'High' },
                            { name: 'Standard Locomotion', apy: '5%', tvl: '$2.1M', risk: 'Low' },
                        ].map((pool, i) => (
                            <div key={i} className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>
                                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10"><ArrowUpRight className="w-4 h-4" /></Button>
                                </div>
                                <h3 className="font-bold text-lg mb-1">{pool.name}</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">APY {pool.apy}</Badge>
                                    <span className="text-xs text-muted-foreground">TVL {pool.tvl}</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full p-1 flex">
                                    <div className="flex-1 text-center text-xs py-2 rounded-full bg-white/10 font-bold hover:bg-white/20 transition-colors">Stake</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Governance Proposals */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Recent Proposals</h2>
                        <Button variant="outline" className="glass border-white/10"><Plus className="w-4 h-4 mr-2" /> New Proposal</Button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { id: 'RPC-102', title: 'Allocate 50 ETH to AI Model R&D', status: 'Passing', votes: '1.2M' },
                            { id: 'RPC-101', title: 'Integration with Unreal Engine 5 Plugin', status: 'Executed', votes: '3.5M' },
                            { id: 'RPC-100', title: 'Adjust Royalty Fees for "Dance" Pool', status: 'Failed', votes: '400K' },
                        ].map((prop, i) => (
                            <div key={i} className="glass p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-mono text-muted-foreground">#{prop.id}</span>
                                    <div>
                                        <h4 className="font-bold">{prop.title}</h4>
                                        <span className="text-xs text-muted-foreground">Votes: {prop.votes}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline" className={`
                          ${prop.status === 'Passing' ? 'border-green-500 text-green-500' : ''}
                          ${prop.status === 'Executed' ? 'border-secondary text-secondary' : ''}
                          ${prop.status === 'Failed' ? 'border-destructive text-destructive' : ''}
                       `}>{prop.status}</Badge>
                                    <Button size="sm" variant="ghost">Vote</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
