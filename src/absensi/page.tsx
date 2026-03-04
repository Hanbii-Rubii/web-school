"use client"

import { useEffect, useState } from "react"

export default function AbsensiPage() {
  const [kelas, setKelas] = useState("")
  const [mapel, setMapel] = useState("")
  const [siswa, setSiswa] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (kelas) {
      fetch(`/api/siswa?kelas=${kelas}`)
        .then(res => res.json())
        .then(data => {
          setSiswa(data.map(s => ({ ...s, status: "Hadir" })))
        })
    }
  }, [kelas])

  function handleStatusChange(index, value) {
    const updated = [...siswa]
    updated[index].status = value
    setSiswa(updated)
  }

  async function handleSave() {
    setLoading(true)

    await fetch("/api/absensi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kelas,
        mapel,
        guru: "Admin",
        data: siswa
      })
    })

    setLoading(false)
    alert("Absensi berhasil disimpan")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Absensi Live</h1>

      <div className="flex gap-4 mb-6">
        <input
          placeholder="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          placeholder="Mapel"
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {siswa.length > 0 && (
        <>
          <table className="w-full border">
            <thead>
              <tr className="bg-slate-200">
                <th className="p-2">No</th>
                <th>Nama</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {siswa.map((s, i) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.no}</td>
                  <td>{s.nama}</td>
                  <td>
                    <select
                      value={s.status}
                      onChange={(e) =>
                        handleStatusChange(i, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      <option>Hadir</option>
                      <option>Izin</option>
                      <option>Sakit</option>
                      <option>Alpha</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSave}
            className="mt-6 bg-slate-900 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Absensi"}
          </button>
        </>
      )}
    </div>
  )
}