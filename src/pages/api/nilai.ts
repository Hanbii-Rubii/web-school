import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function exportPDF(data) {
  const doc = new jsPDF()

  doc.text("SMKN 1 KAPUAS MURUNG", 14, 15)

  autoTable(doc, {
    startY: 20,
    head: [["Nama", "Mapel", "Nilai"]],
    body: data.map(d => [d.siswa, d.mapel, d.nilai])
  })

  doc.save("laporan-nilai.pdf")
}