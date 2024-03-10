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

type SubjectCardProps = {
  course: string;
  faculty: string;
};
function SubjectCard({ course, faculty }: SubjectCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex items-center justify-center">
        <CardTitle> Recommendation</CardTitle>
        {/* <CardDescription>Recommendation</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Course</Label>
            <div className="rounded-lg border p-3">{course}</div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Faculty</Label>
            <div className="rounded-lg border p-3 ">{faculty}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button>See full Recommendation</Button>
      </CardFooter>
    </Card>
  );
}

export default SubjectCard;
