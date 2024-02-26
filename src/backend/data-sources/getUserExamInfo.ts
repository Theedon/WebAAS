import prisma from "../prisma/prisma";

export const getUserExamInfo = async (userId: string) => {
  try {
    const user = await prisma.userToExam.findUnique({
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

    if (!user.test_information || !user.ai_recommendation) {
      throw new Error("No test information or AI recommendation");
    }

    return {
      test_information: user.test_information.toString(),
      ai_recommendation: user.ai_recommendation.toString(),
      rec_course_1: user.test_information,
      rec_course_2: user.test_information,
      rec_course_3: user.test_information,
      anti_course_1: user.test_information,
      anti_course_2: user.test_information,
      anti_course_3: user.test_information,
      taken_exam: user.test_information,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in getUserExamInfo:", error);
    // Return an appropriate error object (e.g., { success: false, error: '...' })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { success: false, error: error.message };
  }
};
