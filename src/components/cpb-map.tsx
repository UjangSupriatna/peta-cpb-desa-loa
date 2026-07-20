'use client'

import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Status = 'LOLOS' | 'PENGGANTI'

interface CPBData {
  no: number
  nama: string
  jenisKelamin: string
  nik: string
  alamat: string
  desa: string
  kecamatan: string
  kabupaten: string
  status: Status
  tahap: string
  tanggal: string
  lat: number
  lng: number
}

const cpbData: CPBData[] = [
  {
    no: 1, nama: 'AAM', jenisKelamin: 'L', nik: '3204350610650002',
    alamat: 'KP LENGGO RT 002 RW 011', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'LOLOS', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.066851, lng: 107.78175572,
  },
  {
    no: 1, nama: 'ENGKUS', jenisKelamin: 'L', nik: '3204350408910001',
    alamat: 'KP TIISDINGIN RT 002 RW 006', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'LOLOS', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.078713, lng: 107.79092157,
  },
  {
    no: 1, nama: 'ENDANG SARGA', jenisKelamin: 'L', nik: '3204350911550003',
    alamat: 'KP TIISDINGIN RT 002 RW 006', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'LOLOS', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.078581, lng: 107.79086588,
  },
  {
    no: 1, nama: 'SARIFUDIN', jenisKelamin: 'L', nik: '3204352307940008',
    alamat: 'KP LOA RT 003 RW 010', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'LOLOS', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.074842, lng: 107.78680112,
  },
  {
    no: 1, nama: 'ADANG', jenisKelamin: 'L', nik: '3204364406880002',
    alamat: 'KP CICANAR RT 001 RW 012', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'LOLOS', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.072671, lng: 107.78005853,
  },
  {
    no: 1, nama: 'ANAH', jenisKelamin: 'P', nik: '3204354304480004',
    alamat: 'KP NENGENG RT 002 RW 004', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'LOLOS', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.089746, lng: 107.78740497,
  },
  {
    no: 1, nama: 'WAHYU WIBISANA', jenisKelamin: 'L', nik: '3204353112600001',
    alamat: 'LIMUS MANGGUNG RT 003 RW 008', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'LOLOS', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.096029, lng: 107.79009512,
  },
  {
    no: 2, nama: 'LALA RIJALDI', jenisKelamin: 'L', nik: '3204350202811001',
    alamat: 'KP. WALAHIR RT 003 RW 003', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.092021, lng: 107.79952,
  },
  {
    no: 2, nama: 'AHMAD', jenisKelamin: 'L', nik: '3204351702540001',
    alamat: 'KP CILOPANG RT 001 RW 003', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.082827, lng: 107.79446149,
  },
  {
    no: 2, nama: 'SURYATI', jenisKelamin: 'L', nik: '3204350901750002',
    alamat: 'KP LOA RT 001 RW 001', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.069955, lng: 107.78666422,
  },
  {
    no: 2, nama: 'DANA', jenisKelamin: 'L', nik: '3204352610750003',
    alamat: 'KP SUKA GEUNAH RT 001 RW 005', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.078217, lng: 107.788307,
  },
  {
    no: 2, nama: 'NURHAYATI', jenisKelamin: 'P', nik: '3204354805770008',
    alamat: 'KP CILOPANG RT 002 RW 007', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.084992, lng: 107.79690184,
  },
  {
    no: 2, nama: 'TARLAN', jenisKelamin: 'L', nik: '3204351808630003',
    alamat: 'KP CILOPANG RT 004 RW 007', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.08389357, lng: 107.79352781,
  },
  {
    no: 2, nama: 'ICAH', jenisKelamin: 'P', nik: '3204354107710061',
    alamat: 'SEMPAK RT 003 RW 005', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.07946427, lng: 107.78655359,
  },
  {
    no: 2, nama: 'ECIN', jenisKelamin: 'P', nik: '3204356010480002',
    alamat: 'KP BARUNAI RT 003 RW 004', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.09206867, lng: 107.7861298,
  },
  {
    no: 2, nama: 'NANANG BIN EME', jenisKelamin: 'L', nik: '3204351306810002',
    alamat: 'KP CICANAR RT 002 RW 012', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.08216628, lng: 107.78774828,
  },
  {
    no: 2, nama: 'CARMA DEDI', jenisKelamin: 'L', nik: '3204351207600004',
    alamat: 'KP CIDADAP RT 004 RW 005', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.08220894, lng: 107.7878089,
  },
  {
    no: 2, nama: 'UJANG JUJUN', jenisKelamin: 'L', nik: '3204350204580001',
    alamat: 'KP LOA RT 003 RW 002', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.07352899, lng: 107.7887455,
  },
  {
    no: 2, nama: 'JEJEN', jenisKelamin: 'L', nik: '3204350911570002',
    alamat: 'KP LOA RT 004 RW 002', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.07328823, lng: 107.78751693,
  },
  {
    no: 2, nama: 'SITI ZENAB', jenisKelamin: 'P', nik: '3204355308900002',
    alamat: 'KP. BABAKAN LOA RT 001 RW 001', desa: 'LOA', kecamatan: 'PASEH',
    kabupaten: 'BANDUNG', status: 'PENGGANTI', tahap: 'IV', tanggal: '10 Mei 2026',
    lat: -7.06784969, lng: 107.78490814,
  },
]

