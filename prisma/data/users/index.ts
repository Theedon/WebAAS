import { $Enums } from "@prisma/client";
import { FacultyCode } from "../subjects/utils";
import { UserType } from "./utils";

export const RawUsers: UserType[] = [
  {
    first_name: "John",
    middle_name: "Pistas",
    last_name: "Doe",
    password: "password",
    email: "johndoe@email.com",
    role: $Enums.Role.student,
    verified: true,
    onboarded: true,
    faculty_id: "",
    faculty_code: FacultyCode.SCIENCES,
  },
  {
    first_name: "Alice",
    middle_name: "Marie",
    last_name: "Smith",
    password: "password",
    email: "alicesmith@email.com",
    role: $Enums.Role.admin,
    verified: false,
    onboarded: true,
    faculty_id: "",
    faculty_code: FacultyCode.COMMERCIAL,
  },
  {
    first_name: "Bob",
    middle_name: "William",
    last_name: "Jones",
    password: "password",
    email: "bobjones@email.com",
    role: $Enums.Role.advisor,
    verified: true,
    onboarded: false,
    faculty_id: "",
    faculty_code: FacultyCode.ARTS,
  },
  {
    first_name: "Eva",
    middle_name: "Grace",
    last_name: "Johnson",
    password: "password",
    email: "evajohnson@email.com",
    role: $Enums.Role.student,
    verified: false,
    onboarded: false,
    faculty_id: "",
    faculty_code: FacultyCode.SCIENCES,
  },
  {
    first_name: "David",
    middle_name: "Michael",
    last_name: "White",
    password: "password",
    email: "davidwhite@email.com",
    role: $Enums.Role.student,
    verified: true,
    onboarded: true,
    faculty_id: "",
    faculty_code: FacultyCode.ARTS,
  },
];