'use client'

import Image from "next/image"
import { Calendar, Check, Clipboard, MapPin, Star, Users, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { EventObject } from "@/lib/models/events"
import EventDetailModal from "@/components/event-modal"
import { useState } from "react"
import { confirmRSVP } from "@/components/util-functions"
import FormattedDate from "@/components/formatted-date"
import { cn } from "@/lib/utils"

export function EventCard({
                            event,
                            compact = false,
                            defaultRsvp = false,
                            isSaved = false,
                            onSaveToggle,
                            onViewDetails,
                          }: EventCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [isRsvped, setIsRsvped] = useState(defaultRsvp)
  const [hovering, setHovering] = useState(false)

  const buttonBase = "hover:cursor-pointer transition-colors"

  const buttonColor = !isRsvped
      ? "bg-[#b7a57a] hover:bg-[#b7a57a]/90"
      : hovering
          ? "bg-red-300 hover:bg-red-400"
          : "bg-[#8AD1A4] hover:bg-[#8AD1A4]/90"

  const handleRSVPClick = () => {
    setIsRsvped(!isRsvped)
    confirmRSVP(event.title, isRsvped)
  }

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails()
    } else {
      setShowDetails(true)
    }
  }

  return (
      <>
        <Card className="overflow-hidden">
          <div className={cn("flex w-full", compact ? "flex-row" : "flex-col sm:flex-row")}>
            {/* Event Image */}
            <div className={cn(
                "relative w-full",
                compact
                    ? "h-full sm:w-[180px] sm:h-auto"
                    : "aspect-video sm:w-1/3 sm:max-w-[320px] sm:h-auto"
            )}>
              <Image
                  src={event.thumbnail || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover h-full w-full"
              />
            </div>

            {/* Event Content */}
            <div className="flex flex-1 flex-col">
              <CardHeader className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3
                        className={cn(
                            "font-bold text-[#4b2e83] hover:underline hover:cursor-pointer",
                            compact ? "text-lg" : "text-xl"
                        )}
                        onClick={handleViewDetails}
                    >
                      {event.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <FormattedDate date={event.date} />
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location ?? "Virtual"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Star Button */}
                  <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#4b2e83]"
                      onClick={onSaveToggle}
                  >
                    <Star
                        className={cn(
                            "h-5 w-5",
                            isSaved ? "fill-[#b7a57a] text-[#b7a57a]" : "text-[#4b2e83]"
                        )}
                    />
                  </Button>
                </div>

                {!compact && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {event.tags?.map((tag) => (
                          <Badge
                              key={tag}
                              variant="outline"
                              className="bg-[#4b2e83]/10 text-[#4b2e83] hover:bg-[#4b2e83]/20"
                          >
                            {tag}
                          </Badge>
                      ))}
                    </div>
                )}
              </CardHeader>

              <CardContent className="flex-1 pb-3">
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t py-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clipboard className="h-4 w-4" />
                  <span>{event.organizer}</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>
                    {event.attendees + (isRsvped ? 1 : 0)} {event.maxAttendees ? `/ ${event.maxAttendees}` : null}
                  </span>
                  </div>

                  {/* RSVP Button */}
                  <Button
                      size="sm"
                      className={`${buttonBase} ${buttonColor}`}
                      onClick={handleRSVPClick}
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                  >
                    {isRsvped ? (
                        hovering ? (
                            <>
                              <X className="mr-1 h-4 w-4" />
                              Cancel
                            </>
                        ) : (
                            <>
                              <Check className="mr-1 h-4 w-4" />
                              Going
                            </>
                        )
                    ) : (
                        "RSVP"
                    )}
                  </Button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>

        {/* Event Modal */}
        <EventDetailModal
            event={event}
            open={showDetails}
            isRsvped={isRsvped}
            setIsRsvped={setIsRsvped}
            onOpenChange={setShowDetails}
        />
      </>
  )
}

interface EventCardProps {
  event: EventObject;
  compact?: boolean;
  defaultRsvp?: boolean;
  isSaved?: boolean;
  onSaveToggle?: () => void;
  onViewDetails?: () => void;
}