// Create custom icon
function createIcon(status: Status) {
  const color = status === 'LOLOS' ? '#22c55e' : '#eab308'
  const borderColor = status === 'LOLOS' ? '#16a34a' : '#ca8a04'

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 3px solid ${borderColor};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 15)
  }, [map, center])
  return null
}

interface Landmark {
  nama: string
  lat: number
  lng: number
}

const landmarks: Landmark[] = [
  { nama: 'TB MALANG SARI', lat: -7.0792397, lng: 107.7933744 },
  { nama: 'TB SUKA RIZKY', lat: -7.0960075, lng: 107.7625634 },
  { nama: 'TB RESYA PUTRA', lat: -7.129138, lng: 107.6184229 },
]

function createLandmarkIcon() {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: #3b82f6;
        border: 3px solid #2563eb;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })
}

function FitBounds() {
  const map = useMap()
  useEffect(() => {
    const allPoints = [
      ...cpbData.map(d => [d.lat, d.lng] as [number, number]),
      ...landmarks.map(l => [l.lat, l.lng] as [number, number]),
    ]
    const bounds = L.latLngBounds(allPoints)
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map])
  return null
}

export default function CPBMap() {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<'SEMUA' | Status>('SEMUA')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredData = cpbData.filter(item => {
    const matchStatus = filter === 'SEMUA' || item.status === filter
    const matchSearch = search === '' || 
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.alamat.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const lolosCount = cpbData.filter(d => d.status === 'LOLOS').length
  const penggantiCount = cpbData.filter(d => d.status === 'PENGGANTI').length

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-pulse text-muted-foreground text-lg">Memuat peta...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-sm text-muted-foreground font-medium">Total Penerima</div>
          <div className="text-3xl font-bold mt-1">{cpbData.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            Lolos
          </div>
          <div className="text-3xl font-bold mt-1 text-green-600">{lolosCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            Pengganti
          </div>
          <div className="text-3xl font-bold mt-1 text-yellow-600">{penggantiCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="text-sm text-muted-foreground font-medium">Tahap</div>
          <div className="text-3xl font-bold mt-1">IV</div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2">
          {(['SEMUA', 'LOLOS', 'PENGGANTI'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                filter === s
                  ? s === 'LOLOS'
                    ? 'bg-green-500 text-white border-green-600 shadow-md shadow-green-200'
                    : s === 'PENGGANTI'
                    ? 'bg-yellow-500 text-white border-yellow-600 shadow-md shadow-yellow-200'
                    : 'bg-gray-800 text-white border-gray-800 shadow-md shadow-gray-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Cari nama atau alamat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      {/* Map */}
      <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg" style={{ height: '520px' }}>
        <MapContainer
          center={[-7.079, 107.788]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds />
          {landmarks.map((lm, index) => (
            <Marker
              key={`landmark-${index}`}
              position={[lm.lat, lm.lng]}
              icon={createLandmarkIcon()}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div className="text-center py-1.5 px-3 rounded-t-lg bg-blue-500 text-white text-xs font-bold">
                    📍 LOKASI
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 text-base leading-tight">{lm.nama}</h3>
                    <p className="text-xs text-gray-500 mt-1">Desa Loa, Kec. Paseh</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          {filteredData.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={createIcon(item.status)}
            >
              <Popup>
                <div className="min-w-[220px]">
                  <div className={`text-center py-1 px-3 rounded-t-lg text-white text-xs font-bold ${
                    item.status === 'LOLOS' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {item.status === 'LOLOS' ? '✓ LOLOS' : '↻ PENGGANTI'}
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-bold text-gray-800 text-base leading-tight">{item.nama}</h3>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p><span className="font-semibold">NIK:</span> {item.nik}</p>
                      <p><span className="font-semibold">L/P:</span> {item.jenisKelamin}</p>
                      <p><span className="font-semibold">Alamat:</span> {item.alamat}</p>
                      <p><span className="font-semibold">Desa:</span> {item.desa}</p>
                      <p><span className="font-semibold">Kecamatan:</span> {item.kecamatan}</p>
                      <p><span className="font-semibold">Kabupaten:</span> {item.kabupaten}</p>
                      <p><span className="font-semibold">Tahap:</span> {item.tahap}</p>
                      <p><span className="font-semibold">Tanggal:</span> {item.tanggal}</p>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-3 z-[1000]">
          <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Legenda</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">Lolos ({lolosCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-yellow-600 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">Pengganti ({penggantiCount})</span>
            </div>
            <div className="border-t border-gray-200 mt-2 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-600 flex-shrink-0"></span>
                <span className="text-sm text-gray-700">Lokasi TB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Daftar CPB Desa Loa - Kec. Paseh</h3>
          <p className="text-xs text-muted-foreground">Tahap IV - 10 Mei 2026</p>
        </div>
        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-600 border-b">No</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600 border-b">Nama</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600 border-b hidden sm:table-cell">L/P</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600 border-b hidden md:table-cell">Alamat</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-600 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100"
                  onClick={() => {
                    // Trigger popup on map - we'll handle this with state
                  }}
                >
                  <td className="px-3 py-2 text-gray-500">{index + 1}</td>
                  <td className="px-3 py-2 font-medium text-gray-800">{item.nama}</td>
                  <td className="px-3 py-2 text-gray-600 hidden sm:table-cell">{item.jenisKelamin}</td>
                  <td className="px-3 py-2 text-gray-600 hidden md:table-cell text-xs">{item.alamat}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      item.status === 'LOLOS'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'LOLOS' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}