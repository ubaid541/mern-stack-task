import QAModal from "../model/QAModal.js"

const QAFormController = {

    async addQA(req,res,next){
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
    },

    async getQA(req,res,next){
        try {
            const qa = await QAModal.find(null,null,{sort : {'createdAt' : -1}})
            res.status(200).json(qa)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    async updateQA(req, res, next) {
        console.log(req.body);
        console.log(req.body.selectedQuestion);
        try {
          const qa = await QAModal.updateOne(
            { question: req.body.selectedQuestion },
            { $push: { answer: req.body.customAnswer } }
          );
          res.status(200).json("Successfully updated.");
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
      


}

export default QAFormController