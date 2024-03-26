import { dateWrangler } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type EventCardProps = {
  title: string;
  description: string;
  date: Date;
  creatorName?: string;
};
function EventCard({ title, description, date, creatorName }: EventCardProps) {
  return (
    <Card className="bg-gray-100 text-black">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="gap-3">
        <p>{dateWrangler(date)}</p>
        <p className="font-semibold">{creatorName}</p>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Delete</Button>
        <Button>View</Button>
      </CardFooter> */}
    </Card>
  );
}

export default EventCard;
