import {testEvents} from "@/lib/data";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar, ChevronRight, Clock, MapPin, TrendingUp, Users} from "lucide-react";

export default function HomePage() {
    const loggedIn = false;

    if(!loggedIn) return DefaultHomePage();
    else return UserHomePage();
}

function DefaultHomePage() {
    const upcomingEvents = testEvents.slice(0, 3);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-[#4b2e83] text-white">
                <div className="flex flex-col md:flex-row">
                    {/* Text content - 60% width */}
                    <div className="md:w-[60%] flex flex-col justify-center py-12 md:py-20 px-4 md:ml-auto md:mr-0"
                         style={{maxWidth: "calc(60% - ((100% - 1280px) / 2))", marginLeft: "auto"}}>
                        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                            Welcome to the UW Bothell Events Portal
                        </h1>
                        <p className="mb-6 text-lg text-white/80">
                            Discover, connect, and engage with events happening across campus. Never miss an opportunity to learn,
                            network, and grow.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-[#b7a57a] text-white hover:bg-[#b7a57a]/90">
                                <Link href="/discover">Browse Events</Link>
                            </Button>
                            <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                                <Link href="/">View Calendar</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Image section - 40% width, right-aligned */}
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

                {/* Mobile image - visible only on small screens */}
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
                                        <span>{new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long', day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                            timeZone: 'America/Los_Angeles'
                                        }).format(new Date(event.date))}</span>
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
                    <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90">
                        <Link href="/discover">Explore All Events</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

function UserHomePage() {
    const myEvents = [
        testEvents[0], // Computer Science Career Fair
        testEvents[2], // Art Exhibition
        testEvents[3], // Research Symposium
    ];

    const recommendedEvents = [
        testEvents[1], // Spring Football Game
        testEvents[4], // Alumni Networking Mixer
        testEvents[6], // Jazz Ensemble Concert
    ];

    return <></>;
}
