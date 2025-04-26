import Image from "next/image"
import {Calendar, Clipboard, MapPin, Users} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {EventObject} from "@/lib/models/events";

export function EventCard({ event }: { event: EventObject }) {
  return (
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
                  <h3 className="text-xl font-bold text-[#4b2e83]">{event.title}</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date.toDateString()}</span>
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
                  <span>{event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : null}</span>
                </div>
                <Button className="bg-[#b7a57a] hover:bg-[#b7a57a]/90">RSVP</Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
  )
}
