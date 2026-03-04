"use client"

import { useState } from "react"
import * as XLSX from "xlsx"

export default function SiswaPage() {
  const [loading, setLoading] = useState(false)

  function handleFile(e: any) {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = async (evt: any) => {
      const data = new Uint8Array(evt.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json(sheet)

      const formatted = json.map((row: any) => ({
        no: row.No,
        nama: row["Nama"],
        kelas: row.Kelas
      }))

      setLoading(true)

      await fetch("/api/import-siswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formatted })
      })

      setLoading(false)
      alert("Import berhasil")
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Import Data Siswa</h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFile}
          className="mb-4"
        />

        {loading && <p>Mengupload dan memproses...</p>}
      </div>
    </div>
  )
}