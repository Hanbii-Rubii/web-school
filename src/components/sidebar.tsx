"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-xl font-bold mb-8">SIAS 4.0</h1>

      <ul className="space-y-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/siswa">Data Siswa</Link></li>
        <li><Link href="/absensi">Absensi</Link></li>
        <li><Link href="/nilai">Nilai</Link></li>
      </ul>

      <div className="absolute bottom-4 text-xs opacity-60">
        rubi.my.id
      </div>
    </div>
  )

  <button
  onClick={async () => {
    await fetch("/api/logout")
    window.location.href = "/"
  }}
  className="mt-6 text-sm text-red-400"
>
  Logout
</button>
}