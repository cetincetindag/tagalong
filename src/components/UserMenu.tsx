"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";

interface Request {
  id: string;
  eventName: string;
  requesterName: string;
  status: "pending" | "answered" | "approved" | "rejected";
}

const mockRequests: Request[] = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    requesterName: "Alice",
    status: "pending",
  },
  {
    id: "2",
    eventName: "Tech Conference 2023",
    requesterName: "Bob",
    status: "answered",
  },
  {
    id: "3",
    eventName: "Local Food Festival",
    requesterName: "Charlie",
    status: "approved",
  },
  {
    id: "4",
    eventName: "Art Gallery Opening",
    requesterName: "David",
    status: "rejected",
  },
];

export default function UserMenu() {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = (request: Request) => {
    setRequests(
      requests.map((r) =>
        r.id === request.id ? { ...r, status: "approved" } : r,
      ),
    );
    toast({
      title: "Request Approved",
      description: `You've approved ${request.requesterName}'s request for ${request.eventName}.`,
    });
  };

  const handleReject = (request: Request) => {
    setSelectedRequest(request);
  };

  const confirmReject = () => {
    if (selectedRequest) {
      setRequests(
        requests.map((r) =>
          r.id === selectedRequest.id ? { ...r, status: "rejected" } : r,
        ),
      );
      toast({
        title: "Request Rejected",
        description: `You've rejected ${selectedRequest.requesterName}'s request for ${selectedRequest.eventName}.`,
      });
      setSelectedRequest(null);
      setRejectionReason("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Requests</CardTitle>
        <CardDescription>Manage your event requests and posts</CardDescription>
      </CardHeader>
      <CardContent>
        {requests.map((request) => (
          <div key={request.id} className="mb-4 rounded border p-4">
            <h3 className="font-semibold">{request.eventName}</h3>
            <p>Requester: {request.requesterName}</p>
            <p>Status: {request.status}</p>
            {request.status === "pending" && (
              <div className="mt-2">
                <Button onClick={() => handleApprove(request)} className="mr-2">
                  Approve
                </Button>
                <Button variant="outline" onClick={() => handleReject(request)}>
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
      <Dialog
        open={selectedRequest !== null}
        onOpenChange={(open) => !open && setSelectedRequest(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this request? You can provide a
              reason if you'd like.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection (optional)"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
              Cancel
            </Button>
            <Button onClick={confirmReject}>Confirm Rejection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
