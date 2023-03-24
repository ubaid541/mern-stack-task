import React, { useState } from "react";
import { styled } from "@mui/material";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Form = () => {
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", ""] },
  ]);

  const handleQuestionChange = (event, index) => {
    console.log("question: ", event.target.value);
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    console.log("answer: ", event.target.value);
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.push({ question: "", answers: ["", ""] });
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push("");
    setQuestions(newQuestions);
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Loop through the array of questions and answers and send them to the API
    try {
      for (const questionObj of questions) {
        const { question, answers } = questionObj;
        if (!question || !answers.every((answer) => answer.trim())) {
          // Check if the question or any answer is empty
          console.error("Question or answer field is empty");
          toast.error("Question or answer field is empty.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          continue; // Skip this question and move to the next one
        }

        const response = await axios.post("http://localhost:5000/qa", {
          question,
          answer: answers.filter((answer) => answer.trim()), // Remove any empty answer
        });

        console.log(response.data);
        toast.success(`${response.data}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <form onSubmit={handleSubmit}>
          {questions.map((question, questionIndex) => (
            <Box
              key={questionIndex}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <TextField
                label={`Question ${questionIndex + 1}`}
                value={question.question}
                onChange={(event) => handleQuestionChange(event, questionIndex)}
              />
              {question.answers.map((answer, answerIndex) => (
                <Box
                  key={answerIndex}
                  sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <TextField
                    label={`Answer ${answerIndex + 1}`}
                    value={answer}
                    onChange={(event) =>
                      handleAnswerChange(event, questionIndex, answerIndex)
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={question.answers.length === 2}
                    onClick={() => handleAddAnswer(questionIndex)}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={question.answers.length === 1}
                    onClick={() =>
                      handleRemoveAnswer(questionIndex, answerIndex)
                    }
                  >
                    -
                  </Button>
                </Box>
              ))}
              <Button
                variant="outlined"
                size="small"
                disabled={questions.length === 5}
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ marginBottom: "20px" }}
                disabled={questions.length === 1}
                onClick={() => handleRemoveQuestion(questionIndex)}
              >
                Remove Question
              </Button>
            </Box>
          ))}
          <ToastContainer />
          <Button sx={{ marginTop: "10px" }} variant="contained" type="submit">
            Submit
          </Button>
          <Button
            sx={{ marginTop: "10px", marginLeft: "10px" }}
            variant="contained"
          >
            Live Preview
          </Button>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              typography: "body1",
              "& > :not(style) + :not(style)": {
                ml: 2,
              },
            }}
          ></Box>
        </form>
      </Box>
    </>
  );
};

export default Form;
