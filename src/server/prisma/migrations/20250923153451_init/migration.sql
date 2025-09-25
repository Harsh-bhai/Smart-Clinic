/*
  Warnings:

  - Made the column `dose` on table `Medicine` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medicine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dose" TEXT NOT NULL,
    "frequency" JSONB,
    "duration" TEXT,
    "remarks" TEXT,
    "patientId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Medicine_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Medicine" ("createdAt", "dose", "duration", "frequency", "id", "name", "patientId", "remarks", "updatedAt") SELECT "createdAt", "dose", "duration", "frequency", "id", "name", "patientId", "remarks", "updatedAt" FROM "Medicine";
DROP TABLE "Medicine";
ALTER TABLE "new_Medicine" RENAME TO "Medicine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
