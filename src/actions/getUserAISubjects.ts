"use server";
import prisma from "@/backend/prisma/prisma";
import { stripData } from "@/lib/utils";
import { promptGoogleAI } from "@/backend/data-sources/promptGoogleAI";

export const getUserAISubjects = async (userId: string) => {
  "use server";
  const recommendationObj = await prisma.userToExam.findUnique({
    where: {
      clerk_id: userId,
    },
    select: {
      ai_recommendation: true,
    },
  });

  if (!recommendationObj || !recommendationObj.ai_recommendation)
    throw new Error("User has no AI recommendation yet");
  const fullRecommendation = recommendationObj.ai_recommendation.toString();

  const suggestedSubjectsPrompt = `
    Based on this output "${fullRecommendation}" you gave to me earlier:
    Please return a JSON format to me that has the user's most suitable courses and also the least suitable courses along with their corresponding faculties based on the Nigerian university system. An example of how it should look is the following JSON data
  
    "{
      "most_suitable_courses": [
        {"course": "Medicine", "faculty": "College of Medicine"},
        {"course": "Pharmacy", "faculty": "Faculty of Pharmacy"},
        {"course": "Computer Science", "faculty": "Faculty of Engineering"}
      ],
      "least_suitable_courses": [
        {"course": "History", "faculty": "Faculty of Arts"},
        {"course": "Philosophy", "faculty": "Faculty of Arts"},
        {"course": "Linguistics", "faculty": "Faculty of Arts"}
      ]
    }
    "   
    `;

  const suggestedSubjects = (await promptGoogleAI(
    suggestedSubjectsPrompt,
  )) as string;
  //   console.log(stripData(suggestedSubjects, "json"));
  const jsonSuggestedSubjects: SuggestedSubjectType = JSON.parse(
    stripData(suggestedSubjects, "json"),
  ) as SuggestedSubjectType;
  console.log(jsonSuggestedSubjects);

  const updateUser = await prisma.userToExam.upsert({
    where: {
      clerk_id: userId,
    },
    update: {
      rec_course_1: `${
        jsonSuggestedSubjects.most_suitable_courses[0].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[0].faculty ?? ""}`,
      rec_course_2: `${
        jsonSuggestedSubjects.most_suitable_courses[1].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[1].faculty ?? ""}`,
      rec_course_3: `${
        jsonSuggestedSubjects.most_suitable_courses[2].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[2].faculty ?? ""}`,

      anti_course_1: `${
        jsonSuggestedSubjects.least_suitable_courses[0].course ?? ""
      } | ${jsonSuggestedSubjects.least_suitable_courses[0].faculty ?? ""}`,
      anti_course_2: `${
        jsonSuggestedSubjects.least_suitable_courses[1].course ?? ""
      } | ${jsonSuggestedSubjects.least_suitable_courses[1].faculty ?? ""}`,
      anti_course_3: `${
        jsonSuggestedSubjects.least_suitable_courses[2].course ?? ""
      } | ${jsonSuggestedSubjects.least_suitable_courses[2].faculty ?? ""}`,
    },
    create: {
      clerk_id: userId,
      rec_course_1: `${
        jsonSuggestedSubjects.most_suitable_courses[0].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[0].faculty ?? ""}`,
      rec_course_2: `${
        jsonSuggestedSubjects.most_suitable_courses[1].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[1].faculty ?? ""}`,
      rec_course_3: `${
        jsonSuggestedSubjects.most_suitable_courses[2].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[2].faculty ?? ""}`,

      anti_course_1: `${
        jsonSuggestedSubjects.least_suitable_courses[0].course ?? ""
      } | ${jsonSuggestedSubjects.least_suitable_courses[0].faculty ?? ""}`,
      anti_course_2: `${
        jsonSuggestedSubjects.least_suitable_courses[1].course ?? ""
      } | ${jsonSuggestedSubjects.least_suitable_courses[1].faculty ?? ""}`,
      anti_course_3: `${
        jsonSuggestedSubjects.least_suitable_courses[2].course ?? ""
      } | ${jsonSuggestedSubjects.least_suitable_courses[2].faculty ?? ""}`,
    },
  });

  console.log("subjects recommendations added for user successfully");

  return `${JSON.stringify(jsonSuggestedSubjects)}`;
};

type SuggestedSubjectType = {
  most_suitable_courses: {
    course: string;
    faculty: string;
  }[];
  least_suitable_courses: {
    course: string;
    faculty: string;
  }[];
};
