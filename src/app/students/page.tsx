import { StudentsDataType, columns } from "@/components/students/Columns";
import { DataTable } from "@/components/advisors/DataTable";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import {
  AllStudentsQuery,
  AllStudentsQueryVariables,
} from "./__generated__/page.generated";
import { dateWrangler } from "@/lib/utils";

export default async function AdvisorsPage() {
  const GET_ALL_STUDENTS = gql`
    query AllStudents {
      allStudents {
        id
        firstName
        lastName
        email
        created_at
        updated_at
        faculty {
          name
        }
        phone_no
      }
    }
  `;

  const { data, error } = await getClient().query<
    AllStudentsQuery,
    AllStudentsQueryVariables
  >({
    query: GET_ALL_STUDENTS,
  });

  const wrangledData: StudentsDataType[] = data.allStudents.map((student) => {
    return {
      id: student.id,
      first_name: student.firstName,
      last_name: student.lastName,
      email: student.email,
      created_at: dateWrangler(student.created_at),
      updated_at: dateWrangler(student.updated_at),
      phone_no: student.phone_no ?? "",
      faculty: student.faculty?.name ?? "",
    };
  });
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={wrangledData} />
    </div>
  );
}
