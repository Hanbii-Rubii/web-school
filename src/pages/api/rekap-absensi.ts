import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { bulan, tahun, kelas } = req.query

  const startDate = new Date(Number(tahun), Number(bulan) - 1, 1)
  const endDate = new Date(Number(tahun), Number(bulan), 0)

  const data = await prisma.absensi.findMany({
    where: {
      kelas: kelas as string,
      tanggal: {
        gte: startDate,
        lte: endDate
      }
    }
  })

  const rekap: any = {}

  data.forEach((item) => {
    if (!rekap[item.siswa]) {
      rekap[item.siswa] = {
        Hadir: 0,
        Izin: 0,
        Sakit: 0,
        Alpha: 0
      }
    }
    rekap[item.siswa][item.status]++
  })

  return res.json(rekap)
}
