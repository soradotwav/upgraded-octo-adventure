import {EventObject} from "@/lib/models/events";
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Calendar, Check, MapPin, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {confirmRSVP} from "@/components/util-functions";

interface EventModalProps {
    event: EventObject,
    open: boolean,
    isRsvped: boolean,
    setIsRsvped: (isRsvped: boolean) => void,
    onOpenChange: (open: boolean) => void,
}


export default function EventDetailModal({event, open, isRsvped, setIsRsvped, onOpenChange} : EventModalProps) {
    const buttonColor = `hover:cursor-pointer ${!isRsvped ? "bg-[#b7a57a] hover:bg-[#b7a57a]/90" : "bg-[#8AD1A4] hover:bg-[#8AD1A4]/90"}`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#4b2e83]">{event.title}</DialogTitle>
                </DialogHeader>

                <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                    <Image src={event.thumbnail || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>

                <div className="grid gap-4">
                    <div>
                        <h3 className="mb-2 font-bold text-[#4b2e83]">About This Event</h3>
                        <p className="text-gray-700">{event.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-base text-gray-600">
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

                    <div className="rounded-md bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-sm">
                            <Users className="h-5 w-5 text-[#4b2e83]" />
                            <span>{event.attendees + (isRsvped ? 1 : 0)} {event.maxAttendees ? ` / ${event.maxAttendees}` : null} attending</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div className="rounded-md bg-gray-50 p-3 text-center flex flex-col">
                            <h5 className="text-xs text-gray-500">Organizer</h5>
                            <div className="flex-grow flex items-center justify-center">
                                <p className="text-sm font-medium">{event.organizer}</p>
                            </div>
                        </div>
                        <div className="rounded-md bg-gray-50 p-3 text-center flex flex-col">
                            <h5 className="text-xs text-gray-500">Duration</h5>
                            <div className="flex-grow flex items-center justify-center">
                                <p className="text-sm font-medium">2 hours</p>
                            </div>
                        </div>
                        <div className="rounded-md bg-gray-50 p-3 text-center flex flex-col">
                            <h5 className="text-xs text-gray-500">Event Type</h5>
                            <div className="flex-grow flex items-center justify-center">
                                <p className="text-sm font-medium">In Person</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" className="hover:cursor-pointer" size="sm">
                            Add to Calendar
                        </Button>
                        <Button variant="outline" className="hover:cursor-pointer" size="sm">
                            Share Event
                        </Button>
                    </div>
                    <Button
                        className={buttonColor}
                        onClick={() => {
                            setIsRsvped(!isRsvped);
                            confirmRSVP(event.title, isRsvped);
                        }}>
                        {isRsvped ?  <Check /> : null}
                        {isRsvped ? "Going" : "RSVP"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
