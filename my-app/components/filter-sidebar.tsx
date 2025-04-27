import { Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {allInterestTags} from "@/components/manage-interests-dialog";
import {useState} from "react";

const initialFilters = {
  tags: [] as string[],
  startDate: null as string | null,
  club: "all",
  distance: 10,
  eventTypes: [] as string[],
};

export function FilterSidebar({
                                filters,
                                setFilters,
                              }: {
  filters: typeof initialFilters;
  setFilters: React.Dispatch<React.SetStateAction<typeof initialFilters>>;
}) {
  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <aside className="w-72 border-r bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#4b2e83]">Filters</h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-700">Event Tags</h3>
          <div className="flex flex-wrap gap-2">
            {(showAllTags ? allInterestTags : allInterestTags.slice(0, 6)).map((tag) => (
                <Badge
                    key={tag}
                    onClick={() => {
                      if (filters.tags.includes(tag)) {
                        setFilters(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
                      } else {
                        setFilters(prev => ({ ...prev, tags: [...prev.tags, tag] }));
                      }
                    }}
                    variant="outline"
                    className={`hover:cursor-pointer ${
                        filters.tags.includes(tag)
                            ? "bg-[#4b2e83]/10 text-[#4b2e83] hover:bg-[#4b2e83]/20 border-[#4b2e83]"
                            : "bg-[#4b2e83]/10 text-[#4b2e83] hover:bg-[#4b2e83]/20"
                    }`}
                >
                  {tag}
                </Badge>
            ))}
          </div>
          {allInterestTags.length > 6 && (
              <p
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="mt-3 text-xs font-medium text-[#4b2e83] hover:underline hover:cursor-pointer select-none"
              >
                {showAllTags ? "Show Less" : "Show More"}
              </p>
          )}
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
            {["In-Person", "Virtual", "Hybrid"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                      id={type}
                      checked={filters.eventTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        setFilters(prev => ({
                          ...prev,
                          eventTypes: checked
                              ? [...prev.eventTypes, type]
                              : prev.eventTypes.filter(t => t !== type),
                        }));
                      }}
                  />
                  <Label htmlFor={type} className="text-sm">{type}</Label>
                </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
