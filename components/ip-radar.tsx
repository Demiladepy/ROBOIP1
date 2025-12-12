'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function IpRadar() {
    const [selectedNode, setSelectedNode] = useState<any>(null)

    // Mock data for the graph
    const nodes = [
        { id: 1, label: 'Origin: Martial Arts Pack', type: 'Parent', x: 50, y: 50 },
        { id: 2, label: 'Game: Ninja Warrior', type: 'Derivative', x: 20, y: 80 },
        { id: 3, label: 'VR Training', type: 'Derivative', x: 80, y: 80 },
        { id: 4, label: 'Movie: Action Scene', type: 'Derivative', x: 50, y: 20 },
        { id: 5, label: 'Remix: Dance Ver.', type: 'Derivative', x: 85, y: 40 },
    ]

    const links = [
        { source: 1, target: 2 },
        { source: 1, target: 3 },
        { source: 1, target: 4 },
        { source: 3, target: 5 },
    ]

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            <div className="lg:col-span-2 relative bg-slate-950 rounded-xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />

                {/* Simple SVG Visualization */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Links */}
                    {links.map((link, i) => {
                        const source = nodes.find(n => n.id === link.source)!
                        const target = nodes.find(n => n.id === link.target)!
                        return (
                            <line
                                key={i}
                                x1={source.x} y1={source.y}
                                x2={target.x} y2={target.y}
                                stroke="rgba(6, 182, 212, 0.3)"
                                strokeWidth="0.5"
                            />
                        )
                    })}

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <g
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={node.type === 'Parent' ? 3 : 2}
                                fill={node.type === 'Parent' ? '#06b6d4' : '#8b5cf6'}
                                className="animate-pulse"
                            />
                            <text
                                x={node.x}
                                y={node.y + 5}
                                fontSize="3"
                                fill="rgba(255,255,255,0.7)"
                                textAnchor="middle"
                            >
                                {node.label}
                            </text>
                        </g>
                    ))}
                </svg>

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-slate-400">
                    Interactive IP Graph
                </div>
            </div>

            <Card className="bg-white/5 border-white/10 h-full">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Node Details</h3>
                    {selectedNode ? (
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-slate-500">Asset Name</span>
                                <p className="text-lg font-medium text-cyan-400">{selectedNode.label}</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-wider text-slate-500">Type</span>
                                <div className="mt-1">
                                    <Badge variant={selectedNode.type === 'Parent' ? 'default' : 'secondary'}>
                                        {selectedNode.type}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-wider text-slate-500">Relationships</span>
                                <p className="text-slate-300 text-sm mt-1">
                                    {selectedNode.type === 'Parent'
                                        ? '3 Derivatives found'
                                        : 'Derived from Martial Arts Pack'}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <span className="text-xs uppercase tracking-wider text-slate-500">Revenue Stream</span>
                                <div className="flex items-end gap-2 mt-1">
                                    <span className="text-2xl font-bold text-emerald-400">
                                        {selectedNode.type === 'Parent' ? '2.4 ETH' : '0.8 ETH'}
                                    </span>
                                    <span className="text-sm text-slate-400 mb-1">Total Volume</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-10">
                            <p>Select a node to view IP details and provenance.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
