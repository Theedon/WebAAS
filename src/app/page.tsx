import { gql } from "@apollo/client";

const query = gql`
  query AllQuestions {
    allQuestions {
      id
      option_a
      option_b
      option_c
      option_d
      question
      subject_id
    }
  }
`;

export default async function Home() {
  return <main></main>;
}
