import express from "express"
import QAFormController  from "../controller/QAFormController.js"
const router = express.Router()

router.get("/qa",QAFormController.getQA)
router.post("/qa",QAFormController.addQA)
router.put("/qa",QAFormController.updateQA)

export default router