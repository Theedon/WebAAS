import { QuestionType } from "@/components/assessment/Assessment";
import prisma from "../prisma/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { stripData } from "@/lib/utils";

const promptGoogleAI = async (prompt: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_API_KEY as string,
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};

async function updateSubjectNames(
  questionsArray: QuestionType[],
): Promise<QuestionType[]> {
  const updatedQuestions: QuestionType[] = [];
  for (const question of questionsArray) {
    const { subject_id, ...rest } = question;
    try {
      const subject = await prisma.subject.findUnique({
        where: {
          id: subject_id,
        },
      });
      if (subject) {
        const updatedQuestion: QuestionType = {
          ...rest,
          subject_id: subject.name,
        };
        updatedQuestions.push(updatedQuestion);
      } else {
        console.error(`Subject not found for subject_id: ${subject_id}`);
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  }

  return updatedQuestions;
}

const constructString = (assesmentInfo: QuestionType[]): string => {
  const constructArray = assesmentInfo.map((exam) => {
    return `In the subject ${exam.subject_id}, to ${
      exam.question
    }, the student's answer was ${
      exam.choice || "nil"
    }, the correct answer is ${exam.correct_option}.`;
  });

  return constructArray.join("; ");
};

export const getAIRecommendations = async (
  userId: string,
  assesmentInfo: QuestionType[],
) => {
  const assesmentWithSubjectNames = await updateSubjectNames(assesmentInfo);
  const questionStringArray = constructString(assesmentWithSubjectNames);
  const userNameObj = await prisma.user.findFirst({
    where: {
      clerk_id: userId,
    },
    select: { first_name: true },
  });

  const fullRecommendationPrompt = `
  You are an esteemed academic advisor in the Nigerian University system, ANd i am a student called ${userNameObj.first_name} who needs your assistance in navigating a crucial decision: choosing a university course post-secondary school for a Nigerian University. I will provide you with their test results for analysis across five subjects, revealing strengths and weaknesses in details. Your mission is to offer insights into courses that align with my abilities and recommend the top three college courses tailored to my strengths. Remember, you're addressing me directly, so be honest and as helpful as possible. Please provide as much information as you can. Ensure your response is in pure markdown.

  Here are my test results: "${questionStringArray}"
  
  Please organize your response into three bold headings: Analysis of Test Results, Recommended Courses, Least Suitable, Additional Considerations. Add spaces after each heading and make sure that the headings are centered on their lines. Ensure to refer to the student by name and also ensure that you return exactly three recommended courses and three least suitable courses
  "${questionStringArray}"    
  `;
  const fullRecommendation = await promptGoogleAI(fullRecommendationPrompt);

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

  const suggestedSubjects = await promptGoogleAI(suggestedSubjectsPrompt);
  console.log(stripData(suggestedSubjects, "json"));
  const jsonSuggestedSubjects: SuggestedSubjectType = JSON.parse(
    stripData(suggestedSubjects, "json"),
  );
  console.log(jsonSuggestedSubjects);

  const updateUser = await prisma.userToExam.upsert({
    where: {
      clerk_id: userId,
    },
    update: {
      ai_recommendation: Buffer.from(fullRecommendation),
      taken_exam: true,
      test_information: Buffer.from(questionStringArray),
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
        jsonSuggestedSubjects.most_suitable_courses[0].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[0].faculty ?? ""}`,
      anti_course_2: `${
        jsonSuggestedSubjects.most_suitable_courses[1].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[1].faculty ?? ""}`,
      anti_course_3: `${
        jsonSuggestedSubjects.most_suitable_courses[2].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[2].faculty ?? ""}`,
    },
    create: {
      clerk_id: userId,
      ai_recommendation: Buffer.from(fullRecommendation),
      taken_exam: true,
      test_information: Buffer.from(questionStringArray),
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
        jsonSuggestedSubjects.most_suitable_courses[0].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[0].faculty ?? ""}`,
      anti_course_2: `${
        jsonSuggestedSubjects.most_suitable_courses[1].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[1].faculty ?? ""}`,
      anti_course_3: `${
        jsonSuggestedSubjects.most_suitable_courses[2].course ?? ""
      } | ${jsonSuggestedSubjects.most_suitable_courses[2].faculty ?? ""}`,
    },
  });

  console.log("recommendation added for user successfully");

  // console.log`${jsonSuggestedSubjects} | ${fullRecommendation}`;
  return `${fullRecommendation} | ${jsonSuggestedSubjects}`;
};

type SuggestedSubjectType = {
  most_suitable_courses: {
    course: string;
    faculty: string;
  }[];
  least_suitable_course: {
    course: string;
    faculty: string;
  }[];
};
