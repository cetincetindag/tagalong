"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { toast } from "~/hooks/use-toast";

export default function CreateEventEntry() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [meetupPlace, setMeetupPlace] = useState("");
  const [meetupTime, setMeetupTime] = useState("");
  const [ticketStatus, setTicketStatus] = useState("need-to-purchase");
  const [ticketCount, setTicketCount] = useState("1");
  const [companionCount, setCompanionCount] = useState("unspecified");
  const [expectSelfPay, setExpectSelfPay] = useState(true);
  const [description, setDescription] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      eventName,
      eventDate,
      eventTime,
      eventLink,
      city,
      province,
      meetupPlace,
      meetupTime,
      ticketStatus,
      ticketCount,
      companionCount,
      expectSelfPay,
      description,
      minAge,
      maxAge,
    });
    toast({
      title: "Entry Created",
      description: "Your event companion entry has been created successfully!",
    });
    // Reset form (omitted for brevity)
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Event Entry</CardTitle>
        <CardDescription>
          Find companions for your upcoming event!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventLink">Event Link</Label>
              <Input
                id="eventLink"
                type="url"
                value={eventLink}
                onChange={(e) => setEventLink(e.target.value)}
                placeholder="https://example.com/event"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Event Time *</Label>
              <Input
                id="eventTime"
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province *</Label>
              <Input
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Enter province"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetupPlace">Meetup Place</Label>
              <Input
                id="meetupPlace"
                value={meetupPlace}
                onChange={(e) => setMeetupPlace(e.target.value)}
                placeholder="Enter meetup location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetupTime">Meetup Time</Label>
              <Input
                id="meetupTime"
                type="time"
                value={meetupTime}
                onChange={(e) => setMeetupTime(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Ticket Status</Label>
            <RadioGroup
              value={ticketStatus}
              onValueChange={setTicketStatus}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="purchased" id="purchased" />
                <Label htmlFor="purchased">Purchased</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="need-to-purchase"
                  id="need-to-purchase"
                />
                <Label htmlFor="need-to-purchase">Need to Purchase</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticketCount">Number of Tickets</Label>
            <Select value={ticketCount} onValueChange={setTicketCount}>
              <SelectTrigger>
                <SelectValue placeholder="Select ticket count" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companionCount">Number of Companions</Label>
            <Select value={companionCount} onValueChange={setCompanionCount}>
              <SelectTrigger>
                <SelectValue placeholder="Select companion count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unspecified">Unspecified</SelectItem>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="minAge">Minimum Age (Optional)</Label>
              <Input
                id="minAge"
                type="number"
                min="0"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                placeholder="Enter minimum age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAge">Maximum Age (Optional)</Label>
              <Input
                id="maxAge"
                type="number"
                min="0"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                placeholder="Enter maximum age"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="expectSelfPay"
              checked={expectSelfPay}
              onCheckedChange={setExpectSelfPay}
            />
            <Label htmlFor="expectSelfPay">
              Expect companions to pay for their own ticket
            </Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event and what kind of companion you're looking for"
            />
          </div>
          <Button type="submit" className="w-full">
            Create Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
