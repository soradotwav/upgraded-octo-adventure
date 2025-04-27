"use client"

import {useEffect, useState} from "react"
import { Check, Search, Users } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {toast} from "sonner";
import {useUser} from "@/hooks/useUser";

// Sample organization data
export const organizationsData = [
    {
        id: "1",
        name: "Computer Science Club",
        category: "Academic",
        members: 156,
        description: "A community for CS students to collaborate, learn, and network with industry professionals.",
        tags: ["Technology", "Academic", "Career"],
    },
    {
        id: "2",
        name: "Husky Running Club",
        category: "Sports",
        members: 89,
        description: "Join fellow Huskies for regular runs, training sessions, and participation in local races.",
        tags: ["Sports", "Wellness", "Outdoors"],
    },
    {
        id: "3",
        name: "Student Government",
        category: "Leadership",
        members: 42,
        description: "Represent student interests and organize campus-wide initiatives and events.",
        tags: ["Leadership", "Politics", "Community Service"],
    },
    {
        id: "4",
        name: "UW Photography Association",
        category: "Arts",
        members: 67,
        description: "Develop your photography skills through workshops, photo walks, and exhibitions.",
        tags: ["Arts", "Workshop", "Entertainment"],
    },
    {
        id: "5",
        name: "Environmental Action Coalition",
        category: "Environmental",
        members: 78,
        description: "Advocate for sustainability initiatives on campus and in the broader community.",
        tags: ["Environmental", "Community Service", "Activism"],
    },
    {
        id: "6",
        name: "International Student Association",
        category: "Cultural",
        members: 112,
        description: "Celebrate cultural diversity and provide support for international students.",
        tags: ["Cultural", "International", "Social"],
    },
    {
        id: "7",
        name: "UW Debate Team",
        category: "Academic",
        members: 34,
        description: "Participate in competitive debate tournaments and develop public speaking skills.",
        tags: ["Academic", "Leadership", "Politics"],
    },
    {
        id: "8",
        name: "Husky Game Development",
        category: "Technology",
        members: 45,
        description: "Design and develop games while learning industry-standard tools and techniques.",
        tags: ["Technology", "Gaming", "Arts"],
    },
]

interface JoinOrganizationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function JoinOrganizationDialog({
                                           open,
                                           onOpenChange,
                                       }: JoinOrganizationDialogProps) {
    const { user, setUser } = useUser();
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("browse")
    const [memberOrgs, setMemberOrgs] = useState<string[]>(user?.organizations ?? [])

    useEffect(() => {
        setMemberOrgs(user?.organizations ?? []);
    }, [user?.organizations]);

    // Filter organizations based on search query
    const filteredOrgs = organizationsData.filter(
        (org) =>
            org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    const handleJoinOrg = (orgName: string) => {
        if (!memberOrgs.includes(orgName)) {
            const updated = [...memberOrgs, orgName]
            setMemberOrgs(updated)
            setUser(u => u ? { ...u, organizations: updated } : null)
            toast.success(`${orgName} joined successfully!`, { description: "You're now a member." })
        }
    }

    const handleLeaveOrg = (orgName: string) => {
        const updated = memberOrgs.filter(o => o !== orgName)
        setMemberOrgs(updated)
        setUser(u => u ? { ...u, organizations: updated } : null)
        toast.warning(`Left ${orgName}`, { description: "You've left the organization." })
    }

    // Get member organizations data
    const myOrganizations = organizationsData.filter((org) => memberOrgs.includes(org.name))

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-[#4b2e83]">Organizations</DialogTitle>
                    <DialogDescription>
                        Join student organizations to connect with like-minded peers and participate in group activities.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="browse">Browse Organizations</TabsTrigger>
                            <TabsTrigger value="my-orgs">My Organizations</TabsTrigger>
                        </TabsList>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-[200px] pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <TabsContent value="browse" className="mt-4">
                        <ScrollArea className="h-[400px] rounded-md border">
                            <div className="p-4 space-y-4">
                                {filteredOrgs.length > 0 ? (
                                    filteredOrgs.map((org) => (
                                        <div key={org.id} className="flex flex-col space-y-3 rounded-lg border p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback className="bg-[#4b2e83] text-white">
                                                            {org.name
                                                                .split(" ")
                                                                .map((word) => word[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-medium text-[#4b2e83]">{org.name}</h3>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span>{org.category}</span>
                                                            <span>•</span>
                                                            <div className="flex items-center">
                                                                <Users className="mr-1 h-3 w-3" />
                                                                <span>{org.members} members</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant={memberOrgs.includes(org.name) ? "outline" : "default"}
                                                    size="sm"
                                                    className={memberOrgs.includes(org.name) ? "gap-1" : "bg-[#4b2e83] hover:bg-[#4b2e83]/90"}
                                                    onClick={() =>
                                                        memberOrgs.includes(org.name) ? handleLeaveOrg(org.name) : handleJoinOrg(org.name)
                                                    }
                                                >
                                                    {memberOrgs.includes(org.name) && <Check className="h-3.5 w-3.5" />}
                                                    {memberOrgs.includes(org.name) ? "Joined" : "Join"}
                                                </Button>
                                            </div>
                                            <p className="text-sm text-gray-600">{org.description}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {org.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline" className="bg-[#4b2e83]/5 text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <p className="text-center text-gray-500">No organizations found matching your search.</p>
                                        <Button variant="outline" className="mt-2" onClick={() => setSearchQuery("")}>
                                            Clear Search
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="my-orgs" className="mt-4">
                        {myOrganizations.length > 0 ? (
                            <ScrollArea className="h-[400px] rounded-md border">
                                <div className="p-4 space-y-4">
                                    {myOrganizations.map((org) => (
                                        <div key={org.id} className="flex flex-col space-y-3 rounded-lg border p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback className="bg-[#4b2e83] text-white">
                                                            {org.name
                                                                .split(" ")
                                                                .map((word) => word[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-medium text-[#4b2e83]">{org.name}</h3>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <span>{org.category}</span>
                                                            <span>•</span>
                                                            <div className="flex items-center">
                                                                <Users className="mr-1 h-3 w-3" />
                                                                <span>{org.members} members</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => handleLeaveOrg(org.name)}
                                                >
                                                    Leave
                                                </Button>
                                            </div>
                                            <p className="text-sm text-gray-600">{org.description}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {org.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline" className="bg-[#4b2e83]/5 text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-md border py-12">
                                <Users className="h-12 w-12 text-gray-300" />
                                <h3 className="mt-4 text-lg font-medium">No Organizations Joined</h3>
                                <p className="mt-1 text-center text-sm text-gray-500 max-w-md">
                                    You haven't joined any organizations yet. Browse and join organizations to connect with like-minded
                                    peers.
                                </p>
                                <Button className="mt-4 bg-[#4b2e83] hover:bg-[#4b2e83]/90" onClick={() => setActiveTab("browse")}>
                                    Browse Organizations
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
