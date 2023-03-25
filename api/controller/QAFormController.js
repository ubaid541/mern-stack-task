import QAModal from "../model/QAModal.js"
import brain from "brain.js"

const trainAI = async () => {
    let qas
    try {
         qas = await QAModal.find(null,null,{sort : {'createdAt' : -1}})
    } catch (error) {
        console.log(error);
    }

    console.log("qas",qas);
  
    // Convert the raw QAs into numerical vectors
    const trainingData = qas.map(qa => ({
      input: qa.question,
      output: qa.answer
    }));

    console.log("train",trainingData);
  
    // Define the neural network architecture
    const net = new brain.recurrent.LSTM();
    // const net = new brain.NeuralNetwork()

    console.log("net",net);
  
    // Train the neural network
    // net.train(trainingData);
    net.train(trainingData, {
        iterations: 500,
        errorThresh: 0.005,
        log: true,
        logPeriod: 10,
        learningRate: 0.01,
        callback: (stats) => {
          console.log(`Iteration ${stats.iterations}, error ${stats.error}`);
        }
      });
      

    console.log("training complete");
  
    // Return the trained neural network
    return net;
  }


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
      },

    //   async aichatbot(req,res,next){
    //     console.log(req.body,"hi");
    //     const qas = await QAModal.find(null,null,{sort : {'createdAt' : -1}})

    //      // Convert the raw QAs into numerical vectors
    // const trainingData = qas.map(qa => ({
    //     input: qa.question,
    //     output: qa.answer
    //   }));

    // //   console.log("training",trainingData);
  
    //   // Define the neural network architecture
    //   const net = new brain.recurrent.LSTM();
  
    //   // Train the neural network
    //   net.train(trainingData);
  
    //   // Create an API to get answers to user questions
    //   const getAnswer = (question) => {
    //     const predictedAnswer = net.run(question);
    //     if (predictedAnswer) {
    //       return predictedAnswer;
    //     } else {
    //       return 'I do not know the answer to that question.';
    //     }
    //   }

    //   getAnswer()
  
    //   // Test the API
    //   const testQuestion = 'What is the capital of France?';
    //   const predictedAnswer = getAnswer(testQuestion);
  
    //   console.log(`Question: ${testQuestion}`);
    //   console.log(`Predicted answer: ${predictedAnswer}`);
    // }
    async aichatbot(req, res, next) {
       
        // Train the AI model
        const net = await trainAI();
             
        const getAnswer = (question) => {
          const predictedAnswer = net.run(question);
          if (predictedAnswer === undefined) {
            return 'Sorry, I could not find the answer to your question.';
        } else {
            return predictedAnswer;
        }
        };
      
        // Get the user question from the request body
        const userQuestion = req.body.question;
      
        // Get the predicted answer for the user question
        const answer = getAnswer(userQuestion);
        console.log("answer",answer);
      
        // Send the answer back to the user
        res.json({ answer });
      }
      
}

export default QAFormController