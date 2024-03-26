"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import AssesmentNavigation from "./navigation";
import { TestQuestionsQuery } from "@/app/assessment/__generated__/page.generated";
import { Button } from "../ui/button";
import { Loader2, SendHorizonalIcon } from "lucide-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  SaveExamMutation,
  SaveExamMutationVariables,
} from "./__generated__/Assessment.generated";
import { getUserAISubjects } from "@/actions/getUserAISubjects";
import { getAIRec } from "@/lib/getAIRec";
import { saveUserRecommendation } from "@/actions/saveUserRecommendation";
type AssessmentProps = {
  userId: string;
  questionsData: TestQuestionsQuery;
};

export type QuestionType = {
  id: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  question: string;
  subject_id: string;
  correct_option: string;
  index: number;
  choice: string;
};

function Assessment({ userId, questionsData }: AssessmentProps) {
  const SAVE_EXAM = gql`
    mutation SaveExam(
      $userId: String!
      $assessmentInfo: [AssessmentInfoInput!]!
    ) {
      saveExam(userId: $userId, assessmentInfo: $assessmentInfo)
    }
  `;

  const [saveMutation, { error }] = useMutation<
    SaveExamMutation,
    SaveExamMutationVariables
  >(SAVE_EXAM);
  const [testSubmitting, setTestSubmitting] = useState<boolean>(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const processQuestionsData = (questionsData: TestQuestionsQuery) => {
    const processedData = [];
    for (const subjectArray of questionsData.testQuestions) {
      processedData.push(...subjectArray);
    }
    const filteredQuestionsData: QuestionType[] = processedData.map(
      (question, index) => {
        return {
          id: question.id,
          option_a: question.option_a ?? "",
          option_b: question.option_b ?? "",
          option_c: question.option_c ?? "",
          option_d: question.option_d ?? "",
          question: question.question,
          subject_id: question.subject_id ?? "",
          correct_option: question.correct_option ?? "",
          index,
          choice: "",
        };
      },
    );
    return filteredQuestionsData;
  };

  const filteredQuestionsData = processQuestionsData(questionsData);

  const [options, setOptions] = useState<QuestionType[]>(filteredQuestionsData);

  const router = useRouter();
  const checkIfExamIsCompleted = (options: QuestionType[]) => {
    for (const option of options) {
      if (option.choice !== "" || option.choice !== null) {
        return false;
      }
    }
    return true;
  };
  const submitExam = async () => {
    if (
      process.env.USE_RIGID_RULES === "TRUE" &&
      !checkIfExamIsCompleted(options)
    ) {
      alert("please answer every question in assesment");
      return;
    }
    setTestSubmitting(true);

    try {
      const saveQuestionsData = await saveMutation({
        variables: {
          userId: userId,
          assessmentInfo: options,
        },
      });

      if (saveQuestionsData?.data?.saveExam) {
        const recommendation = await getAIRec(saveQuestionsData.data.saveExam);
        console.log("Recommendation retrieved successfully");

        await saveUserRecommendation(userId, recommendation);
        console.log("Recommendation saved to db successfully");

        await getUserAISubjects(userId);
        console.log("Subjects gotten successfully");

        router.replace("/results");
      } else {
        // Handle non-errorful but unsuccessful responses (optional)
        console.warn("Assessment submitted but did not receive expected data");
        // Display a user-friendly message or take alternative actions
      }
    } catch (error) {
      // Handle errors here
      console.error("Error submitting assessment:", error);
      // Display a user-friendly error message to the user (e.g., using Toast or an alert)
      // Offer options to retry or provide specific troubleshooting steps
      // Log the error for debugging and potential reporting
    } finally {
      setTestSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex justify-between">
        <h2 className="text-xl font-semibold">
          Question {filteredQuestionsData[currentQuestionIndex].index + 1}
        </h2>
        <Button
          className="h-400px rounded-none"
          variant={"default"}
          size={"sm"}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={submitExam}
          disabled={testSubmitting}
        >
          {testSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <p>SUBMIT</p>
          )}{" "}
          <SendHorizonalIcon />
        </Button>
      </section>

      <div className="flex flex-col">
        <p>{filteredQuestionsData[currentQuestionIndex]?.question}</p>
        <RadioGroup
          value={
            options.find((opt) => opt.index === currentQuestionIndex)?.choice
          }
          name={`radioGroup${currentQuestionIndex}`}
          onValueChange={(newValue: string) => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.index == currentQuestionIndex) {
                  return {
                    ...option,
                    choice: newValue,
                  };
                }
                return option;
              });
            });
          }}
        >
          {[
            filteredQuestionsData[currentQuestionIndex].option_a,
            filteredQuestionsData[currentQuestionIndex].option_b,
            filteredQuestionsData[currentQuestionIndex].option_c,
            filteredQuestionsData[currentQuestionIndex].option_d,
          ].map((option: string) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={`${currentQuestionIndex}_${option}`}
              />
              <Label htmlFor={`${currentQuestionIndex}_${option}`}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <AssesmentNavigation
        currentQuestionId={currentQuestionIndex}
        questionsData={options}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}

export default Assessment;
