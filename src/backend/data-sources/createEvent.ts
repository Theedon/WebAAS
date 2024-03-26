import prisma from "../prisma/prisma";

export const createEvent = async (
  title: string,
  description: string,
  date: string,
  creator_id: string,
) => {
  try {
    const event_date = new Date(date);
    const event = await prisma.event.create({
      data: {
        title,
        description,
        creator_id,
        event_date,
      },
    });

    return event;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};
