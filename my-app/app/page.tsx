"use client"
import { cookies } from "next/headers";
import {testEvents, testStudent} from "@/lib/data";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar, ChevronRight, Clock, MapPin, Plus, Star, TrendingUp, Users} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {Badge} from "@/components/ui/badge";
import FormattedDate from "@/components/formatted-date";
import {useState} from "react";
import ManageInterestsDialog from "@/components/manage-interests-dialog";
import {useUser} from "@/hooks/useUser";

export default async function HomePage() {
    const cookieStore = await cookies();
    const log = (await cookieStore).get("user-login-token");

    console.log(log);

    if (log === null || log === undefined) {
        return DefaultHomePage();
    }

    if (log.value === "true") {
        return UserHomePage();
    }

    return DefaultHomePage();
}

function DefaultHomePage() {
    const upcomingEvents = testEvents.slice(0, 3);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-[#4b2e83] text-white">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-[60%] flex flex-col justify-center py-12 md:py-20 px-4 md:ml-auto md:mr-0"
                        style={{ maxWidth: "calc(60% - ((100% - 1280px) / 2))", marginLeft: "auto" }}>
                        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                            Welcome to the UW Bothell Events Portal
                        </h1>
                        <p className="mb-6 text-lg text-white/80">
                            Discover, connect, and engage with events happening across campus. Never miss an opportunity to learn,
                            network, and grow.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-[#b7a57a] text-white hover:bg-[#b7a57a]/90 hover:cursor-pointer">
                                <Link href="/discover">Browse Events</Link>
                            </Button>
                            <Button variant="outline" className="border-white bg-transparent text-white hover:text-[#4b2e83] hover:cursor-pointer">
                                <Link href="/">View Calendar</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="hidden md:block relative md:w-[40%]">
                        <Image
                            src="/uwb-campus.jpg"
                            alt="UW Campus"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="relative h-[200px] md:hidden">
                    <Image
                        src="/uwb-campus.jpg"
                        alt="UW Campus"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-8">
                <div className="container mx-auto px-4 max-w-screen-xl">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Card className="border-none bg-white shadow-sm">
                            <CardContent className="flex flex-col items-center p-6">
                                <Calendar className="mb-2 h-8 w-8 text-[#4b2e83]" />
                                <p className="text-2xl font-bold">55+</p>
                                <p className="text-center text-sm text-gray-500">Events This Month</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none bg-white shadow-sm">
                            <CardContent className="flex flex-col items-center p-6">
                                <Users className="mb-2 h-8 w-8 text-[#4b2e83]" />
                                <p className="text-2xl font-bold">5,000+</p>
                                <p className="text-center text-sm text-gray-500">Students Attending</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none bg-white shadow-sm">
                            <CardContent className="flex flex-col items-center p-6">
                                <MapPin className="mb-2 h-8 w-8 text-[#4b2e83]" />
                                <p className="text-2xl font-bold">20+</p>
                                <p className="text-center text-sm text-gray-500">Campus Locations</p>
                            </CardContent>
                        </Card>
                        <Card className="border-none bg-white shadow-sm">
                            <CardContent className="flex flex-col items-center p-6">
                                <TrendingUp className="mb-2 h-8 w-8 text-[#4b2e83]" />
                                <p className="text-2xl font-bold">65%</p>
                                <p className="text-center text-sm text-gray-500">Student Engagement</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#4b2e83]">Featured Events</h2>
                        <Link href="/discover" className="flex items-center text-sm font-medium text-[#4b2e83] hover:underline">
                            View All Events
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {upcomingEvents.map((event) => (
                            <Card key={event.id} className="overflow-hidden">
                                <div className="relative h-[160px] w-full">
                                    <Image src={event.thumbnail || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-bold text-[#4b2e83]">{event.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <FormattedDate date={event.date} />
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <p className="line-clamp-2 text-sm text-gray-600">{event.description}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Users className="h-3.5 w-3.5" />
                                        <span>{event.attendees} attending</span>
                                    </div>
                                    <Link href="/discover" className="text-sm font-medium text-[#4b2e83] hover:underline">
                                        Details
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Announcements */}
            <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold text-[#4b2e83]">Campus Announcements</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-l-4 border-l-[#4b2e83]">
                            <CardHeader>
                                <CardTitle className="text-lg">Spring Quarter Registration Open</CardTitle>
                                <CardDescription>Posted on May 1, 2024</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">
                                    Registration for Spring Quarter events is now open. Be sure to check the calendar and register early
                                    as popular events fill up quickly.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href="#" className="text-sm font-medium text-[#4b2e83] hover:underline">
                                    Learn More
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className="border-l-4 border-l-[#b7a57a]">
                            <CardHeader>
                                <CardTitle className="text-lg">New Event Submission Guidelines</CardTitle>
                                <CardDescription>Posted on April 28, 2024</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">
                                    We've updated our event submission guidelines to make it easier for student organizations to post
                                    their events on the portal.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href="#" className="text-sm font-medium text-[#4b2e83] hover:underline">
                                    Learn More
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold text-[#4b2e83]">Quick Links</h2>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <Link href="/calendar">
                            <Card className="transition-all hover:shadow-md">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <Calendar className="h-5 w-5 text-[#4b2e83]" />
                                    <span className="font-medium">Events Calendar</span>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="https://www.uwb.edu/sea/clubs">
                            <Card className="transition-all hover:shadow-md">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <Users className="h-5 w-5 text-[#4b2e83]" />
                                    <span className="font-medium">Student Organizations</span>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="https://www.uwb.edu/wp-content/uploads/2024/10/uw-bothell-campus-map.pdf">
                            <Card className="transition-all hover:shadow-md">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <MapPin className="h-5 w-5 text-[#4b2e83]" />
                                    <span className="font-medium">Campus Map</span>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="https://www.uwb.edu/academic-calendar/">
                            <Card className="transition-all hover:shadow-md">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <Clock className="h-5 w-5 text-[#4b2e83]" />
                                    <span className="font-medium">Academic Calendar</span>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#b7a57a]/10 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-[#4b2e83]">Ready to Get Involved?</h2>
                    <p className="mx-auto mb-6 max-w-2xl text-gray-600">
                        Join the vibrant UW community by participating in events, workshops, and activities across campus. Expand
                        your network, learn new skills, and make the most of your university experience.
                    </p>
                    <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 hover:cursor-pointer">
                        <Link href="/discover">Explore All Events</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

function UserHomePage() {
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

    const [isInterestsDialogOpen, setIsInterestsDialogOpen] = useState(false)
    const [interests, setInterests] = useState<string[]>(testStudent.interests)

    return (
        <>
            <main className="flex-1 pb-12">
                {/* Welcome Banner */}
                <section className="bg-[#4b2e83] py-8 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16 border-2 border-white">
                                    <AvatarImage src={testStudent.avatar || "/placeholder.svg"} alt={testStudent.name} />
                                    <AvatarFallback className="bg-[#b7a57a] text-white">AJ</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {greeting}, {testStudent.name}!
                                    </h1>
                                    <p className="text-white/80">
                                        {testStudent.year} • {testStudent.major}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button className="bg-white text-[#4b2e83] hover:bg-white/90 hover:cursor-pointer">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    My Calendar
                                </Button>
                                <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-[#4b2e83] hover:cursor-pointer">
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
                                            <Button className="bg-[#b7a57a] hover:bg-[#b7a57a]/90 hover:cursor-pointer">View Details</Button>
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
                                        <div className="space-y-4">
                                            {myEvents.map((event) => (
                                                <Card key={event.id} className="overflow-hidden">
                                                    <div className="flex flex-col sm:flex-row">
                                                        <div className="relative h-[120px] w-full sm:h-auto sm:w-[180px]">
                                                            <Image
                                                                src={event.thumbnail || "/placeholder.svg"}
                                                                alt={event.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-1 flex-col p-4">
                                                            <div className="mb-2">
                                                                <h3 className="text-lg font-bold text-[#4b2e83]">{event.title}</h3>
                                                                <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="h-4 w-4" />
                                                                        <FormattedDate date={event.date} />
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <MapPin className="h-4 w-4" />
                                                                        <span>{event.location}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-auto flex items-center justify-between">
                                                                <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                                                                <Button variant="outline" className="hover:cursor-pointer" size="sm">
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="past">
                                        <div className="mt-4 rounded-md border border-dashed p-8 text-center">
                                            <h3 className="text-lg font-medium text-gray-600">No past events to display</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Events you've attended will appear here for your reference.
                                            </p>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="saved">
                                        <div className="mt-4 rounded-md border border-dashed p-8 text-center">
                                            <h3 className="text-lg font-medium text-gray-600">No saved events</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Save events you're interested in to keep track of them.
                                            </p>
                                        </div>
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
                                    {recommendedEvents.map((event) => (
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
                                                <CardTitle className="line-clamp-1 text-base text-[#4b2e83]">{event.title}</CardTitle>
                                                <CardDescription className="flex items-center gap-1 text-xs">
                                                    <Calendar className="h-3 w-3" />
                                                    <FormattedDate date={event.date} />
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="line-clamp-2 text-xs text-gray-600">{event.description}</p>
                                            </CardContent>
                                            <CardFooter className="flex justify-between border-t p-4">
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Users className="h-3 w-3" />
                                                    <span>{event.attendees} attending</span>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:cursor-pointer">
                                                    <Star className="h-4 w-4" />
                                                    <span className="sr-only">Save</span>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
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
                                <CardHeader>
                                    <CardTitle className="text-lg">My Organizations</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {testStudent.organizations.map((org: string, index: number) => (
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
                                    <Button variant="outline" size="sm" className="mt-2 w-full hover:cursor-pointer">
                                        <Plus className="mr-1 h-3 w-3" />
                                        Join Organization
                                    </Button>
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
                                    <div className="flex flex-wrap gap-2">
                                        {interests.map((interest: string, index: number) => (
                                            <Badge key={index} variant="outline" className="bg-[#4b2e83]/5">
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
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
                currentInterests={interests}
                onInterestsChangeAction={setInterests}
            />
        </>
    );
}
