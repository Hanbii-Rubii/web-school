import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { kelas } = req.query

    const siswa = await prisma.siswa.findMany({
      where: { kelas: kelas as string },
      orderBy: { no: "asc" }
    })

    return res.json(siswa)
  }
}
