'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabase, type MotionJob } from '@/lib/supabase'
import { Eye, Clock, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Shield, DollarSign } from 'lucide-react'

export default function AssetsPage() {
  const [jobs, setJobs] = useState<MotionJob[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAssets() {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
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
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'processing':
        return 'secondary'
      case 'failed':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 text-blue-400 animate-pulse mx-auto" />
          <p className="text-slate-300">Loading your IP assets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-cyan-400" />
            <h1 className="text-5xl font-bold text-white">Your IP Portfolio</h1>
          </div>
          <p className="text-xl text-slate-300">
            Manage your registered motion capture IP assets and track earnings
          </p>

          <div className="flex gap-4 mt-6">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white">
                <TrendingUp className="mr-2 h-4 w-4" />
                Revenue Dashboard
              </Button>
            </Link>
            <Link href="/upload">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white">
                <Sparkles className="mr-2 h-4 w-4" />
                Create New IP
              </Button>
            </Link>
          </div>
        </div>

        {jobs.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6 text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Start Building Your IP Empire</h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                Upload your first video to create a registered IP asset and start earning from motion capture data
              </p>
              <Link href="/upload">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create First IP Asset
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="group bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {job.status === 'completed' && (
                          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                            <Shield className="h-4 w-4 text-emerald-400" />
                          </div>
                        )}
                        <CardTitle className="text-lg line-clamp-1 text-white">
                          {job.video_filename}
                        </CardTitle>
                      </div>
                      <CardDescription className="mt-1 text-slate-400">
                        {new Date(job.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {getStatusIcon(job.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={getStatusVariant(job.status)}
                      className={job.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}
                    >
                      {job.status}
                    </Badge>
                    {job.asset_id && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Asset #{job.asset_id}
                      </Badge>
                    )}
                  </div>

                  {job.status === 'completed' && (
                    <div className="space-y-2">
                      <Link href={`/view/${job.id}`}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white">
                          <Eye className="mr-2 h-4 w-4" />
                          View & Manage IP
                        </Button>
                      </Link>
                      {job.blockchain_tx && (
                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Registered on Story Protocol</span>
                        </div>
                      )}
                    </div>
                  )}

                  {job.status === 'processing' && (
                    <div className="text-sm text-blue-400 flex items-center gap-2">
                      <Clock className="h-4 w-4 animate-spin" />
                      <span>Creating IP asset...</span>
                    </div>
                  )}

                  {job.status === 'failed' && job.error_message && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <p className="text-sm text-red-400">
                        {job.error_message}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
