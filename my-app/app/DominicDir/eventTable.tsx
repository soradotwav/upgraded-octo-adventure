"use client"
import React, { useState, useEffect } from 'react';
import "../globals.css"
import { Header } from '@/components/header';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  } from "@/components/ui/table";
  type Event = {
    name: string;
    body: string;
    organizer: string;
    date: string;
    location: string;
    distanceFromCampus: string;
    thumbnail: string;
    maxAttendees: string;
    contact: string;
    clubAffiliation: string;
    price: string;
    isPublic: string;
    tags: string[];
    eventType: string;
    
  };
export function EventTable() {
//<h1>{events.length != 0 ? events[0].name: 'default event'}</h1>
const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
  
    fetch('/events.json')
      .then(response => response.json())
      .then(incomingData => setEvents(incomingData))
      .catch(error => console.error('Error loading events:', error));
  }, []);
  return (
    
    <div className="w-[1000px] mx-auto">
      <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">Publicised</TableHead>
          <TableHead className="py-4">Name</TableHead>
          <TableHead className="py-4">Body</TableHead>
          <TableHead className="py-4">Date</TableHead>
          <TableHead className="py-4">Location</TableHead>
          <TableHead className="py-4">Distance From Campus</TableHead>

          <TableHead className="py-4">Max Attendees</TableHead>
          <TableHead className="py-4">Price</TableHead>
          <TableHead className="py-4">Event Type</TableHead>
          <TableHead className="py-4">Organizer</TableHead>
          <TableHead className="py-4">Contact</TableHead>
          <TableHead className="py-4">Club Affiliation</TableHead>

          <TableHead className="py-4">Tags</TableHead>
          <TableHead className="py-4">Thumbnail</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.name}>
            <TableCell className="py-4">{event.isPublic ? "Yes" : "No"}</TableCell>
            <TableCell className="py-4">{event.name}</TableCell>
            <TableCell className="py-4">{event.body}</TableCell>
            <TableCell className="py-4">{event.date}</TableCell>
            <TableCell className="py-4">{event.location}</TableCell>
            <TableCell className="py-4">{event.distanceFromCampus}</TableCell>

            <TableCell className="py-4">{event.maxAttendees}</TableCell>
            <TableCell className="py-4">{event.price}</TableCell>
            <TableCell className="py-4">{event.eventType}</TableCell>
            <TableCell className="py-4">{event.organizer}</TableCell>
            <TableCell className="py-4">{event.contact}</TableCell>
            <TableCell className="py-4">{event.clubAffiliation}</TableCell>

            <TableCell className="py-4">{event.tags.join(', ')}</TableCell>
            <TableCell className="py-4">{event.thumbnail}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  
  );

}

