"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Settings,
  MessageSquare,
  Share,
  Users,
  Clock,
} from "lucide-react"

interface TelemedicineWindowProps {
  isOpen: boolean
  onClose: () => void
  patientName: string
}

export function TelemedicineWindow({ isOpen, onClose, patientName }: TelemedicineWindowProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [connectionTime, setConnectionTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isConnected])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleConnect = () => {
    setIsConnected(true)
    setConnectionTime(0)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setConnectionTime(0)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Telemedicine Session - {patientName}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {/* Video Call Interface */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Main Video Area */}
            <div className="lg:col-span-2">
              <Card className="relative overflow-hidden">
                <CardContent className="p-0">
                  {/* Patient Video */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                    {isConnected ? (
                      <div className="text-center">
                        <Avatar className="h-24 w-24 mx-auto mb-4">
                          <AvatarImage src="/patient-male.png" alt={patientName} />
                          <AvatarFallback className="text-2xl">
                            {patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-lg font-medium">{patientName}</p>
                        <Badge variant="default" className="mt-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                          Connected
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Waiting to connect...</p>
                        <p className="text-sm">Click "Start Call" to begin the session</p>
                      </div>
                    )}

                    {/* Doctor Video (Picture-in-Picture) */}
                    {isConnected && (
                      <div className="absolute bottom-4 right-4 w-32 h-24 bg-background border-2 border-primary rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/caring-doctor.png" alt="Dr. Smith" />
                            <AvatarFallback>DS</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    )}

                    {/* Connection Timer */}
                    {isConnected && (
                      <div className="absolute top-4 left-4 bg-background/90 px-3 py-1 rounded-full flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{formatTime(connectionTime)}</span>
                      </div>
                    )}
                  </div>

                  {/* Video Controls */}
                  <div className="p-4 bg-muted/50 flex items-center justify-center gap-2">
                    <Button
                      variant={isVideoOn ? "default" : "destructive"}
                      size="icon"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      disabled={!isConnected}
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={isAudioOn ? "default" : "destructive"}
                      size="icon"
                      onClick={() => setIsAudioOn(!isAudioOn)}
                      disabled={!isConnected}
                    >
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    {!isConnected ? (
                      <Button onClick={handleConnect} className="px-6">
                        <Phone className="mr-2 h-4 w-4" />
                        Start Call
                      </Button>
                    ) : (
                      <Button variant="destructive" onClick={handleDisconnect} className="px-6">
                        <PhoneOff className="mr-2 h-4 w-4" />
                        End Call
                      </Button>
                    )}
                    <Button variant="outline" size="icon" disabled={!isConnected}>
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" disabled={!isConnected}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Session Info */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Session Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient:</span>
                      <span>{patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session ID:</span>
                      <span className="font-mono">TM-2024-001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
                        {isConnected ? "Active" : "Waiting"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{formatTime(connectionTime)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      disabled={!isConnected}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      disabled={!isConnected}
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share Screen
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      disabled={!isConnected}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Invite Specialist
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Quality */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Connection Quality</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Video Quality:</span>
                      <Badge variant="default" className="text-xs">
                        HD
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Audio Quality:</span>
                      <Badge variant="default" className="text-xs">
                        Clear
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Latency:</span>
                      <span className="text-green-600">45ms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
