import prisma from "@server/utils/prisma";
import { PatientInput } from "@shared/schemas/patient.schema";

export const createPatient = async (data: PatientInput) => {
  return prisma.patient.create({
    data: {
      name: data.name,
      age: data.age,
      medicalHistory: data.medicalHistory,
      lifestyleHabits: data.lifestyleHabits,
      medicines: {
        create: data.medicines || [],
      },
    },
    include: { medicines: true },
  });
};

export const getPatients = async () => {
  return prisma.patient.findMany({
    include: { medicines: true },
  });
};
