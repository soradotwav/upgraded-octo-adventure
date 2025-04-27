import {toast} from "sonner";
import {Check} from "lucide-react";

export const confirmRSVP = (eventTitle: string, isRsvped: boolean) => {
    if (!isRsvped) {
        toast(
            <div className="flex items-center gap-2 text-white pb-2">
                <Check className="h-5 w-5 text-[#b7a57a]" />
                <span className="font-semibold text-white">RSVP Confirmed!</span>
            </div>,
            {
                description: (
                    <span className="text-white">{`You're going to ${eventTitle}. We've added this event to your calendar.`}</span>
                ),
                duration: 2000,
                className: "group",
                style: {
                    backgroundColor: '#4b2e83',
                    color: '#ffffff',
                    border: 'none',
                }
            }
        )
    }
}