"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function RekapAbsensi() {
  const [kelas, setKelas] = useState("")
  const [bulan, setBulan] = useState("")
  const [tahun, setTahun] = useState("")
  const [data, setData] = useState<any>(null)

  async function handleLoad() {
    const res = await fetch(
      `/api/rekap-absensi?kelas=${kelas}&bulan=${bulan}&tahun=${tahun}`
    )
    const json = await res.json()
    setData(json)
  }

  function exportPDF() {
    const doc = new jsPDF()

    // Logo sekolah (harus base64)
    const logo = "/logo.png" // simpan di public/logo.png

    doc.addImage(logo, "PNG", 14, 10, 25, 25)

    doc.setFontSize(14)
    doc.text("SMKN 1 KAPUAS MURUNG", 105, 20, { align: "center" })

    doc.setFontSize(10)
    doc.text(
      "Jl. Trans Palingkau, KM 1 Kec. Kapuas Murung, KP 73525",
      105,
      26,
      { align: "center" }
    )

    doc.text(
      `Rekap Absensi Bulan ${bulan}/${tahun} - Kelas ${kelas}`,
      105,
      35,
      { align: "center" }
    )

    const rows = Object.entries(data).map(([nama, val]: any) => [
      nama,
      val.Hadir,
      val.Izin,
      val.Sakit,
      val.Alpha
    ])

    autoTable(doc, {
      startY: 45,
      head: [["Nama", "Hadir", "Izin", "Sakit", "Alpha"]],
      body: rows
    })

    doc.text("Guru Mapel,", 150, doc.lastAutoTable.finalY + 20)
    doc.text("__________________", 140, doc.lastAutoTable.finalY + 35)

    doc.text(
      "www.yefriharyanto.id",
      105,
      290,
      { align: "center" }
    )

    doc.save("Rekap-Absensi.pdf")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Rekap Absensi Bulanan
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          placeholder="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Bulan (1-12)"
          value={bulan}
          onChange={(e) => setBulan(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Tahun"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleLoad}
          className="bg-slate-900 text-white px-4 rounded"
        >
          Load
        </button>
      </div>

      {data && (
        <>
          <table className="w-full border mb-6">
            <thead className="bg-slate-200">
              <tr>
                <th>Nama</th>
                <th>Hadir</th>
                <th>Izin</th>
                <th>Sakit</th>
                <th>Alpha</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([nama, val]: any) => (
                <tr key={nama} className="border-t">
                  <td>{nama}</td>
                  <td>{val.Hadir}</td>
                  <td>{val.Izin}</td>
                  <td>{val.Sakit}</td>
                  <td>{val.Alpha}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={exportPDF}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Export PDF
          </button>
        </>
      )}
    </div>
  )
}