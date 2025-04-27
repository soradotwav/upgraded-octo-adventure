import { Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function FormFill() {
  return (
    <aside className="w-72 border-r bg-white p-6 sticky top-16 h-fit">
      <h2  className="mb-4 text-lg font-semibold text-[#4b2e83]">Compose an Event</h2>

      <div className="space-y-2">
        <h3 className="mb-1 text-sm font-medium text-gray-700">Event Name</h3>
        <Input></Input>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Body/Description</h3>
        <Input></Input>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Location</h3>
        <Input></Input>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Max Attendees</h3>
        <Input></Input>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Price</h3>
        <Input></Input>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Organizer</h3>
        <Input></Input>
        <h3 className="mb-1 text-sm font-medium text-gray-700">Contact</h3>
        <Input></Input>
        <div>
          <h3 className="mb-1 text-sm font-medium text-gray-700">Event Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-[#4b2e83]/10 hover:bg-[#4b2e83]/20">
              Academic
            </Badge>
            <Badge variant="outline" className="bg-[#b7a57a]/10 hover:bg-[#b7a57a]/20">
              Sports
            </Badge>
            <Badge variant="outline" className="bg-[#4b2e83]/10 hover:bg-[#4b2e83]/20">
              Arts
            </Badge>
            <Badge variant="outline" className="bg-[#b7a57a]/10 hover:bg-[#b7a57a]/20">
              Social
            </Badge>
            <Badge variant="outline" className="bg-[#4b2e83]/10 hover:bg-[#4b2e83]/20">
              Career
            </Badge>
            <Badge variant="outline" className="bg-[#b7a57a]/10 hover:bg-[#b7a57a]/20">
              Workshop
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Date Range</h3>
          <div className="flex items-center gap-2">
            <Input type="date" className="h-9" />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Club Affiliation</h3>
          <Select>
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="All Clubs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clubs</SelectItem>
              <SelectItem value="cs">Computer Science Club</SelectItem>
              <SelectItem value="business">Business Association</SelectItem>
              <SelectItem value="arts">Arts Collective</SelectItem>
              <SelectItem value="sports">Sports Federation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Distance from Campus</h3>
            <span className="text-xs text-gray-500">5 miles</span>
          </div>
          <Slider defaultValue={[5]} max={10} step={1} className="py-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>On Campus</span>
            <span>10 miles</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Event Type</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="in-person" />
              <Label htmlFor="in-person" className="text-sm">
                In-Person
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="virtual" />
              <Label htmlFor="virtual" className="text-sm">
                Virtual
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hybrid" />
              <Label htmlFor="hybrid" className="text-sm">
                Hybrid
              </Label>
            </div>
          </div>
        </div>
        <div className="p-2">
          <input
            type="file"
            className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
        </div>
        <Button className="flex space-x-2 w-full bg-[#4b2e83] hover:bg-[#4b2e83]/90">Submit</Button>
        <Button className="flex space-x-2 w-full bg-[#4b2e83] hover:bg-[#4b2e83]/90">Save as Draft</Button>



      </div>
    </aside>
  )
}
