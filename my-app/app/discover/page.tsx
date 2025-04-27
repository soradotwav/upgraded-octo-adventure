"use client";

import { useState } from "react";
import { EventCard } from "@/components/event-card";
import { FilterSidebar } from "@/components/filter-sidebar";
import { testEvents } from "@/lib/data";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";
import {EventObject} from "@/lib/models/events";
import EventDetailModal from "@/components/event-modal";

const EVENTS_PER_PAGE = 6;

export default function EventsPortal() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        tags: [] as string[],
        startDate: null as string | null,
        club: "all",
        distance: 10,
        eventTypes: [] as string[],
    });

    const [savedEvents, setSavedEvents] = useState<EventObject[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventObject | null>(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

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

    const openEventModal = (event: EventObject) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const filteredEvents = testEvents.filter(event => {
        if (filters.tags.length > 0 && (!event.tags || !event.tags.some(tag => filters.tags.includes(tag)))) return false;
        if (filters.startDate && new Date(event.date) < new Date(filters.startDate)) return false;
        if (filters.club !== "all" && (!event.organizer?.toLowerCase().includes(filters.club))) return false;
        if (filters.eventTypes.length > 0 && (!event.type || !filters.eventTypes.includes(event.type))) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE
    );

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex flex-1">
            <FilterSidebar filters={filters} setFilters={setFilters} />
            <main className="flex-1 p-6">
                <h1 className="mb-6 text-2xl font-bold text-[#4b2e83]">
                    Discover Upcoming Events
                </h1>

                {/* Events */}
                <div className="space-y-4">
                {paginatedEvents.length > 0 ? (
                    paginatedEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            isSaved={savedEvents.some(e => e.id === event.id)}
                            onSaveToggle={() => toggleSaveEvent(event)}
                            onViewDetails={() => openEventModal(event)}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                        <p className="text-xl font-semibold mb-2">No events found</p>
                        <p className="text-sm">Try adjusting your filters to find more events.</p>
                    </div>
                )}
            </div>

                {/* Pagination Controls */}
                {totalPages > 1 && paginatedEvents.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "hover:cursor-pointer"}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            className="hover:cursor-pointer"
                                            isActive={currentPage === i + 1}
                                            onClick={() => goToPage(i + 1)}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </main>
            {selectedEvent && (
                <EventDetailModal
                    event={selectedEvent}
                    open={isEventModalOpen}
                    isRsvped={false}
                    setIsRsvped={() => {}} // You can wire this up later if needed
                    onOpenChange={setIsEventModalOpen}
                />
            )}
        </div>
    );
}