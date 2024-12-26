import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreateEventEntry from "~/components/CreateEventEntry";
import EventEntryList from "~/components/EventEntryList";
import EventFilter from "~/components/EventFilter";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">TagAlong</h1>
      <Tabs defaultValue="browse">
        <TabsList className="mb-4">
          <TabsTrigger value="browse">Browse Events</TabsTrigger>
          <TabsTrigger value="create">Create Event</TabsTrigger>
        </TabsList>
        <TabsContent value="browse">
          <div className="space-y-8">
            <EventFilter />
            <EventEntryList />
          </div>
        </TabsContent>
        <TabsContent value="create">
          <CreateEventEntry />
        </TabsContent>
      </Tabs>
    </div>
  );
}
