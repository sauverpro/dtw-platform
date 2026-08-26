-- CreateTable
CREATE TABLE "PackageInquiry" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "packageId" TEXT,
  "packageBadge" TEXT,
  "packagePrice" TEXT,
  "packageCurrency" TEXT,
  "organizationName" TEXT NOT NULL,
  "contactPerson" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "message" TEXT,

  CONSTRAINT "PackageInquiry_pkey" PRIMARY KEY ("id")
);
