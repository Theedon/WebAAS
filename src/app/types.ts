export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AssessmentInfoInput = {
  choice: Scalars['String']['input'];
  correct_option: Scalars['String']['input'];
  id: Scalars['String']['input'];
  index: InputMaybe<Scalars['Int']['input']>;
  option_a: Scalars['String']['input'];
  option_b: Scalars['String']['input'];
  option_c: Scalars['String']['input'];
  option_d: Scalars['String']['input'];
  question: Scalars['String']['input'];
  subject_id: Scalars['String']['input'];
};

export type Faculty = {
  __typename?: 'Faculty';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Scalars['String']['output'];
  saveExam: Scalars['String']['output'];
};


export type MutationCreateUserArgs = {
  clerkId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  facultyCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSaveExamArgs = {
  assessmentInfo: Array<AssessmentInfoInput>;
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allAdvisors: Array<User>;
  allQuestions: Array<Question>;
  allStudents: Array<User>;
  allSubjects: Array<Subject>;
  allUsers: Array<User>;
  testQuestions: Array<Array<Question>>;
  user: User;
};


export type QueryTestQuestionsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  correct_option: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  option_a: Maybe<Scalars['String']['output']>;
  option_b: Maybe<Scalars['String']['output']>;
  option_c: Maybe<Scalars['String']['output']>;
  option_d: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  subject_id: Maybe<Scalars['String']['output']>;
};

export type Subject = {
  __typename?: 'Subject';
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String']['output'];
  email: Scalars['String']['output'];
  faculty: Maybe<Faculty>;
  faculty_id: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  onboarded: Scalars['Boolean']['output'];
  phone_no: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
  userExamInfo: UserExamInfo;
  verified: Scalars['Boolean']['output'];
};

export type UserExamInfo = {
  __typename?: 'UserExamInfo';
  ai_recommendation: Maybe<Scalars['String']['output']>;
  anti_course_1: Maybe<Scalars['String']['output']>;
  anti_course_2: Maybe<Scalars['String']['output']>;
  anti_course_3: Maybe<Scalars['String']['output']>;
  rec_course_1: Maybe<Scalars['String']['output']>;
  rec_course_2: Maybe<Scalars['String']['output']>;
  rec_course_3: Maybe<Scalars['String']['output']>;
  taken_exam: Scalars['Boolean']['output'];
  test_information: Maybe<Scalars['String']['output']>;
};
