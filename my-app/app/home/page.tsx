import { EventCard } from "@/components/event-card"
import { Header } from "@/components/header"
import { testEvents } from "@/lib/data"



const recommendedEvents = [
    {
      id: "1",
      title: "Climate Change Hackathon",
      date: new Date("2024-06-01T19:00:00Z"),
      location: "Library",
      thumbnail: "/original.png",
      tags: ["Environment", "Climate"],
      description: "Join our hackathon!",
      organizer: "Gabe Sanders",
      attendees: 12,
      maxAttendees: 50,
      caption: "Dive into a new story every month!",
    },
    {
        id: "2",
        title: "Go Kart Grand Prix",
        date: new Date("2024-06-15T14:00:00Z"),
        location: "SpeedZone Arena",
        thumbnail: "/slide-3-karts-mobile.jpg",
        tags: ["Racing", "Fun", "Sports"],
        description: "Get ready to put the pedal to the metal in our annual Go Karting showdown! Prizes for the fastest lap.",
        organizer: "UW Sports Club",
        attendees: 30,
        maxAttendees: 100,
        caption: "Race to the finish line—no experience needed!",
      },
      {
        id: "3",
        title: "Best Machine Learning Research Paper Contest",
        date: new Date("2024-07-05T10:00:00Z"),
        location: "Science Hall, Room 202",
        thumbnail: "/imag.jpg",
        tags: ["Competition", "Machine Learning", "Research"],
        description: "Present your cutting-edge ML research paper and win recognition from industry judges!",
        organizer: "UW AI Society",
        attendees: 18,
        maxAttendees: 50,
        caption: "Showcase your ideas and push the boundaries of AI.",
      },
      {
        id: "4",
        title: "Freshmen Data Science Challenge",
        date: new Date("2024-08-20T16:00:00Z"),
        location: "Data Lab",
        thumbnail: "/image.jpg",
        tags: ["Data Science", "Competition", "Freshmen"],
        description: "Are you a first-year student? Form a team and solve real-world data problems for prizes and networking!",
        organizer: "Data Science Department",
        attendees: 25,
        maxAttendees: 40,
        caption: "Begin your data journey and have fun learning together.",
      },
    
  ]
  
  
export default function EventsPortal() {
    const name = "Aiym"
    
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <div className="flex flex-1 flex-col">
        <h1 className="mx-auto mt-6 text-3xl font-bold text-[#4b2e83]">
        HI, {name}!
        </h1>
        <div className="flex flex-1">
            <main className="flex-1 p-6">
            <section className="my-10 px-4">
        <h2 className="text-2xl font-bold text-[#4b2e83] mb-4">
          Explore Other Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {recommendedEvents.map((event) => (
    <EventCard key={event.id} event={event} />
  ))}
</div>
      </section>            
      </main>
      </div>
        </div>
    </div>
    )
    }
