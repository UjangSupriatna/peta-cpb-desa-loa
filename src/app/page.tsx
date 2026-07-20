'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, FileText } from 'lucide-react'

const CPBMap = dynamic(() => import('@/components/cpb-map'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
        <p className="text-muted-foreground text-sm">Memuat peta CPB...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                Sebaran Peta CPB
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Desa Loa, Kecamatan Paseh, Kabupaten Bandung
                </p>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
                  <FileText className="w-3 h-3 mr-1" />
                  Tahap IV
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <CPBMap />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <p className="text-xs text-muted-foreground text-center">
            Data CPB Desa Loa - Kecamatan Paseh - Kabupaten Bandung &bull; Tahap IV &bull; 10 Mei 2026
          </p>
        </div>
      </footer>
    </div>
  )
}