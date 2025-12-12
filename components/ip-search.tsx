'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, Tag, Zap, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function IpSearch() {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('all')

    const sampleResults = [
        { id: 1, title: 'Kung Fu High Kick', creator: '0x12..34', price: '0.05 ETH', type: 'Combat', license: 'Commercial' },
        { id: 2, title: 'Ballet Spin', creator: '0xAb..Cd', price: '0.02 ETH', type: 'Dance', license: 'Personal' },
        { id: 3, title: 'Zombie Walk', creator: '0x99..88', price: '0.08 ETH', type: 'Horror', license: 'Commercial' },
    ]

    const filtered = sampleResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (filter === 'all' || item.type === filter)
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                        placeholder="Search IP assets..."
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'Combat', 'Dance', 'Horror'].map(f => (
                        <Button
                            key={f}
                            variant={filter === f ? 'default' : 'outline'}
                            onClick={() => setFilter(f)}
                            className={filter === f ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-transparent border-white/10 hover:bg-white/5'}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                    <Card key={item.id} className="bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                                    {item.type}
                                </Badge>
                                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                                    {item.license}
                                </Badge>
                            </div>
                            <CardTitle className="text-white mt-2 group-hover:text-cyan-400 transition-colors">{item.title}</CardTitle>
                            <CardDescription className="text-slate-400">Creator: {item.creator}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center text-slate-300">
                                    <Zap className="h-4 w-4 mr-1 text-yellow-400" />
                                    <span>Verified IP</span>
                                </div>
                                <div className="flex items-center font-bold text-white">
                                    <DollarSign className="h-4 w-4 text-emerald-400" />
                                    {item.price}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
