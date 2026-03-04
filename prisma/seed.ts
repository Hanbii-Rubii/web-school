import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter
})

async function main() {
  const hashed = await bcrypt.hash("Hanbi", 10)

  await prisma.user.create({
    data: {
      nama: "Admin",
      password: hashed,
      role: "ADMIN",
      status: "AKTIF"
    }
  })

  console.log("Seed berhasil")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })