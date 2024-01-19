"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import type { QuestionType } from "@/app/assessment/page";
import AssesmentNavigation from "./navigation";

type AssessmentProps = {
  questionsData: QuestionType[];
};

type OptionsProp = {
  id: number;
  chosenOption: string;
  correctAnswer: string;
};
function Assessment({ questionsData }: AssessmentProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);

  const editQuestionsData = questionsData.map((question, index) => {
    return {
      index,
      questionId: question.id,
      choice: "",
      correctChoice: question.correct_option,
    };
  });

  const [options, setOptions] = useState<
    {
      index: number;
      questionId: number;
      choice: string;
      correctChoice: string;
    }[]
  >(editQuestionsData);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-xl font-semibold">
        Question {questionsData[currentQuestionId]?.id}
      </h2>

      <div className="flex flex-col">
        <p>{questionsData[currentQuestionId]?.questionBody}</p>
        <RadioGroup
          value={
            options.find((opt) => opt.questionId === currentQuestionId)?.choice
          }
          name={`radioGroup${currentQuestionId}`}
          onValueChange={(newValue: string) => {}}
        >
          {[
            questionsData[currentQuestionId]?.option_a,
            questionsData[currentQuestionId]?.option_b,
            questionsData[currentQuestionId]?.option_c,
            questionsData[currentQuestionId]?.option_d,
          ].map((option: string) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={`${currentQuestionId}_${option}`}
              />
              <Label htmlFor={`${currentQuestionId}_${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <AssesmentNavigation
        currentQuestionId={currentQuestionId}
        questionsData={questionsData}
        setCurrentQuestionId={setCurrentQuestionId}
      />
    </div>
  );
}

export default Assessment;
