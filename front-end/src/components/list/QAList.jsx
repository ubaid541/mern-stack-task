import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Divider,
  TextField,
} from "@mui/material";

const QAList = () => {
  let selectedQId;
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const [qaList, setQAList] = useState([]);
  const [customAnswer, setcustomAnswer] = useState();

  useEffect(() => {
    // fetch question answer
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/qa");
        setQAList(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // fetch answer of selected question
  const handleChange = (event) => {
    const selectedQuestion = event.target.value;
    const question = qaList?.find((q) => q?.question === selectedQuestion);
    selectedQId = question?._id;

    setSelectedQuestion(selectedQuestion);
    setSelectedAnswer(question.answer);
  };

  const handleCustomAnswerChange = (event) => {
    setcustomAnswer(event.target.value);
  };

  const handleAddCustomAnswer = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("http://localhost:5000/qa", {
        customAnswer,
        selectedQuestion,
      });

      const res = await axios.get("http://localhost:5000/qa");
      setQAList(res?.data);
    } catch (error) {
      console.log(error);
    }

    console.log(response);
    console.log("submit answer", customAnswer);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Select a Question</InputLabel>
        <Select
          value={selectedQuestion}
          label="Select a Question"
          onChange={handleChange}
        >
          {qaList?.map((q) => (
            <MenuItem key={q._id} id={q?._id} value={q?.question}>
              {q?.question}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Select an answer</InputLabel>
        {selectedAnswer?.length > 0 && (
          <Select
            value={selectedAnswer[0]}
            label="Select an answer"
            onChange={handleChange}
          >
            {selectedAnswer?.map((ans, index) =>
              ans.split(",").map((item) => (
                <MenuItem key={index} value={item?.trim()}>
                  {item?.trim()}
                </MenuItem>
              ))
            )}
            <Divider />
            <MenuItem disabled>Add custom answer</MenuItem>
            <TextField
              label="Custom answer"
              variant="standard"
              value={customAnswer}
              onChange={handleCustomAnswerChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCustomAnswer}
            >
              Add
            </Button>
          </Select>
        )}
      </FormControl>
    </div>
  );
};

export default QAList;
