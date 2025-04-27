import {testEvents, UserType} from "@/lib/data";
import {Dispatch, SetStateAction, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Calendar, ChevronRight, Clock, MapPin, Plus, Star, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import FormattedDate from "@/components/formatted-date";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Progress} from "@/components/ui/progress";
import ManageInterestsDialog from "@/components/manage-interests-dialog";
import CreateEventDialog from "@/components/create-event-dialog";
import {EventObject} from "@/lib/models/events";
import EventDetailModal from "@/components/event-modal";
import {EventCard} from "@/components/event-card";
import {JoinOrganizationDialog} from "@/components/join-org-dialog";

export default function UserHomePage({user, setUser}: {user: UserType, setUser: Dispatch<SetStateAction<UserType | null>>}) {
    const myEvents = [
        testEvents[0],
        testEvents[2],
        testEvents[3],
    ];
    const recommendedEvents = [
        testEvents[1],
        testEvents[4],
        testEvents[6],
    ];
    const nextEvent = testEvents[0];
    const currentHour = new Date().getHours();
    let greeting = "Good Morning";

    if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good afternoon"
    } else if (currentHour >= 17) {
        greeting = "Good evening"
    }

    const [isInterestsDialogOpen, setIsInterestsDialogOpen] = useState(false);
    const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false)
    const [savedEvents, setSavedEvents] = useState<EventObject[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventObject | null>(null);
    const [myRsvpedEvents, setMyRsvpedEvents] = useState<EventObject[]>(myEvents);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isEventRsvped, setIsEventRsvped] = useState(false);
    const [isOrganizationsDialogOpen, setIsOrganizationsDialogOpen] = useState(false)

    const toggleSaveEvent = (event: EventObject) => {
        setSavedEvents(prev => {
            const isAlreadySaved = prev.some(e => e.id === event.id);
            if (isAlreadySaved) {
                return prev.filter(e => e.id !== event.id);
            } else {
                return [...prev, event];
            }
        });
    };

    function openEventModal(event: EventObject, defaultRsvp = false) {
        setSelectedEvent(event);
        setIsEventRsvped(defaultRsvp);
        setIsEventModalOpen(true);
    }

    return (
        <>
            <main className="flex-1 pb-12">
                {/* Welcome Banner */}
                <section className="bg-[#4b2e83] py-8 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16 border-2 border-white">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback className="bg-[#b7a57a] text-white">AJ</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {greeting}, {user.name}!
                                    </h1>
                                    <p className="text-white/80">
                                        {user.year} • {user.major}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button className="bg-white text-[#4b2e83] hover:bg-white/90 hover:cursor-pointer">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    My Calendar
                                </Button>
                                <Button variant="outline" onClick={() => setIsCreateEventDialogOpen(true)} className="border-white bg-transparent text-white hover:bg-white hover:text-[#4b2e83] hover:cursor-pointer">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Event
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 pt-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            {/* Next Event Alert */}
                            {nextEvent && (
                                <Card className="mb-8 border-l-4 border-l-[#b7a57a] bg-[#b7a57a]/5">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="flex items-center text-lg">
                                            <Clock className="mr-2 h-5 w-5 text-[#b7a57a]" />
                                            Your Next Event
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-[#4b2e83]">{nextEvent.title}</h3>
                                                <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <FormattedDate date={nextEvent.date} />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{nextEvent.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="hover:cursor-pointer"
                                                onClick={() => openEventModal(nextEvent, true)}
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* My Events Tabs */}
                            <div className="mb-8">
                                <Tabs defaultValue="upcoming">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-[#4b2e83]">My Events</h2>
                                        <TabsList >
                                            <TabsTrigger className="hover:cursor-pointer" value="upcoming">Upcoming</TabsTrigger>
                                            <TabsTrigger className="hover:cursor-pointer" value="past">Past</TabsTrigger>
                                            <TabsTrigger className="hover:cursor-pointer" value="saved">Saved</TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <TabsContent value="upcoming" className="mt-4">
                                        {myRsvpedEvents.length > 0 ? (
                                            <div className="space-y-4">
                                                {myRsvpedEvents.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        event={event}
                                                        compact
                                                        defaultRsvp
                                                        isSaved={savedEvents.some(e => e.id === event.id)}
                                                        onSaveToggle={() => toggleSaveEvent(event)}
                                                        onViewDetails={() => openEventModal(event, true)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="rounded-md border border-dashed p-8 text-center">
                                                <h3 className="text-lg font-medium text-gray-600">No upcoming events</h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Your confirmed events will appear here!
                                                </p>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="past">
                                        <div className="mt-4 rounded-md border border-dashed p-8 text-center">
                                            <h3 className="text-lg font-medium text-gray-600">No past events to display</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Events you've attended will appear here for your reference.
                                            </p>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="saved" className="mt-4">
                                        {savedEvents.length > 0 ? (
                                            <div className="space-y-4">
                                                {savedEvents.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        event={event}
                                                        compact
                                                        isSaved
                                                        onSaveToggle={() => toggleSaveEvent(event)}
                                                        onViewDetails={() => openEventModal(event)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="rounded-md border border-dashed p-8 text-center">
                                                <h3 className="text-lg font-medium text-gray-600">No saved events yet</h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Tap the star to save events for easy access!
                                                </p>
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Recommended Events */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#4b2e83]">Recommended For You</h2>
                                    <Link
                                        href="/discover"
                                        className="flex items-center text-sm font-medium text-[#4b2e83] hover:underline"
                                    >
                                        View All
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {recommendedEvents.map((event) => {
                                        const isSaved = savedEvents.some(e => e.id === event.id);
                                        return (
                                            <Card key={event.id} className="overflow-hidden">
                                                <div className="relative h-[140px] w-full">
                                                    <Image
                                                        src={event.thumbnail || "/placeholder.svg"}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <CardHeader className="p-4 pb-2">
                                                    <CardTitle className="line-clamp-1 text-base text-[#4b2e83]">
                                                        {event.title}
                                                    </CardTitle>
                                                    <CardDescription className="flex items-center gap-1 text-xs">
                                                        <Calendar className="h-3 w-3" />
                                                        <FormattedDate date={event.date} />
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-0">
                                                    <p className="line-clamp-2 text-xs text-gray-600">{event.description}</p>
                                                </CardContent>
                                                <CardFooter className="flex justify-between border-t p-4">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="hover:underline text-xs text-[#4b2e83]"
                                                        onClick={() => openEventModal(event)}
                                                    >
                                                        View Details
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="hover:bg-transparent hover:cursor-pointer"
                                                        onClick={() => toggleSaveEvent(event)}
                                                    >
                                                        <Star className={`h-5 w-5 ${isSaved ? "fill-[#b7a57a] text-[#b7a57a]" : "text-[#4b2e83]"}`} />
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Activity Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Activity Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="text-sm font-medium">Events Attended</span>
                                            <span className="text-sm text-gray-500">7/10</span>
                                        </div>
                                        <Progress value={70} className="h-2 bg-[#4b2e83]" indicatorColor={"bg-[#b7a57a]"} />
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="text-sm font-medium">RSVPs This Quarter</span>
                                            <span className="text-sm text-gray-500">3/5</span>
                                        </div>
                                        <Progress value={60} className="h-2 bg-[#4b2e83]" indicatorColor={"bg-[#b7a57a]"} />
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="text-sm font-medium">Engagement Score</span>
                                            <span className="text-sm text-gray-500">85%</span>
                                        </div>
                                        <Progress value={85} className="h-2 bg-[#4b2e83]" indicatorColor={"bg-[#b7a57a]"} />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* My Organizations */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">My Organizations</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2 text-xs"
                                        onClick={() => setIsOrganizationsDialogOpen(true)}
                                    >
                                        <Plus className="mr-1 h-3 w-3" />
                                        Join
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {user.organizations.map((org: string, index: number) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-[#4b2e83] text-xs text-white">
                                                        {org
                                                            .split(" ")
                                                            .map((word) => word[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">{org}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:cursor-pointer">
                                                View
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* My Interests */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">My Interests</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2 text-xs"
                                        onClick={() => setIsInterestsDialogOpen(true)}
                                    >
                                        Manage
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {user?.interests && user.interests.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {user.interests.map((interest, index) => (
                                                <Badge key={index} variant="outline" className="bg-[#4b2e83]/5">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No interests selected. Click Manage to add some!
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Upcoming Deadlines */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-[#4b2e83]">Event Registration Deadline</h4>
                                        <p className="text-sm text-gray-600">Spring Football Game</p>
                                        <p className="mt-1 text-xs text-gray-500">May 15, 2024 • 3 days left</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[#4b2e83]">Volunteer Application</h4>
                                        <p className="text-sm text-gray-600">Research Symposium</p>
                                        <p className="mt-1 text-xs text-gray-500">May 18, 2024 • 6 days left</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <ManageInterestsDialog
                open={isInterestsDialogOpen}
                onOpenChangeAction={setIsInterestsDialogOpen}
                currentInterests={user?.interests ?? []}
                onInterestsChangeAction={(newInterests) => {
                    if (user) {
                        setUser((prev: UserType | null) => prev ? { ...prev, interests: newInterests } : null);
                    }
                }}
            />

            <JoinOrganizationDialog
                open={isOrganizationsDialogOpen}
                onOpenChange={setIsOrganizationsDialogOpen}
            />

            <CreateEventDialog open={isCreateEventDialogOpen} onOpenChange={setIsCreateEventDialogOpen} />
            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    open={isEventModalOpen}
                    isRsvped={isEventRsvped}
                    setIsRsvped={setIsEventRsvped}
                    onOpenChange={setIsEventModalOpen}
                />
            )}
        </>
    );
}