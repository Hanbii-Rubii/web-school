"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function RankingPage() {
  const [kelas, setKelas] = useState("")
  const [data, setData] = useState<any[]>([])

  async function handleLoad() {
    const res = await fetch(`/api/ranking?kelas=${kelas}`)
    const json = await res.json()
    setData(json)
  }

  function exportPDF() {
    const doc = new jsPDF()

    doc.setFontSize(14)
    doc.text("SMKN 1 KAPUAS MURUNG", 105, 20, { align: "center" })

    doc.setFontSize(10)
    doc.text(
      "Jl. Trans Palingkau, KM 1 Kec. Kapuas Murung, KP 73525",
      105,
      26,
      { align: "center" }
    )

    doc.text(`Ranking Nilai Kelas ${kelas}`, 105, 35, { align: "center" })

    const rows = data.map((s, i) => [
      i + 1,
      s.nama,
      s.rata
    ])

    autoTable(doc, {
      startY: 45,
      head: [["Rank", "Nama", "Rata-rata"]],
      body: rows
    })

    doc.text(
      "www.yefriharyanto.id",
      105,
      290,
      { align: "center" }
    )

    doc.save("Ranking-Nilai.pdf")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Ranking Otomatis Nilai
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          placeholder="Kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleLoad}
          className="bg-slate-900 text-white px-4 rounded"
        >
          Load
        </button>
      </div>

      {data.length > 0 && (
        <>
          <table className="w-full border mb-6">
            <thead className="bg-slate-200">
              <tr>
                <th>Rank</th>
                <th>Nama</th>
                <th>Rata-rata</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s, i) => (
                <tr key={s.nama} className="border-t">
                  <td>{i + 1}</td>
                  <td>{s.nama}</td>
                  <td>{s.rata}</td>
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