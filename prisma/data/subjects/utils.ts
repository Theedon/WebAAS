import { SubjectCode } from "../questions/utils";

export type SubjectType = {
  name: string;
  code: SubjectCode;
  description: string;
  facultyId: string;
  facultyCode: FacultyCode;
};

export enum FacultyCode {
  SCIENCES = "SCI",
  ARTS = "ART",
  COMMERCIAL = "COM",
  GENERAL = "GEN",
}
