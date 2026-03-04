import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { kelas } = req.query

  const data = await prisma.nilai.findMany({
    where: { kelas: kelas as string }
  })

  const grouped: any = {}

  data.forEach((item) => {
    if (!grouped[item.siswa]) {
      grouped[item.siswa] = []
    }
    grouped[item.siswa].push(item.nilai)
  })

  const ranking = Object.entries(grouped).map(([nama, nilaiList]: any) => {
    const total = nilaiList.reduce((a, b) => a + b, 0)
    const rata = total / nilaiList.length

    return {
      nama,
      rata: Number(rata.toFixed(2))
    }
  })

  ranking.sort((a, b) => b.rata - a.rata)

  return res.json(ranking)
}