-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" TEXT NOT NULL,
    "no" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "mapel" TEXT NOT NULL,
    "siswa" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "guru" TEXT NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nilai" (
    "id" TEXT NOT NULL,
    "siswa" TEXT NOT NULL,
    "mapel" TEXT NOT NULL,
    "nilai" INTEGER NOT NULL,
    "kelas" TEXT NOT NULL,
    "guru" TEXT NOT NULL,

    CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nama_key" ON "User"("nama");
