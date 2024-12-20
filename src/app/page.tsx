import { getClient } from "@/lib/apollo-clients/RSCClient";
import getCurrentUserId from "@/lib/globalUserContext";
import { gql } from "@apollo/client";
import {
  GetSubjectsQuery,
  GetSubjectsQueryVariables,
} from "./__generated__/page.generated";
import SubjectSection from "@/components/dashboard/SubjectSection";
import AdvisorsPage from "./advisors/page";
import StudentsPage from "./students/page";

const query = gql`
  query GetSubjects($userId: String!) {
    user(id: $userId) {
      role
      userExamInfo {
        rec_course_1
        rec_course_2
        rec_course_3
        anti_course_1
        anti_course_2
        anti_course_3
      }
    }
  }
`;

export default async function Home() {
  const userId = getCurrentUserId() as string;
  try {
    const { data, error } = await getClient().query<
      GetSubjectsQuery,
      GetSubjectsQueryVariables
    >({
      query,
      variables: { userId },
    });

    return (
      <main className="flex flex-col gap-5">
        <SubjectSection
          header="Recommended Subjects"
          course_2={data.user.userExamInfo?.rec_course_2 ?? ""}
          course_3={data.user.userExamInfo?.rec_course_3 ?? ""}
          course_1={data.user.userExamInfo?.rec_course_1 ?? ""}
        />
        <SubjectSection
          header="Least Recommended"
          course_1={data.user.userExamInfo?.anti_course_1 ?? ""}
          course_2={data.user.userExamInfo?.anti_course_2 ?? ""}
          course_3={data.user.userExamInfo?.anti_course_3 ?? ""}
        />

        <div></div>
        {(data.user.role === "advisor" || data.user.role === "admin") && (
          <StudentsPage />
        )}
        {(data.user.role === "student" || data.user.role === "admin") && (
          <AdvisorsPage />
        )}
      </main>
    );
  } catch (error: unknown) {
    console.log(error);
    return <div>No user</div>;
  }
}
