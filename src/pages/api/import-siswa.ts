import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { data } = req.body

  if (!data || data.length === 0) {
    return res.status(400).json({ message: "Data kosong" })
  }

  try {
    await prisma.siswa.createMany({
      data: data.map((item) => ({
        no: Number(item.no),
        nama: item.nama,
        kelas: item.kelas
      })),
      skipDuplicates: true
    })

    return res.status(200).json({ message: "Import berhasil" })
  } catch (error) {
    return res.status(500).json({ message: "Gagal import", error })
  }
}