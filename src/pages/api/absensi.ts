import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { kelas, mapel, guru, data } = req.body

    const tanggal = new Date()

    const records = data.map((item) => ({
      kelas,
      mapel,
      siswa: item.nama,
      status: item.status,
      tanggal,
      guru
    }))

    await prisma.absensi.createMany({
      data: records
    })

    return res.json({ message: "Absensi berhasil disimpan" })
  }

  if (req.method === "GET") {
    const data = await prisma.absensi.findMany({
      orderBy: { createdAt: "desc" }
    })
    return res.json(data)
  }
}