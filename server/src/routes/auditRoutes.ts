import express from "express";

import {
  getAuditLogs,
} from "../controllers/auditController";

const router = express.Router();

router.get(
  "/:fileId",
  getAuditLogs
);

export default router;