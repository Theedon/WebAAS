"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BookText } from "lucide-react";

type SubjectCardProps = {
  course: string | null;
  faculty: string | null;
};
function SubjectCard({ course, faculty }: SubjectCardProps) {
  return (
    <Card className="w-[350px] bg-primary text-xs md:text-sm">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-lg">
          <BookText />
        </CardTitle>
        {/* <CardDescription>Recommendation</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Course</Label>
            <div className="rounded-lg border p-3">{course ?? "Nil"}</div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Faculty</Label>
            <div className="rounded-lg border p-3 ">{faculty ?? "Nil"}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button variant={"outline"}>See full Recommendation</Button>
      </CardFooter>
    </Card>
  );
}

export default SubjectCard;
