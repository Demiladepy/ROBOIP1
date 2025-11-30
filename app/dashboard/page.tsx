'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, Eye, Download, Award, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'

interface DashboardStats {
  totalAssets: number
  totalRevenue: number
  totalViews: number
  totalLicenses: number
  pendingRoyalties: number
  topAsset: any
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAssets: 0,
    totalRevenue: 0,
    totalViews: 0,
    totalLicenses: 0,
    pendingRoyalties: 0,
    topAsset: null
  })
  const [loading, setLoading] = useState(true)
  const [recentSales, setRecentSales] = useState<any[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  async function loadDashboardData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: ipAssets } = await supabase
        .from('ip_assets')
        .select('*, asset_analytics(*)')
        .eq('user_id', user.id)

      const { data: royalties } = await supabase
        .from('royalty_payments')
        .select('amount')
        .eq('user_id', user.id)
        .eq('claimed', false)

      const { data: sales } = await supabase
        .from('license_sales')
        .select('*, ip_assets(*)')
        .order('created_at', { ascending: false })
        .limit(5)

      const totalRevenue = ipAssets?.reduce((sum, asset) => sum + Number(asset.total_revenue), 0) || 0
      const totalViews = ipAssets?.reduce((sum, asset) => {
        const analytics = asset.asset_analytics?.[0]
        return sum + (analytics?.view_count || 0)
      }, 0) || 0
      const totalLicenses = ipAssets?.reduce((sum, asset) => sum + asset.total_licenses_issued, 0) || 0
      const pendingRoyalties = royalties?.reduce((sum, r) => sum + Number(r.amount), 0) || 0

      const topAsset = ipAssets?.sort((a, b) => Number(b.total_revenue) - Number(a.total_revenue))[0]

      setStats({
        totalAssets: ipAssets?.length || 0,
        totalRevenue,
        totalViews,
        totalLicenses,
        pendingRoyalties,
        topAsset
      })

      setRecentSales(sales || [])
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 text-blue-400 animate-pulse mx-auto" />
          <p className="text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Revenue Dashboard
          </h1>
          <p className="text-slate-400">Track your ROBOIP earnings and performance</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400 font-medium">Total Revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stats.totalRevenue.toFixed(4)}
                  </div>
                  <div className="text-sm text-slate-400">ETH</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border-emerald-500/20 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400 font-medium">Active IP Assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.totalAssets}</div>
                  <div className="text-sm text-slate-400">Registered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-purple-500/20 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400 font-medium">Total Views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.totalViews}</div>
                  <div className="text-sm text-slate-400">Impressions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20 backdrop-blur-xl">
            <CardHeader className="pb-3">
              <CardDescription className="text-slate-400 font-medium">Licenses Sold</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.totalLicenses}</div>
                  <div className="text-sm text-slate-400">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {stats.pendingRoyalties > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border-emerald-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                Pending Royalties
              </CardTitle>
              <CardDescription className="text-slate-300">
                You have unclaimed royalty payments ready to collect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {stats.pendingRoyalties.toFixed(4)} ETH
                  </div>
                  <p className="text-sm text-slate-400">Click to claim your earnings</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all">
                  Claim Now
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent License Sales</CardTitle>
              <CardDescription className="text-slate-400">
                Latest transactions from your IP assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentSales.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Download className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No sales yet. Share your assets to start earning!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <div className="font-medium text-white mb-1">
                          {sale.buyer_address.slice(0, 6)}...{sale.buyer_address.slice(-4)}
                        </div>
                        <div className="text-sm text-slate-400">
                          {new Date(sale.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-400">
                          +{sale.amount_paid} {sale.currency}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {sale.license_type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Top Performing Asset</CardTitle>
              <CardDescription className="text-slate-400">
                Your highest earning motion capture asset
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.topAsset ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white text-lg mb-1">
                        Asset #{stats.topAsset.nft_token_id}
                      </div>
                      <div className="text-sm text-slate-400">
                        {stats.topAsset.total_licenses_issued} licenses sold
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Revenue</span>
                      <span className="text-white font-semibold">
                        {Number(stats.topAsset.total_revenue).toFixed(4)} ETH
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      {stats.topAsset.commercial_use ? 'Commercial License' : 'Personal Use'}
                    </Badge>
                    <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {stats.topAsset.commercial_rev_share}% Revenue Share
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No assets yet. Create your first IP asset to start tracking!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
