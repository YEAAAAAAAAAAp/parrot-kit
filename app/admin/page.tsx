'use client'

import { useEffect, useState } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface AnalyticsData {
  summary: {
    totalEvents: number
    totalPageViews: number
    uniqueUsers: number
    uniqueSessions: number
    ctr: number
    cvr: number
  }
  topEvents: Array<{
    event_name: string
    event_category: string
    count: number
  }>
  eventsByDay: Array<{
    date: string
    count: number
  }>
  deviceBreakdown: Array<{
    device_type: string
    count: number
  }>
  browserBreakdown: Array<{
    browser: string
    count: number
  }>
  funnelData: Array<{
    step: string
    step_order: number
    sessions: number
    completed: number
  }>
  recentEvents: Array<{
    event_name: string
    event_category: string
    event_label: string | null
    page_path: string
    device_type: string
    created_at: string
  }>
  topPages: Array<{
    page_path: string
    views: number
    avg_duration: number | null
  }>
  referrerSources: Array<{
    source: string
    count: number
  }>
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(7)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [needsSetup, setNeedsSetup] = useState(false)
  const [setupMessage, setSetupMessage] = useState('')

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/analytics/stats?days=${days}`)
      const result = await response.json()
      
      if (result.needsSetup) {
        setNeedsSetup(true)
        setSetupMessage(result.message)
      }
      
      setData(result)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [days])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchData()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, days])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (needsSetup) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">데이터베이스 설정 필요</h1>
            <p className="text-gray-600">{setupMessage}</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">🚀 빠른 설정 가이드</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-blue-900 mb-2">1. Neon 데이터베이스 생성 (무료, 5분)</p>
                  <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                    <li>
                      <a href="https://console.neon.tech" target="_blank" rel="noopener noreferrer" 
                         className="underline hover:text-blue-600">
                        console.neon.tech
                      </a> 접속
                    </li>
                    <li>GitHub 계정으로 가입</li>
                    <li>새 프로젝트 생성</li>
                    <li>Connection String 복사</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-blue-900 mb-2">2. 환경 변수 설정</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs overflow-x-auto">
                    <p className="text-gray-400"># .env.local 파일에 추가</p>
                    <p>DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-blue-900 mb-2">3. 데이터베이스 초기화</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs">
                    npm run setup:analytics
                  </div>
                </div>

                <div>
                  <p className="font-medium text-blue-900 mb-2">4. 서버 재시작</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs">
                    npm run dev
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a 
                href="https://console.neon.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Neon 시작하기 →
              </a>
              <a 
                href="/DATABASE_SETUP.md" 
                target="_blank"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                자세한 가이드
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Failed to load analytics data</p>
      </div>
    )
  }

  // Chart data preparations
  const eventsChartData = {
    labels: data.eventsByDay.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Events',
        data: data.eventsByDay.map(d => d.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const deviceChartData = {
    labels: data.deviceBreakdown.map(d => d.device_type),
    datasets: [
      {
        data: data.deviceBreakdown.map(d => d.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)'
        ]
      }
    ]
  }

  const browserChartData = {
    labels: data.browserBreakdown.map(d => d.browser),
    datasets: [
      {
        label: 'Sessions',
        data: data.browserBreakdown.map(d => d.count),
        backgroundColor: 'rgba(139, 92, 246, 0.8)'
      }
    ]
  }

  const referrerChartData = {
    labels: data.referrerSources.map(d => d.source),
    datasets: [
      {
        data: data.referrerSources.map(d => d.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your landing page performance</p>
            </div>
            <div className="flex gap-4 items-center">
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>Last 24 hours</option>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-600">Auto-refresh</span>
              </label>
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{data.summary.totalEvents.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-600">Page Views</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{data.summary.totalPageViews.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-600">Unique Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{data.summary.uniqueUsers.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-600">Sessions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{data.summary.uniqueSessions.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-600">CTR</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{data.summary.ctr}%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-600">CVR</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{data.summary.cvr}%</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Events Over Time */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Events Over Time</h2>
            <Line data={eventsChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          {/* Device Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Device Breakdown</h2>
            <Pie data={deviceChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          {/* Browser Distribution */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Browser Distribution</h2>
            <Bar data={browserChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>

          {/* Traffic Sources */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Traffic Sources</h2>
            <Pie data={referrerChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Events */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm text-gray-600">Event</th>
                    <th className="text-left py-2 text-sm text-gray-600">Category</th>
                    <th className="text-right py-2 text-sm text-gray-600">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topEvents.map((event, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 text-sm">{event.event_name}</td>
                      <td className="py-2 text-sm text-gray-600">{event.event_category}</td>
                      <td className="py-2 text-sm text-right font-semibold">{event.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Pages</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm text-gray-600">Page</th>
                    <th className="text-right py-2 text-sm text-gray-600">Views</th>
                    <th className="text-right py-2 text-sm text-gray-600">Avg Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPages.map((page, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 text-sm">{page.page_path}</td>
                      <td className="py-2 text-sm text-right font-semibold">{page.views}</td>
                      <td className="py-2 text-sm text-right text-gray-600">
                        {page.avg_duration ? `${Math.round(page.avg_duration)}s` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        {data.funnelData.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Conversion Funnel</h2>
            <div className="space-y-4">
              {data.funnelData.map((step, idx) => {
                const conversionRate = step.sessions > 0 
                  ? ((step.completed / step.sessions) * 100).toFixed(1)
                  : 0
                const dropOffRate = idx > 0 && data.funnelData[idx - 1]
                  ? (((data.funnelData[idx - 1].sessions - step.sessions) / data.funnelData[idx - 1].sessions) * 100).toFixed(1)
                  : 0

                return (
                  <div key={idx} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                          {step.step_order}
                        </span>
                        <span className="font-medium">{step.step}</span>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <span className="text-gray-600">
                          {step.sessions.toLocaleString()} sessions
                        </span>
                        <span className="text-green-600 font-semibold">
                          {conversionRate}% completed
                        </span>
                        {idx > 0 && (
                          <span className="text-red-600">
                            {dropOffRate}% drop-off
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${conversionRate}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recent Events */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm text-gray-600">Time</th>
                  <th className="text-left py-2 text-sm text-gray-600">Event</th>
                  <th className="text-left py-2 text-sm text-gray-600">Category</th>
                  <th className="text-left py-2 text-sm text-gray-600">Label</th>
                  <th className="text-left py-2 text-sm text-gray-600">Page</th>
                  <th className="text-left py-2 text-sm text-gray-600">Device</th>
                </tr>
              </thead>
              <tbody>
                {data.recentEvents.map((event, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 text-xs text-gray-600">
                      {new Date(event.created_at).toLocaleString()}
                    </td>
                    <td className="py-2 text-sm font-medium">{event.event_name}</td>
                    <td className="py-2 text-sm text-gray-600">{event.event_category}</td>
                    <td className="py-2 text-sm text-gray-600">{event.event_label || '-'}</td>
                    <td className="py-2 text-xs text-gray-600">{event.page_path}</td>
                    <td className="py-2 text-xs text-gray-600">{event.device_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
