"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { allInterestTags } from "@/components/manage-interests-dialog"
import { useEffect } from "react";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import MultipleSelector from "@/components/ui/multiple-selector";

interface CreateEventDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleCreateEvent = () => {
        toast.success("Event created successfully!", {
            description: `${title || "Your event"} is now listed! 🎉`
        });
        onOpenChange(false);
    };

    useEffect(() => {
        if (!open) {
            setTitle("");
            setDate("");
            setTime("");
            setLocation("");
            setType("");
            setOrganizer("");
            setDescription("");
            setSelectedTags([]);
        }
    }, [open]);

    const handleToggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prev => prev.filter(t => t !== tag));
        } else {
            setSelectedTags(prev => [...prev, tag]);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#4b2e83]">Create a new Event</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Event Title</Label>
                        <Input placeholder="Enter event title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Time</Label>
                            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input placeholder="Enter location or Virtual" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Event Type</Label>
                        <Select value={type} onValueChange={(value) => setType(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="In-Person">In-Person</SelectItem>
                                <SelectItem value="Virtual">Virtual</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Organizer</Label>
                        <Input placeholder="Organizer name or club" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Enter event description..." rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div>
                        <MultipleSelector
                            options={allInterestTags.map((tag) => ({ label: tag, value: tag }))}
                            selected={selectedTags}
                            onChange={setSelectedTags}
                            placeholder="Select tags..."
                            maxSelected={10}
                            hidePlaceholderWhenSelected
                            emptyIndicator="No matching tags found."
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateEvent}
                        className="bg-[#4b2e83] hover:bg-[#4b2e83]/90 hover:cursor-pointer"
                    >
                        Create Event
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
