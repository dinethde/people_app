import { z } from "zod";

/** Helper: validate a {year, month, day} triple and ensure it’s a real calendar date */
const DatePartsSchema = z
  .object({
    year: z.number().int().min(1900).max(3000),
    month: z.number().int().min(1).max(12),
    day: z.number().int().min(1).max(31),
  })
  .superRefine((v, ctx) => {
    const d = new Date(v.year, v.month - 1, v.day);
    // Ensure JS didn't roll the date (e.g., Feb 31 → Mar 2)
    if (d.getFullYear() !== v.year || d.getMonth() + 1 !== v.month || d.getDate() !== v.day) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid calendar date",
      });
    }
  });

/** Optional: phone pattern (accepts +, digits, spaces, dashes, parentheses) */
const PhoneSchema = z.string().regex(/^[\d+\-\s()]{7,25}$/, "Invalid phone number");

/** Timestamp [seconds, nanos] (both non-negative integers) */
const TimestampSchema = z.tuple([z.number().int().nonnegative(), z.number().int().nonnegative()]);

/** Main schema */
export const EmployeeInfoSchema = z
  .object({
    id: z.string().min(1),

    lastName: z.string().min(1),
    firstName: z.string().min(1),

    wso2Email: z.string().email(),
    workPhoneNumber: PhoneSchema,
    epf: z.string().min(1),

    workLocation: z.string().nullable(),
    employeeLocation: z.string().min(1),

    startDate: DatePartsSchema,

    jobRole: z.string().min(1),

    jobBand: z.string().min(1),

    managerEmail: z.string().email(),
    reportToEmail: z.string().email(),
    additionalManagerEmail: z.string().email().nullable(),
    additionalReportToEmail: z.string().email().nullable(),

    employeeStatus: z.string().min(1), // if you have known statuses, switch to z.enum([...])
    lengthOfService: z.coerce.number().int().min(0),
    relocationStatus: z.string().min(1), // e.g., "Yes"/"No" (use z.enum if you have fixed values)

    employeeThumbnail: z.string().url(),

    subordinateCount: z.coerce.number().int().min(0),

    timestamp: TimestampSchema,

    probationEndDate: DatePartsSchema,
    agreementEndDate: DatePartsSchema.nullable(),

    employmentType: z.string().min(1), // e.g., z.enum(["Full-time","Part-time","Contract","Intern"])
    company: z.string().min(1),
    office: z.string().min(1),
    businessUnit: z.string().min(1),
    team: z.string().min(1),
    subTeam: z.string().min(1),
    unit: z.string().min(1),
  })
  .superRefine((v, ctx) => {
    // Cross-field date checks (optional but useful)
    const toDate = (p: { year: number; month: number; day: number }) =>
      new Date(p.year, p.month - 1, p.day);

    const start = toDate(v.startDate);
    const probation = toDate(v.probationEndDate);

    if (probation < start) {
      ctx.addIssue({
        code: "custom",
        path: ["probationEndDate"],
        message: "Probation end date must be on/after start date",
      });
    }

    if (v.agreementEndDate) {
      const agreement = toDate(v.agreementEndDate);
      if (agreement < start) {
        ctx.addIssue({
          code: "custom",
          path: ["agreementEndDate"],
          message: "Agreement end date must be on/after start date",
        });
      }
    }
  });

// Inferred TypeScript type (kept in sync with the schema)
export type EmployeeInfoZ = z.infer<typeof EmployeeInfoSchema>;
