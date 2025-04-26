import { EventCard } from "@/components/event-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Header } from "@/components/header"
import { testEvents } from "@/lib/data"

export default function EventsPortal() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <FilterSidebar />
        <main className="flex-1 p-6">
          <h1 className="mb-6 text-2xl font-bold text-[#4b2e83]">Upcoming Events</h1>
          <div className="space-y-4">
            {testEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
