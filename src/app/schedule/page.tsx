"use client";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

function SchedulePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex items-center justify-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
}

export default SchedulePage;
