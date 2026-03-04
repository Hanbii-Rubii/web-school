import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { signToken } from "@/lib/auth"
import { serialize } from "cookie"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { nama, password } = req.body

  const user = await prisma.user.findUnique({ where: { nama } })

  if (!user)
    return res.status(401).json({ message: "User tidak ditemukan" })

  const valid = await bcrypt.compare(password, user.password)

  if (!valid)
    return res.status(401).json({ message: "Password salah" })

  const token = signToken({
    id: user.id,
    nama: user.nama,
    role: user.role
  })

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/"
    })
  )

  res.status(200).json({ message: "Login berhasil" })
}