import QAModal from "../model/QAModal.js"
import {createError} from "../utils/error.js"

const QAFormController = async (req,res,next)=>{

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(409).json( 'Question or answer field is empty');
    }

    //Check if question,answer exists
    try {
        const exists = await QAModal.exists({$or:[{question:question}]})

        if(exists){
            return res.status(409).json("Question already exists.")
        }

    } catch (error) {
        next(error)
    }

    const newQA = new QAModal({
        ...req.body
        })

    try {
       const new_QA = await newQA.save()
    //    res.status(200).json(["Successfully added.",new_QA])
       res.status(200).json("Successfully added.")
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export {QAFormController}