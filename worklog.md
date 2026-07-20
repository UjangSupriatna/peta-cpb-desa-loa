---
Task ID: 1
Agent: Main
Task: Create CPB (Calon Penerima Bantuan) distribution map for Desa Loa, Kec. Paseh, Kab. Bandung

Work Log:
- Installed leaflet, react-leaflet, @types/leaflet packages
- Created `/src/components/cpb-map.tsx` - client component with Leaflet map, 20 data points, custom markers (green for LOLOS, yellow for PENGGANTI)
- Updated `/src/app/page.tsx` - added 'use client', dynamic import with ssr:false, header, stats cards, map, filter/search, data table, footer
- Fixed coordinates: 8 entries had missing negative signs for latitude (Bandung is southern hemisphere)
- Added popup info for each marker showing NIK, alamat, desa, kecamatan, tahap, tanggal
- Added filter buttons (SEMUA/LOLOS/PENGGANTI), search by nama/alamat, legend, stats cards
- Added responsive data table below map
- Verified with Agent Browser: page renders, filters work, search works, no errors

Stage Summary:
- 20 CPB markers plotted on OpenStreetMap via Leaflet
- 8 LOLOS (green markers) + 12 PENGGANTI (yellow markers)
- Interactive filter & search functionality verified
- All marker popups display complete data
- Sticky footer and responsive layout confirmed