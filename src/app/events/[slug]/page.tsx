import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

const EVENT_QUERY = defineQuery(`*[
    _type == "event" &&
    slug.current == $slug
  ][0]{
  ...,
  "date": coalesce(date, now()),
  "doorsOpen": coalesce(doorsOpen, 0),
  "format": coalesce(format, "in-person"),
  headline->,
  venue->
}`);

export default async function EventPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { data: event } = await sanityFetch({
        query: EVENT_QUERY,
        params: await params,
    });
    if (!event) {
        notFound();
    }
    const {
        name,
        date,
        format,
        doorsOpen,
        venue,
    } = event;
   
    const eventDate = new Date(date).toDateString();
    const eventTime = new Date(date).toLocaleTimeString();
    const doorsOpenTime = new Date(
        new Date(date).getTime() - doorsOpen * 60000
    ).toLocaleTimeString();

    return (
        <main className="container mx-auto grid gap-12 p-12">
            <div className="mb-4">
                <Link href="/">← Back to events</Link>
            </div>
            <div className="grid items-top gap-12 sm:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-4">
                        {format ? (
                            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 capitalize">
                                {format.replace("-", " ")}
                            </div>
                        ) : null}
                        {name ? (
                            <h1 className="text-4xl font-bold tracking-tighter mb-8">
                                {name}
                            </h1>
                        ) : null}
                        <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                            <dd className="font-semibold">Date</dd>
                            <div>
                                {eventDate && <dt>{eventDate}</dt>}
                                {eventTime && <dt>{eventTime}</dt>}
                            </div>
                        </dl>
                        {doorsOpenTime ? (
                            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                                <dd className="font-semibold">Doors Open</dd>
                                <div className="grid gap-1">
                                    <dt>Doors Open</dt>
                                    <dt>{doorsOpenTime}</dt>
                                </div>
                            </dl>
                        ) : null}
                        {venue?.name ? (
                            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                                <div className="flex items-start">
                                    <dd className="font-semibold">Venue</dd>
                                </div>
                                <div className="grid gap-1">
                                    <dt>{venue.name}</dt>
                                </div>
                            </dl>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    );
}