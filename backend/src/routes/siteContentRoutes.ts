import { Router } from "express";
import { getSiteContentController, updateSiteContentController, updateSiteSectionController } from "../controllers/siteContentController";
import { requireAuth } from "../middleware/requireAuth";

export const siteContentRoutes = Router();

siteContentRoutes.get("/", getSiteContentController);
siteContentRoutes.put("/", requireAuth, updateSiteContentController);
siteContentRoutes.put("/:section", requireAuth, updateSiteSectionController);
