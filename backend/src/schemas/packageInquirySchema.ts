import { z } from "zod";

export const CreatePackageInquirySchema = z.object({
  organizationName: z.string().trim().min(1, "Organization name is required").max(200),
  contactPerson: z.string().trim().min(1, "Contact person is required").max(200),
  email: z.string().trim().email("Invalid email").max(254),
  phone: z.string().trim().min(5, "Phone is required").max(40),
  message: z.string().trim().max(4000).optional(),
  packageId: z.string().trim().max(120).optional(),
  packageBadge: z.string().trim().max(200).optional(),
  packagePrice: z.string().trim().max(120).optional(),
  packageCurrency: z.string().trim().max(20).optional(),
});

export type CreatePackageInquiryBody = z.infer<typeof CreatePackageInquirySchema>;
