'use client'
import Image from "next/image"
import {Calendar, Check, Clipboard, MapPin, Users} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {EventObject} from "@/lib/models/events";
import EventDetailModal from "@/components/event-modal";
import {useState} from "react";
import {toast} from "sonner";
import {confirmRSVP} from "@/components/util-functions";

export function EventCard({ event }: { event: EventObject }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isRsvped, setIsRsvped] = useState(false)

  const buttonColor = `hover:cursor-pointer ${!isRsvped ? "bg-[#b7a57a] hover:bg-[#b7a57a]/90" : "bg-[#8AD1A4] hover:bg-[#8AD1A4]/90"}`;

  return (
      <>
        <Card className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="relative aspect-video w-full sm:w-1/3 sm:max-w-[320px]">
              <Image
                  src={event.thumbnail || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <CardHeader className="py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#4b2e83] hover:underline hover:cursor-pointer" onClick={() => setShowDetails(true)}>{event.title}</h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long', day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                            timeZone: 'America/Los_Angeles'
                          }).format(new Date(event.date))}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location ?? "Virtual"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {event.tags ? event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-[#b7a57a]/10 text-[#4b2e83]">
                          {tag}
                        </Badge>
                    )) : null}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-3">
                <p className="text-sm text-gray-600">{event.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t py-3">
                <div className="flex items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clipboard className="h-4 w-4" />
                    <span>{event.organizer}</span>
                  </div>
                </div>
                <div className="flex gap-5 text-sm text-gray-600">
                  <div className="flex items-center gap-1 ">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees + (isRsvped ? 1 : 0)} {event.maxAttendees ? `/ ${event.maxAttendees}` : null}</span>
                  </div>
                  <Button
                      className={buttonColor}
                      onClick={() => {
                        setIsRsvped(!isRsvped);
                        confirmRSVP(event.title, isRsvped)
                      }}>
                    {isRsvped ?  <Check /> : null}
                    {isRsvped ? "Going" : "RSVP"}
                  </Button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
        <EventDetailModal event={event} open={showDetails} isRsvped={isRsvped} setIsRsvped={setIsRsvped} onOpenChange={setShowDetails} />
      </>
  )
}
