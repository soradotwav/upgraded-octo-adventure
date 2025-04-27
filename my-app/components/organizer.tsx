import React, { useState, useEffect } from 'react';
import './App.css'
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
    thumbnail: string;
    maxAttendees: string;
    contact: string;
    price: string;
    isPublic: string;
    tags: string[];
  };
function App() {
//<h1>{events.length != 0 ? events[0].name: 'default event'}</h1>
const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
  
    fetch('/events.json')
      .then(response => response.json())
      .then(incomingData => setEvents(incomingData))
      .catch(error => console.error('Error loading events:', error));
  }, []);
  return (
    <div className="p-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Body</TableHead>
          <TableHead>Organizer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Max Attendees</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Is it public</TableHead>
          <TableHead>Tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.name}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.body}</TableCell>
            <TableCell>{event.organizer}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{event.thumbnail}</TableCell>
            <TableCell>{event.maxAttendees}</TableCell>
            <TableCell>{event.contact}</TableCell>
            <TableCell>{event.price}</TableCell>
            <TableCell>{event.isPublic ? "Yes" : "No"}</TableCell>
            <TableCell>{event.tags.join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  
  );

}

export default App;
