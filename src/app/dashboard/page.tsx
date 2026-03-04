"use client"

import { Bar } from "react-chartjs-2"

export default function Dashboard() {
  const data = {
    labels: ["X", "XI", "XII"],
    datasets: [
      {
        label: "Jumlah Siswa",
        data: [120, 110, 105]
      }
    ]
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard SMKN 1 Kapuas Murung
      </h1>

      <Bar data={data} />
    </div>
  )
}