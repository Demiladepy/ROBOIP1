'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Activity, Zap, Box, ArrowRight, Play } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden font-sans text-foreground">
      {/* Background Glows handled by globals.css body style */}

      {/* Background Glows handled by globals.css body style */}
      {/* Navbar handled in layout.tsx */}


      <main className="container mx-auto px-4 pt-32 pb-20 max-w-7xl relative z-10">

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-xs font-medium text-primary">
              <Zap className="w-3 h-3" />
              <span>AI-Powered Motion Capture</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight">
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                Movement Into IP
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Extract professional motion data from video, refine with AI, and mint as liquid IP-NFTs on Story Protocol.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/upload">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(94,85,255,0.4)] transition-all hover:scale-105">
                  <Upload className="mr-2 w-5 h-5" />
                  Upload Video
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg glass border-white/10 hover:bg-white/10">
                  <Play className="mr-2 w-5 h-5" />
                  Explore Market
                </Button>
              </Link>
            </div>
          </div>

          {/* 3D Visual Placeholder / Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="glass rounded-2xl p-6 relative overflow-hidden min-h-[500px] flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

              {/* Fake 3D Viewer UI */}
              <div className="flex-1 bg-black/40 rounded-xl mb-4 relative flex items-center justify-center overflow-hidden border border-white/5">
                <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-20">
                  {[...Array(400)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/10" />
                  ))}
                </div>
                {/* Skeleton Proxy (Text/Icon for now) */}
                <div className="relative z-10 text-center space-y-4">
                  <Activity className="w-24 h-24 text-primary mx-auto animate-pulse" />
                  <p className="text-xs text-secondary tracking-widest uppercase">AI Rigging Active</p>
                </div>
              </div>

              {/* Dashboard Metrics - Floating Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Motion Assets</p>
                  <p className="text-2xl font-bold">1,204</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Total Royalties</p>
                  <p className="text-2xl font-bold text-secondary">42.5 ETH</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions / Features Grid */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            { title: "AI Extraction", icon: Zap, desc: "Video-to-Motion without suits." },
            { title: "IP-NFT Minting", icon: Box, desc: "On-chain provenance via Story Protocol." },
            { title: "Monetization", icon: Activity, desc: "Automated licensing & royalties." }
          ].map((item, i) => (
            <div key={i} className="glass-hover glass p-8 rounded-2xl group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.desc}</p>
              <div className="flex items-center text-sm text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
  )
}
