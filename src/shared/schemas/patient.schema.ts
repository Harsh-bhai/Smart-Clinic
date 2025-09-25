import { z } from "zod";

export const medicineSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  dose: z.string(),
  frequency: z.string(),
  duration: z.string(),
  remarks: z.string().optional(),
});

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().nonnegative("Age must be positive"),
  medicalHistory: z.string().optional(),
  lifestyleHabits: z.string().optional(),
  medicines: z.array(medicineSchema).optional(),
});

export type PatientInput = z.infer<typeof patientSchema>;
export type MedicineInput = z.infer<typeof medicineSchema>;
