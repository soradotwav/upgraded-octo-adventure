import { FormFill} from "@/components/form-fill";
import { EventTable } from "./eventTable";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";


export default function domPortal() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Header />
            <div className="flex flex-1">
                <FormFill />
                <EventTable />
            </div>
        </div>

    )
}