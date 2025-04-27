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

const EVENTS_PER_PAGE = 6;

export default function EventsPortal() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(testEvents.length / EVENTS_PER_PAGE);

    const paginatedEvents = testEvents.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE
    );

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex flex-1">
            <FilterSidebar />
            <main className="flex-1 p-6">
                <h1 className="mb-6 text-2xl font-bold text-[#4b2e83]">
                    Discover Upcoming Events
                </h1>

                <div className="space-y-4">
                    {paginatedEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-8 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                                    className={currentPage === 1 ? "pointer-events-none  opacity-50" : "hover:cursor-pointer"}
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
            </main>
        </div>
    );
}