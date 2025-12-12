'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase, type MotionJob } from '@/lib/supabase'
import { Eye, Clock, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Shield, Search, Network, Briefcase } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { IpSearch } from '@/components/ip-search'
import { IpRadar } from '@/components/ip-radar'

export default function AssetsPage() {
  const [jobs, setJobs] = useState<MotionJob[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('portfolio')

  useEffect(() => {
    async function loadAssets() {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          // Mock data for demo if no user
          setJobs([
            { id: 1, video_filename: 'Dance_Routine_01.mp4', status: 'completed', created_at: new Date().toISOString(), user_id: 'mock' },
            { id: 2, video_filename: 'Fight_Combo_A.mov', status: 'processing', created_at: new Date().toISOString(), user_id: 'mock' }
          ])
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('motion_jobs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setJobs(data || [])
      } catch (error) {
        console.error('Error loading assets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAssets()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-secondary" />
      case 'processing': return <Clock className="h-5 w-5 text-primary animate-pulse" />
      case 'failed': return <AlertCircle className="h-5 w-5 text-destructive" />
      default: return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <Sparkles className="h-12 w-12 text-primary animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">My IP Portfolio</h1>
            <p className="text-muted-foreground">Manage your registered motion assets and revenue.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-white/10 hover:bg-white/10"><TrendingUp className="w-4 h-4 mr-2" /> Revenue</Button>
            <Link href="/upload"><Button className="bg-primary hover:bg-primary/90 text-white"><Sparkles className="w-4 h-4 mr-2" /> Create New</Button></Link>
          </div>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b border-white/10 w-full justify-start h-12 p-0 rounded-none">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-6">
              <Briefcase className="w-4 h-4 mr-2" /> My Assets
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-6">
              <Search className="w-4 h-4 mr-2" /> IP Search
            </TabsTrigger>
            <TabsTrigger value="radar" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-6">
              <Network className="w-4 h-4 mr-2" /> IP Radar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6 animate-in fade-in duration-500">
            {jobs.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center border-dashed border-2 border-white/10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Start Your IP Journey</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">Upload your first video to create a registered IP asset on Story Protocol.</p>
                <Link href="/upload"><Button size="lg" className="bg-primary hover:bg-primary/90">Create First Asset</Button></Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <Card key={job.id} className="glass border-white/10 hover:border-primary/50 transition-all duration-300 group">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className={`${job.status === 'completed' ? 'border-secondary text-secondary' : 'border-white/20'}`}>{job.status}</Badge>
                        {getStatusIcon(job.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="mb-1 truncate">{job.video_filename}</CardTitle>
                      <CardDescription className="mb-4 text-xs font-mono">{new Date(job.created_at).toLocaleDateString()}</CardDescription>

                      {job.status === 'completed' ? (
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center gap-3">
                            <Shield className="w-4 h-4 text-secondary" />
                            <div className="text-xs">
                              <span className="block text-muted-foreground">IP-NFT ID</span>
                              <span className="font-mono text-white">#8291...</span>
                            </div>
                          </div>
                          <Link href={`/view/${job.id}`}>
                            <Button className="w-full bg-white/5 hover:bg-white/10">Manage IP</Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary animate-progress-indeterminate" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="search">
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Global IP Registry</h2>
              <IpSearch />
            </div>
          </TabsContent>

          <TabsContent value="radar">
            <div className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">IP Graph Visualization</h2>
              <IpRadar />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
