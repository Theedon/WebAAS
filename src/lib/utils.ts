import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripData = (text: string, type = "md") => {
  // Trim any leading/trailing whitespace to avoid issues with empty strings
  text = text.trim();

  try {
    if (type === "md") {
      // Handle Markdown triple quotes, ensuring correct removal
      if (text.startsWith("`") && text.endsWith("`")) {
        text = text.substring(3, text.length - 3).trim();
        // eslint-disable-next-line no-dupe-else-if
      } else if (text.startsWith("`") && text.endsWith("`")) {
        text = text.slice(1, -1).trim(); // Remove single leading/trailing backticks
      }
    } else if (type === "json") {
      // Handle JSON content, gracefully handling missing curly braces
      const index = text.indexOf("{");
      if (index >= 0) {
        text = text.substring(index);

        // Remove all characters after the closing }
        const closingBraceIndex = text.lastIndexOf("}");
        if (closingBraceIndex >= 0) {
          text = text.substring(0, closingBraceIndex + 1); // Keep the }
        }

        // Attempt to parse as JSON to ensure validity
        JSON.parse(text); // Will throw an error if invalid JSON
      } else {
        throw new Error("Invalid JSON format: No opening curly brace found.");
      }
    } else {
      // Handle invalid types
      throw new Error(
        `Invalid type: ${type}. Valid types are "md" and "json".`,
      );
    }
  } catch (error) {
    console.error("Error in stripData:", error);
    return text; // Return original text if an error occurs
  }

  return text;
};

export const dateWrangler = (date: Date | string) => {
  // const dbTimeStr = "2024-02-28 11:04:54.419";
  const dateObj = new Date(date); // Parse the string into a Date object

  const formattedDate = `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;

  return formattedDate;
};

export const getCourseFromFaculty = (courseFacultyString: string) => {
  const parts = courseFacultyString.split("|");
  const course = parts[0].trim();
  const faculty = parts[1].trim();

  return { course, faculty };
};
