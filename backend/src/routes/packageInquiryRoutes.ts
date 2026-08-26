import { Router } from "express";
import { createPackageInquiryController } from "../controllers/packageInquiryController";

export const packageInquiryRoutes = Router();

packageInquiryRoutes.post("/", createPackageInquiryController);
