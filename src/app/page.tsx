import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreateEventEntry from "~/components/CreateEventEntry";
import EventEntryList from "~/components/EventEntryList";
import EventFilter from "~/components/EventFilter";
import UserMenu from "~/components/UserMenu";

const HomePage = () => {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 font-mono text-3xl font-bold">
        TagAlong - development build
      </h1>
      <Tabs defaultValue="browse">
        <TabsList className="mb-4">
          <TabsTrigger value="browse">Browse Events</TabsTrigger>
          <TabsTrigger value="create">Create Event</TabsTrigger>
          <TabsTrigger value="requests">Your Requests</TabsTrigger>
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
        <TabsContent value="requests">
          <UserMenu />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
