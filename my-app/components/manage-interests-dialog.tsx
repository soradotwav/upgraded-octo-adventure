"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {toast} from "sonner";
import {useUser} from "@/hooks/useUser";

const allInterestTags = [
  "Academic",
  "Arts",
  "Career",
  "Community Service",
  "Cultural",
  "Engineering",
  "Entertainment",
  "Environmental",
  "Finance",
  "Food",
  "Gaming",
  "Health",
  "Humanities",
  "International",
  "Leadership",
  "LGBTQ+",
  "Music",
  "Networking",
  "Outdoors",
  "Politics",
  "Research",
  "Science",
  "Social",
  "Sports",
  "STEM",
  "Technology",
  "Wellness",
  "Workshop",
]

interface ManageInterestsDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  currentInterests: string[]
  onInterestsChangeAction: (interests: string[]) => void
}

export default function ManageInterestsDialog({
  open,
  onOpenChangeAction,
  currentInterests,
  onInterestsChangeAction,
}: ManageInterestsDialogProps) {
  const [interests, setInterests] = useState<string[]>(currentInterests)
  const [searchQuery, setSearchQuery] = useState("")
  const {user, setUser} = useUser()

  // Filter tags based on search query
  const filteredTags = allInterestTags.filter(
    (tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()) && !interests.includes(tag),
  )

  const handleAddInterest = (tag: string) => {
    if (interests.length >= 10) {
      toast.warning(<p>Maximum interest amount reached</p>, {description: "You cannot only add up to 10 interests."})
      return
    }

    setInterests([...interests, tag])
  }

  const handleRemoveInterest = (tag: string) => {
    setInterests(interests.filter((t) => t !== tag))
  }

  const handleSave = () => {
    if (user) {
      setUser(prev => prev ? { ...prev, interests: interests } : null);
      toast.success(<p>Interests updated!</p>, {
        description: "Your personalized interests have been saved.",
      });
    }
    onInterestsChangeAction(interests);
    onOpenChangeAction(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#4b2e83]">Manage Your Interests</DialogTitle>
          <DialogDescription>
            Select interests to personalize your event recommendations. You can select up to 10 interests.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current interests */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Your Interests ({interests.length}/10)</h3>
            <div className="flex flex-wrap gap-2">
              {interests.length > 0 ? (
                interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="bg-[#4b2e83]/10 pl-2 pr-1 flex items-center gap-1"
                  >
                    {interest}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full p-0 hover:bg-[#4b2e83]/20"
                      onClick={() => handleRemoveInterest(interest)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {interest}</span>
                    </Button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No interests selected. Add some below.</p>
              )}
            </div>
          </div>

          {/* Search and add interests */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Add Interests</h3>
            <Input
              placeholder="Search interests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-3"
            />

            <ScrollArea className="h-[200px] rounded-md border p-2">
              <div className="grid grid-cols-2 gap-2">
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className ="justify-start font-normal"
                      onClick={() => handleAddInterest(tag)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {tag}
                    </Button>
                  ))
                ) : (
                  <p className="col-span-2 text-center text-sm text-gray-500 py-4">
                    {searchQuery ? "No matching interests found" : "All available interests are already selected"}
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChangeAction(false)}>
            Cancel
          </Button>
          <Button className="bg-[#4b2e83] hover:bg-[#4b2e83]/90" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
