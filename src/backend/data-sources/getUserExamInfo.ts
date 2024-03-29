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
        updated_at: true,
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
      rec_course_1: user.rec_course_1,
      rec_course_2: user.rec_course_2,
      rec_course_3: user.rec_course_3,
      anti_course_1: user.anti_course_1,
      anti_course_2: user.anti_course_2,
      anti_course_3: user.rec_course_3,
      taken_exam: user.taken_exam,
      updated_at: user.updated_at,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in getUserExamInfo:", error);
    // Return an appropriate error object (e.g., { success: false, error: '...' })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { success: false, error: error.message };
  }
};
