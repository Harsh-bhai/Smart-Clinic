import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function AddPatientPage() {
  const [activeTab, setActiveTab] = useState("patient")
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    medicalHistory: "",
    lifestyle: "",
  })

  const [medForm, setMedForm] = useState({
    name: "",
    dose: "",
    frequency: [] as string[],
    duration: "",
    remarks: "",
  })

  const [medicines, setMedicines] = useState<any[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)
    const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)


  // Medicine Form Handlers
  const addOrUpdateMedicine = () => {
    if (editingIndex !== null) {
      const updated = [...medicines]
      updated[editingIndex] = medForm
      setMedicines(updated)
      setEditingIndex(null)
    } else {
      setMedicines([...medicines, medForm])
    }
    setMedForm({ name: "", dose: "", frequency: [], duration: "", remarks: "" })
  }

  const editMedicine = (index: number) => {
    setMedForm(medicines[index])
    setEditingIndex(index)
  }

  const deleteMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setFont("helvetica")
    doc.setFontSize(12)

    // Header Info
    doc.text("Dr. Smile Dental Clinic", 14, 20)
    doc.text("123 Main Street, City", 14, 28)
    doc.text("Phone: +91 9876543210 | Timing: 10am - 7pm", 14, 36)

    // Patient Info
    doc.text("Patient Details:", 14, 50)
    doc.text(`Name: ${patient.name}`, 14, 58)
    doc.text(`Age: ${patient.age}`, 14, 66)
    doc.text(`Medical History: ${patient.medicalHistory}`, 14, 74)
    doc.text(`Lifestyle Habits: ${patient.lifestyle}`, 14, 82)

    // Medicine Table
    if (medicines.length > 0) {
      doc.text("Medicines:", 14, 100)
      autoTable(doc, {
        startY: 106,
        head: [["Medicine", "Dose", "Frequency", "Duration", "Remarks"]],
        body: medicines.map((m) => [
          m.name,
          m.dose,
          m.frequency.join(", "),
          m.duration,
          m.remarks,
        ]),
        theme: "grid",
        headStyles: {
          fillColor: [22, 160, 133],
          textColor: [128, 128, 128],
          halign: "left",
        },
        bodyStyles: { halign: "left" },
      })
    }

    doc.save("prescription.pdf")
  }

  return (
    <div className="flex h-screen">
      {/* Left: Forms */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="medicines">Medicines</TabsTrigger>
          </TabsList>

          {/* Patient Tab */}
          <TabsContent value="patient">
            <Input
              placeholder="Name"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
            />
            <Input
              placeholder="Age"
              className="mt-2"
              value={patient.age}
              onChange={(e) => setPatient({ ...patient, age: e.target.value })}
            />
            <Textarea
              placeholder="Medical History"
              className="mt-2"
              value={patient.medicalHistory}
              onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })}
            />
            <Textarea
              placeholder="Lifestyle Habits"
              className="mt-2"
              value={patient.lifestyle}
              onChange={(e) => setPatient({ ...patient, lifestyle: e.target.value })}
            />
          </TabsContent>

          {/* Medicines Tab */}
          <TabsContent value="medicines">
            <Input
              placeholder="Medicine Name"
              value={medForm.name}
              onChange={(e) => setMedForm({ ...medForm, name: e.target.value })}
            />

            {/* Dose Dropdown */}
            <Select onValueChange={(val) => setMedForm({ ...medForm, dose: val })}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select Dose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 Tablet">1 Tablet</SelectItem>
                <SelectItem value="2 Tablets">2 Tablets</SelectItem>
                <SelectItem value="5 ml">5 ml</SelectItem>
                <SelectItem value="10 ml">10 ml</SelectItem>
              </SelectContent>
            </Select>

            {/* Frequency Checkboxes */}
            <div className="mt-3">
              <p className="font-medium mb-1">Frequency</p>
              <div className="flex justify-around">
                {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
                <label key={time} className="flex items-center gap-2">
                  <Checkbox
                    checked={medForm.frequency.includes(time)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setMedForm({ ...medForm, frequency: [...medForm.frequency, time] })
                      } else {
                        setMedForm({
                          ...medForm,
                          frequency: medForm.frequency.filter((f) => f !== time),
                        })
                      }
                    }}
                  />
                  {time}
                </label>
              ))}
              </div>
            </div>

            {/* Duration Dropdown */}
            <Select onValueChange={(val) => setMedForm({ ...medForm, duration: val })}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3 Days">3 Days</SelectItem>
                <SelectItem value="5 Days">5 Days</SelectItem>
                <SelectItem value="1 Week">1 Week</SelectItem>
                <SelectItem value="2 Weeks">2 Weeks</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Remarks"
              className="mt-2"
              value={medForm.remarks}
              onChange={(e) => setMedForm({ ...medForm, remarks: e.target.value })}
            />

            <Button className="mt-3" onClick={addOrUpdateMedicine}>
              {editingIndex !== null ? "Update Medicine" : "Add Medicine"}
            </Button>

            {/* Medicines Table */}
            {medicines.length > 0 && (
              <table className="w-full mt-4 border border-gray-300 text-sm">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border px-2 py-1">Medicine</th>
                    <th className="border px-2 py-1">Dose</th>
                    <th className="border px-2 py-1">Frequency</th>
                    <th className="border px-2 py-1">Duration</th>
                    <th className="border px-2 py-1">Remarks</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((m, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">{m.name}</td>
                      <td className="border px-2 py-1">{m.dose}</td>
                      <td className="border px-2 py-1">{m.frequency.join(", ")}</td>
                      <td className="border px-2 py-1">{m.duration}</td>
                      <td className="border px-2 py-1">{m.remarks}</td>
                      <td className="border px-2 py-1">
                        <Button size="sm" onClick={() => editMedicine(i)} className="mr-2">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteMedicine(i)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </TabsContent>
        </Tabs>
      </div>

            {/* Right: A4 PDF Preview */}
      <div className="w-1/2 flex flex-col items-center justify-start bg-gray-100 dark:bg-[#121212] p-4 overflow-hidden">
        <div className="flex gap-2 mb-2">
          <Button onClick={() => setZoom((z) => z + 0.1)}>Zoom In</Button>
          <Button onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}>
            Zoom Out
          </Button>
          <Button onClick={generatePDF}>Generate PDF</Button>
        </div>

        {/* Paper Wrapper with Drag Support */}
        <div
          className="relative w-full h-full overflow-hidden border rounded bg-gray-200 dark:bg-gray-800"
          onMouseDown={(e) => {
            setIsDragging(true)
            setStartX(e.clientX - offsetX)
            setStartY(e.clientY - offsetY)
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              setOffsetX(e.clientX - startX)
              setOffsetY(e.clientY - startY)
            }
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div
            className="absolute top-0 left-0 transition-transform origin-top cursor-grab"
            style={{
              width: "210mm",
              height: "297mm",
              transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            <div className="bg-white dark:bg-black text-black dark:text-white p-8 text-left w-full h-full">
              <h1 className="text-xl font-bold">Dr. Smile Dental Clinic</h1>
              <p>123 Main Street, City</p>
              <p>Phone: +91 9876543210 | Timing: 10am - 7pm</p>
              <hr className="my-3" />

              {activeTab === "patient" && (
                <div>
                  <h2 className="font-semibold">Patient Details</h2>
                  <p>Name: {patient.name}</p>
                  <p>Age: {patient.age}</p>
                  <p>Medical History: {patient.medicalHistory}</p>
                  <p>Lifestyle Habits: {patient.lifestyle}</p>
                </div>
              )}

              {activeTab === "medicines" && (
                <div>
                  <h2 className="font-semibold">Medicines</h2>
                  {medicines.length > 0 ? (
                    <table className="w-full border mt-2 text-sm">
                      <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                          <th className="border px-2 py-1">Medicine</th>
                          <th className="border px-2 py-1">Dose</th>
                          <th className="border px-2 py-1">Frequency</th>
                          <th className="border px-2 py-1">Duration</th>
                          <th className="border px-2 py-1">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.map((m, i) => (
                          <tr key={i}>
                            <td className="border px-2 py-1">{m.name}</td>
                            <td className="border px-2 py-1">{m.dose}</td>
                            <td className="border px-2 py-1">{m.frequency.join(", ")}</td>
                            <td className="border px-2 py-1">{m.duration}</td>
                            <td className="border px-2 py-1">{m.remarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No medicines added.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
