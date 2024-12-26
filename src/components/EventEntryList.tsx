"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { toast } from "~/hooks/use-toast";

interface EventEntry {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  city: string;
  province: string;
  ticketStatus: "purchased" | "need-to-purchase";
  ticketCount: number;
  companionCount: number | "unspecified";
  expectSelfPay: boolean;
  minAge: number | null;
  maxAge: number | null;
}

const mockEntries: EventEntry[] = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    eventDate: "2023-07-15",
    eventTime: "14:00",
    city: "Toronto",
    province: "Ontario",
    ticketStatus: "purchased",
    ticketCount: 2,
    companionCount: 1,
    expectSelfPay: false,
    minAge: 18,
    maxAge: 30,
  },
  {
    id: "2",
    eventName: "Tech Conference 2023",
    eventDate: "2023-09-22",
    eventTime: "09:00",
    city: "Vancouver",
    province: "British Columbia",
    ticketStatus: "need-to-purchase",
    ticketCount: 1,
    companionCount: "unspecified",
    expectSelfPay: true,
    minAge: 21,
    maxAge: null,
  },
  {
    id: "3",
    eventName: "Local Food Festival",
    eventDate: "2023-08-05",
    eventTime: "11:00",
    city: "Montreal",
    province: "Quebec",
    ticketStatus: "purchased",
    ticketCount: 3,
    companionCount: 2,
    expectSelfPay: true,
    minAge: null,
    maxAge: null,
  },
  {
    id: "4",
    eventName: "Art Gallery Opening",
    eventDate: "2023-07-30",
    eventTime: "19:00",
    city: "Ottawa",
    province: "Ontario",
    ticketStatus: "need-to-purchase",
    ticketCount: 2,
    companionCount: 1,
    expectSelfPay: false,
    minAge: 25,
    maxAge: 40,
  },
  {
    id: "5",
    eventName: "Outdoor Movie Night",
    eventDate: "2023-08-12",
    eventTime: "20:30",
    city: "Calgary",
    province: "Alberta",
    ticketStatus: "purchased",
    ticketCount: 4,
    companionCount: 3,
    expectSelfPay: true,
    minAge: null,
    maxAge: 35,
  },
];

export default function EventEntryList() {
  const [entries, setEntries] = useState<EventEntry[]>(mockEntries);
  const [selectedEntry, setSelectedEntry] = useState<EventEntry | null>(null);

  const handleTagAlong = (entry: EventEntry) => {
    setSelectedEntry(entry);
  };

  const sendTagAlongRequest = () => {
    // Here you would send the request to the backend
    console.log("Sending tag along request for entry:", selectedEntry);
    toast({
      title: "Request Sent",
      description: "Your tag along request has been sent to the event creator.",
    });
    setSelectedEntry(null);
  };

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <CardTitle>{entry.eventName}</CardTitle>
            <CardDescription>
              {entry.eventDate} at {entry.eventTime}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {entry.city}, {entry.province}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge
                variant={
                  entry.ticketStatus === "purchased" ? "default" : "secondary"
                }
              >
                {entry.ticketStatus === "purchased"
                  ? "Tickets Purchased"
                  : "Needs Tickets"}
              </Badge>
              <Badge variant="outline">{entry.ticketCount} ticket(s)</Badge>
              <Badge variant="outline">
                {entry.companionCount === "unspecified"
                  ? "Any number of companions"
                  : `${entry.companionCount} companion(s)`}
              </Badge>
              {(entry.minAge || entry.maxAge) && (
                <Badge variant="outline">
                  Age: {entry.minAge || "0"} - {entry.maxAge || "∞"}
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleTagAlong(entry)}>Tag Along</Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog
        open={selectedEntry !== null}
        onOpenChange={(open) => !open && setSelectedEntry(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tag Along Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to send a tag along request for{" "}
              {selectedEntry?.eventName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEntry(null)}>
              Cancel
            </Button>
            <Button onClick={sendTagAlongRequest}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
