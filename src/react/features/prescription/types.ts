export interface Patient {
  name: string;
  age: string;
  medicalHistory: string;
  lifestyle: string;
}

export interface Medicine {
  name: string;
  dose: string;
  frequency: string[];
  duration: string;
  remarks: string;
}

export interface PrescriptionState {
  activeTab: "patient" | "medicines";
  patient: Patient;
  medicines: Medicine[];
  editingIndex: number | null;
}