'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Eye, Database, Cloud, Sparkles, TrendingUp, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Powered by Story Protocol & AI</span>
          </div>

          <h1 className="text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              ROBO<span className="text-white">IP</span>
            </span>
          </h1>

          <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Turn your videos into valuable <span className="text-cyan-400 font-semibold">IP assets</span>.
            Extract motion data, register on-chain, and <span className="text-emerald-400 font-semibold">earn revenue</span> from licensing.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400">Story Protocol Integrated</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-400">AI-Powered Analytics</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="relative group bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20 backdrop-blur-xl hover:border-blue-400/50 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Create IP Asset</CardTitle>
              <CardDescription className="text-slate-300 text-base">
                Upload video, extract motion data, and automatically register as IP-NFT on Story Protocol
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Link href="/upload">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold" size="lg">
                  Start Creating
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative group bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border-emerald-500/20 backdrop-blur-xl hover:border-emerald-400/50 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Monetize & Track</CardTitle>
              <CardDescription className="text-slate-300 text-base">
                View your IP portfolio, set licensing terms, and track revenue from your motion assets
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Link href="/assets">
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold" size="lg">
                  View Portfolio
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">AI Extraction</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Advanced AI extracts professional motion capture data from any video
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">IP Protection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Story Protocol registers your motion data as verifiable IP-NFT assets
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Cloud className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">IPFS Forever</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Decentralized storage ensures permanent availability of your assets
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Earn Revenue</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              License your motion data and earn royalties automatically via smart contracts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
