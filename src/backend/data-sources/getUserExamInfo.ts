import { UserToExam } from "@prisma/client";
import prisma from "../prisma/prisma";

export const getUserExamInfo = async (userId: string) => {
  try {
    const user: UserToExam | null = await prisma.userToExam.findUnique({
      where: {
        clerk_id: userId,
      },
      select: {
        test_information: true,
        ai_recommendation: true,
        rec_course_1: true,
        rec_course_2: true,
        rec_course_3: true,
        anti_course_1: true,
        anti_course_2: true,
        anti_course_3: true,
        taken_exam: true,
      },
    });

    // Check if the user was found
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    // Handle potential conversion errors gracefully
    try {
      user.test_information = user.test_information.toString();
      user.ai_recommendation = user.ai_recommendation.toString();
    } catch (err) {
      console.error("Error converting data:", err);
      // Consider setting default values or logging a specific error message
      user.test_information = null;
      user.ai_recommendation = null;
    }

    return user;
  } catch (error: any) {
    console.error("Error in getUserExamInfo:", error);
    // Return an appropriate error object (e.g., { success: false, error: '...' })
    return { success: false, error: error.message };
  }
};
