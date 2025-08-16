"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, CreditCard, Banknote, Building, CheckCircle, ArrowRight, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const paymentSteps = [
  { id: 1, title: "Select Patient", icon: Search },
  { id: 2, title: "Payment Details", icon: CreditCard },
  { id: 3, title: "Confirmation", icon: CheckCircle },
]

// Mock patient search results
const patients = [
  { id: "P001", name: "John Doe", outstandingAmount: 1250.0, avatar: "/patient-male.png" },
  { id: "P002", name: "Sarah Johnson", outstandingAmount: 850.0, avatar: "/patient-female.png" },
  { id: "P003", name: "Mike Wilson", outstandingAmount: 2100.0, avatar: "/patient-male-2.png" },
]

export default function PaymentsPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    notes: "",
  })

  const progress = (currentStep / paymentSteps.length) * 100

  const handleNext = () => {
    if (currentStep < paymentSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Payment processed successfully!",
      description: `Payment of $${paymentData.amount} has been processed for ${selectedPatient?.name}`,
    })
    router.push("/billing")
  }

  const canProceedFromStep1 = selectedPatient && paymentData.amount
  const canProceedFromStep2 = paymentData.method && (paymentData.method === "Cash" || paymentData.cardNumber)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="md:ml-64 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Process Payment</h1>
            <p className="text-muted-foreground">Step-by-step payment processing</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep} of {paymentSteps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between">
                {paymentSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {paymentSteps.find(s => s.id === currentStep)?.icon && (\
                <paymentSteps.find(s => s.id === currentStep)!.icon className="h-5 w-5" />
              )}
              {paymentSteps.find(s => s.id === currentStep)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Select Patient */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Patient</Label>
                  <div className="space-y-2">
                    {patients.map((patient) => (
                      <div
                        key={patient.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                          selectedPatient?.id === patient.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-600">${patient.outstandingAmount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Outstanding</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPatient && (
                  <div className="space-y-2">
                    <Label htmlFor="amount">Payment Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, amount: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Outstanding amount: ${selectedPatient.outstandingAmount.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Payment Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select
                    value={paymentData.method}
                    onValueChange={(value) => setPaymentData((prev) => ({ ...prev, method: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Credit Card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Credit Card
                        </div>
                      </SelectItem>
                      <SelectItem value="Cash">
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          Cash
                        </div>
                      </SelectItem>
                      <SelectItem value="Insurance">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Insurance
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentData.method === "Credit Card" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        value={paymentData.cardholderName}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))}
                        placeholder="123"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="p-6 bg-muted/50 rounded-lg space-y-4">
                  <h4 className="font-medium">Payment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Patient:</span>
                      <span className="font-medium">{selectedPatient?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">${paymentData.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-medium">{paymentData.method}</span>
                    </div>
                    {paymentData.method === "Credit Card" && (
                      <div className="flex justify-between">
                        <span>Card:</span>
                        <span className="font-medium">****{paymentData.cardNumber.slice(-4)}</span>
                      </div>
                    )}
                    {paymentData.notes && (
                      <div className="flex justify-between">
                        <span>Notes:</span>
                        <span className="font-medium">{paymentData.notes}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Ready to Process</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Please review the payment details above and click "Process Payment" to complete the transaction.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={currentStep === 1 ? () => router.back() : handlePrevious}>
                {currentStep === 1 ? "Cancel" : "Previous"}
              </Button>

              {currentStep < paymentSteps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !canProceedFromStep1) || (currentStep === 2 && !canProceedFromStep2)
                  }
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Process Payment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
