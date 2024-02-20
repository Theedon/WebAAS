import { $Enums } from "@prisma/client";
import { UserType } from "./utils";
import { FacultyCode } from "../subjects/utils";

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
  {
    first_name: "Alice",
    middle_name: "Jane",
    last_name: "Taylor",
    password: "password123",
    email: "alice.taylor@email.com",
    role: $Enums.Role.advisor,
    verified: true,
    onboarded: true,
    faculty_id: "FA-1234",
    faculty_code: FacultyCode.SCIENCES,
  },
  {
    first_name: "Charlie",
    middle_name: "David",
    last_name: "Brown",
    password: "strong.password!",
    email: "charlie.brown@email.com",
    role: $Enums.Role.advisor,
    verified: false,
    onboarded: false,
    faculty_id: "",
    faculty_code: FacultyCode.SCIENCES,
  },
  {
    first_name: "Emily",
    middle_name: "Rose",
    last_name: "Wilson",
    password: "secure_pass1",
    email: "emily.wilson@email.com",
    role: $Enums.Role.advisor,
    verified: true,
    onboarded: true,
    faculty_id: "FA-5678",
    faculty_code: FacultyCode.SCIENCES,
  },
  {
    first_name: "Frank",
    middle_name: "Michael",
    last_name: "Garcia",
    password: "1234567890", // Weak password (consider replacing)
    email: "frank.garcia@email.com",
    role: $Enums.Role.advisor,
    verified: false,
    onboarded: false,
    faculty_id: "",
    faculty_code: FacultyCode.SCIENCES,
  },
  {
    first_name: "Grace",
    middle_name: "Elizabeth",
    last_name: "Johnson",
    password: "complex_password",
    email: "grace.johnson@email.com",
    role: $Enums.Role.advisor,
    verified: true,
    onboarded: true,
    faculty_id: "FA-9012",
    faculty_code: FacultyCode.ARTS,
  },
  {
    first_name: "Henry",
    middle_name: "Thomas",
    last_name: "Lee",
    password: "super_secure",
    email: "henry.lee@email.com",
    role: $Enums.Role.advisor,
    verified: true,
    onboarded: false,
    faculty_id: "",
    faculty_code: FacultyCode.ARTS,
  },
  {
    first_name: "Isabella",
    middle_name: "Catherine",
    last_name: "Miller",
    password: "not_so_secure", // Consider replacing
    email: "isabella.miller@email.com",
    role: $Enums.Role.advisor,
    verified: false,
    onboarded: true,
    faculty_id: "FA-3456",
    faculty_code: FacultyCode.ARTS,
  },
  {
    first_name: "Jack",
    middle_name: "Alexander",
    last_name: "Davis",
    password: "password1234", // Weak password (consider replacing)
    email: "jack.davis@email.com",
    role: $Enums.Role.advisor,
    verified: true,
    onboarded: false,
    faculty_id: "",
    faculty_code: FacultyCode.ARTS,
  },
  {
    first_name: "Olivia",
    middle_name: "Sophia",
    last_name: "Garcia",
    password: "s0ph1ap4ss",
    email: "olivia.garcia@email.com",
    role: $Enums.Role.advisor,
    verified: true,
    onboarded: true,
    faculty_id: "", // Add faculty ID
    faculty_code: FacultyCode.COMMERCIAL,
  },
  {
    first_name: "William",
    middle_name: "Henry",
    last_name: "Brown",
    password: "change_me_123", // Consider replacing
    email: "william.brown@email.com",
    role: $Enums.Role.advisor,
    verified: false,
    onboarded: false,
    faculty_id: "",
    faculty_code: FacultyCode.COMMERCIAL,
  },
];
