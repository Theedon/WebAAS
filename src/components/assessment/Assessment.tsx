"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, MouseEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import QuestionButton from "@/components/assessment/QuestionButton";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuestionType } from "@/app/assessment/page";

type AssessmentProps = {
  questionsData: QuestionType[];
};
function Assessment({ questionsData }: AssessmentProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);

  const goToPreviousQuestion = (event: MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionId > 0) {
      setCurrentQuestionId(currentQuestionId - 1);
    }
  };

  const goToNextQuestion = (event: MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionId < questionsData.length - 1) {
      setCurrentQuestionId(currentQuestionId + 1);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-xl font-semibold">
        Question {questionsData[currentQuestionId].id}
      </h2>

      <div className="flex flex-col">
        <p>{questionsData[currentQuestionId].questionBody}</p>
        <RadioGroup defaultValue="">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="A" id="A" />
            <Label htmlFor="A">
              {questionsData[currentQuestionId].option_a}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="B" id="B" />
            <Label htmlFor="B">
              {questionsData[currentQuestionId].option_b}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="C" id="C" />
            <Label htmlFor="C">
              {questionsData[currentQuestionId].option_c}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="D" id="D" />
            <Label htmlFor="D">
              {questionsData[currentQuestionId].option_d}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <section className="grid w-full grid-cols-2">
        <Button
          onClick={goToPreviousQuestion}
          variant={"outline"}
          className="mr-auto w-fit p-10"
        >
          <ArrowBigLeft className="size-14" />
        </Button>
        <Button
          onClick={goToNextQuestion}
          variant={"outline"}
          className="ml-auto w-fit p-10"
        >
          <ArrowBigRight className="size-14" />
        </Button>
      </section>

      <section className="my-5 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] place-items-center gap-4 rounded-md border border-secondary bg-card-foreground p-5 shadow-sm">
        {questionsData.map((question: QuestionType, index) => (
          <QuestionButton
            isAnswered={true}
            key={question.id}
            onClick={() => {
              setCurrentQuestionId(question.id - 1);
            }}
          >
            {question.id}
          </QuestionButton>
        ))}
      </section>
    </div>
  );
}

export default Assessment;
