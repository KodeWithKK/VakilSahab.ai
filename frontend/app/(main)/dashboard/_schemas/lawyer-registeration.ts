import * as z from "zod";

import {
  defaultLawyerServices,
  defaultLawyerSpecialization,
} from "@/lib/constant";

export const LawyerRegistrationSchema = z.object({
  bio: z.string().min(1, { message: "Bio is required" }),
  specialization: z.union([
    z.enum(defaultLawyerSpecialization),
    z.string().min(1, { message: "Specialization is required" }),
  ]),
  experienceInYr: z.preprocess(
    (val) => {
      const parsed = parseFloat(val as string);
      return isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({ message: "Enter a valid Experience in years" })
      .gte(0, { message: "Experience is required" }),
  ),
  services: z
    .array(
      z.object({
        value: z.union(
          [
            z.enum(defaultLawyerServices),
            z.string().min(1, { message: "Service is required" }),
          ],
          { message: "Invalid service" },
        ),
        other: z.string().min(1, { message: "Enter Service name" }).optional(),
      }),
    )
    .min(1, { message: "Services is required" }),
  consultationFees: z.preprocess(
    (val) => {
      const parsed = parseFloat(val as string);
      return isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({ message: "Enter a valid consultation fees" })
      .gte(0, { message: "Consultation fees is required" }),
  ),
  phoneNumber: z.preprocess(
    (val) => {
      const parsed = parseInt(val as string);
      return isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({ message: "Enter a valid phone number" })
      .refine(
        (val) => val.toString().length === 10,
        "Phone number must be 10 digits",
      ),
  ),
});
