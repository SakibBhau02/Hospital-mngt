"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const doctors = [
  { id: "1", name: "Dr. Sarah Smith", department: "Cardiology", avatar: "/caring-doctor.png" },
  { id: "2", name: "Dr. Michael Brown", department: "Endocrinology", avatar: "/caring-doctor.png" },
  { id: "3", name: "Dr. Lisa Johnson", department: "Neurology", avatar: "/caring-doctor.png" },
  { id: "4", name: "Dr. James Wilson", department: "Orthopedics", avatar: "/caring-doctor.png" },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const appointmentTypes = ["Consultation", "Follow-up", "Check-up", "Emergency", "Surgery Consultation", "Lab Review"]

interface AppointmentBookingFormProps {
  onClose: () => void
}

export function AppointmentBookingForm({ onClose }: AppointmentBookingFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    patientSearch: "",
    selectedPatient: null as any,
    doctor: "",
    date: undefined as Date | undefined,
    time: "",
    type: "",
    duration: "30",
    notes: "",
  })

  // Mock patient search results
  const searchResults = [
    { id: "P001", name: "John Doe", phone: "+1 (555) 123-4567", avatar: "/patient-male.png" },
    { id: "P002", name: "Sarah Johnson", phone: "+1 (555) 234-5678", avatar: "/patient-female.png" },
  ]

  const handleSubmit = () => {
    // Here you would typically submit to your backend
    toast({
      title: "Appointment booked successfully!",
      description: `Appointment scheduled for ${formData.selectedPatient?.name} on ${formData.date ? format(formData.date, "PPP") : ""} at ${formData.time}`,
    })
    onClose()
  }

  const canProceedToStep2 = formData.selectedPatient && formData.doctor
  const canProceedToStep3 = canProceedToStep2 && formData.date && formData.time && formData.type

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                step >= stepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {stepNum}
            </div>
            {stepNum < 3 && <div className={cn("h-0.5 w-12 mx-2", step > stepNum ? "bg-primary" : "bg-muted")} />}
          </div>
        ))}
      </div>

      {/* Step 1: Patient & Doctor Selection */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient-search">Search Patient</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="patient-search"
                placeholder="Search by name or patient ID..."
                value={formData.patientSearch}
                onChange={(e) => setFormData((prev) => ({ ...prev, patientSearch: e.target.value }))}
                className="pl-10"
              />
            </div>
            {formData.patientSearch && (
              <div className="space-y-2 border rounded-lg p-2">
                {searchResults.map((patient) => (
                  <div
                    key={patient.id}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded cursor-pointer transition-colors",
                      formData.selectedPatient?.id === patient.id
                        ? "bg-primary/10 border border-primary"
                        : "hover:bg-muted",
                    )}
                    onClick={() => setFormData((prev) => ({ ...prev, selectedPatient: patient }))}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.id} • {patient.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select
              value={formData.doctor}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, doctor: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.name}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                        <AvatarFallback className="text-xs">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium">{doctor.name}</span>
                        <span className="text-muted-foreground ml-2">({doctor.department})</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 2: Date & Time Selection */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Available Time Slots</Label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={formData.time === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData((prev) => ({ ...prev, time }))}
                  className="text-xs"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointment-type">Appointment Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 3: Additional Details */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or notes..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Appointment Summary */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h4 className="font-medium">Appointment Summary</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Patient:</span> {formData.selectedPatient?.name}
              </p>
              <p>
                <span className="font-medium">Doctor:</span> {formData.doctor}
              </p>
              <p>
                <span className="font-medium">Date:</span> {formData.date ? format(formData.date, "PPP") : ""}
              </p>
              <p>
                <span className="font-medium">Time:</span> {formData.time}
              </p>
              <p>
                <span className="font-medium">Type:</span> {formData.type}
              </p>
              <p>
                <span className="font-medium">Duration:</span> {formData.duration} minutes
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => (step > 1 ? setStep(step - 1) : onClose())}>
          {step === 1 ? "Cancel" : "Previous"}
        </Button>

        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={step === 1 ? !canProceedToStep2 : !canProceedToStep3}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Book Appointment</Button>
        )}
      </div>
    </div>
  )
}
