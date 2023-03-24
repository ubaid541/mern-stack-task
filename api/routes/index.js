import express from "express"
import { QAFormController } from "../controller/QAFormController.js"
const router = express.Router()

router.get("/qa",QAFormController)

export default router