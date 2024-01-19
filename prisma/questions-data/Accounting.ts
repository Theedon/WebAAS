import { v4 as uuid, v4 } from "uuid";

export type QuestionProps = {
  subject_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
};

export const Accounting: QuestionProps[] = [
  {
    subject_id: v4(),
    question_text: "What is the accounting equation?",
    option_a: "Assets = Liabilities - Equity",
    option_b: "Assets = Liabilities + Equity",
    option_c: "Assets = Expenses - Revenue",
    option_d: "Assets = Income + Expenses",
    correct_option: "Assets = Liabilities + Equity",
  },
  // Question 2
  {
    subject_id: v4(),
    question_text:
      "What financial statement provides a snapshot of a company's financial position at a specific point in time?",
    option_a: "Income Statement",
    option_b: "Balance Sheet",
    option_c: "Cash Flow Statement",
    option_d: "Statement of Retained Earnings",
    correct_option: "Balance Sheet",
  },

  // Question 3
  {
    subject_id: v4(),
    question_text:
      "In double-entry accounting, what happens when an asset is increased?",
    option_a: "A credit is recorded",
    option_b: "A debit is recorded",
    option_c: "A liability is recorded",
    option_d: "An expense is recorded",
    correct_option: "A debit is recorded",
  },

  // Question 4
  {
    subject_id: v4(),
    question_text: "What is the purpose of the Income Statement?",
    option_a: "To show the financial position of a business",
    option_b: "To detail changes in equity over a period",
    option_c: "To summarize revenues and expenses over a period",
    option_d: "To display cash flows in and out of a business",
    correct_option: "To summarize revenues and expenses over a period",
  },

  // Question 5
  {
    subject_id: v4(),
    question_text:
      "What is the term for a financial document that itemizes a company's revenues and expenses for a specific period?",
    option_a: "Balance Sheet",
    option_b: "Income Statement",
    option_c: "Statement of Cash Flows",
    option_d: "Trial Balance",
    correct_option: "Income Statement",
  },

  // Question 6
  {
    subject_id: v4(),
    question_text:
      "What is the process of spreading the cost of a long-term asset over its useful life called?",
    option_a: "Depreciation",
    option_b: "Amortization",
    option_c: "Appreciation",
    option_d: "Impairment",
    correct_option: "Depreciation",
  },

  // Question 7
  {
    subject_id: v4(),
    question_text: "In accounting, what does FIFO stand for?",
    option_a: "First In, Last Out",
    option_b: "First In, First Out",
    option_c: "Last In, Last Out",
    option_d: "Last In, First Out",
    correct_option: "First In, First Out",
  },

  // Question 8
  {
    subject_id: v4(),
    question_text: "What type of account has a credit balance?",
    option_a: "Asset",
    option_b: "Liability",
    option_c: "Equity",
    option_d: "Expense",
    correct_option: "Liability",
  },

  // Question 9
  {
    subject_id: v4(),
    question_text: "What is the purpose of a cash flow statement?",
    option_a: "To show the amount of cash held by a business",
    option_b: "To report changes in equity over a period",
    option_c: "To provide details about revenues and expenses",
    option_d: "To show the inflows and outflows of cash in a business",
    correct_option: "To show the inflows and outflows of cash in a business",
  },

  // Question 10
  {
    subject_id: v4(),
    question_text: "What does GAAP stand for in the context of accounting?",
    option_a: "Generally Accepted Accounting Principles",
    option_b: "Generally Agreed Upon Accounting Procedures",
    option_c: "Generally Authorized Accounting Policies",
    option_d: "Generally Acknowledged Accounting Practices",
    correct_option: "Generally Accepted Accounting Principles",
  },
];

