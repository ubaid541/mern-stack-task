const [qaList, setQAList] = useState([]);

useEffect(() => {
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

const [selectedQuestion, setSelectedQuestion] = useState("");
const [answer, setAnswer] = useState("");

const handleQuestionChange = (event) => {
  setSelectedQuestion(event.target.value);
};

const handleAnswerChange = (event) => {
  setAnswer(event.target.value);
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(`Question: ${selectedQuestion}, Answer: ${answer}`);
};

return (
  // <Container maxWidth="md">
  //   <Typography variant="h4" align="center" gutterBottom>
  //     QA List
  //   </Typography>
  //   <Paper>
  //     <List>
  //       {qaList.length > 0
  //         ? qaList.map((qa) => (
  //             <ListItem key={qa._id}>
  //               <ListItemText
  //                 primary={qa.question}
  //                 secondary={`Answers: ${qa.answer.join(", ")}`}
  //               />
  //             </ListItem>
  //           ))
  //         : "No list found, kindly add few question and answers."}
  //     </List>
  //   </Paper>
  // </Container>

  // <form onSubmit={handleSubmit}>
  //   <FormControl sx={{ m: 1, minWidth: 120 }}>
  //     <InputLabel id="demo-simple-select-label">Select a Question</InputLabel>
  //     <Select
  //       labelId="demo-simple-select-label"
  //       id="demo-simple-select"
  //       value={selectedQuestion}
  //       label="Select a Question"
  //       onChange={handleQuestionChange}
  //     >
  //       {qaList?.length > 0 ? (
  //         <>
  //           qaList?.map((question) => (
  //           <MenuItem key={question.id} value={question?.question}>
  //             {question?.question}
  //           </MenuItem>
  //           ))
  //           <Select
  //             labelId="answer-label"
  //             id="answer"
  //             value={answer}
  //             label="Answer"
  //             onChange={handleAnswerChange}
  //           >
  //             <MenuItem value="Yes">Yes</MenuItem>
  //             <MenuItem value="No">No</MenuItem>
  //             <MenuItem value="Maybe">Maybe</MenuItem>
  //           </Select>
  //         </>
  //       ) : (
  //         "No question answer found."
  //       )}
  //     </Select>
  //   </FormControl>
  //   <FormControl sx={{ m: 1, minWidth: 120 }}>
  //     <InputLabel htmlFor="answer">Answer</InputLabel>
  //     <Select
  //       labelId="answer-label"
  //       id="answer"
  //       value={answer}
  //       label="Answer"
  //       onChange={handleAnswerChange}
  //     >
  //       <MenuItem value="Yes">Yes</MenuItem>
  //       <MenuItem value="No">No</MenuItem>
  //       <MenuItem value="Maybe">Maybe</MenuItem>
  //     </Select>
  //   </FormControl>
  //   <Button variant="contained" type="submit" sx={{ mt: 3, ml: 2 }}>
  //     Submit
  //   </Button>
  // </form>

  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="question-select-label">Select a Question</InputLabel>
    <Select
      labelId="question-select-label"
      id="question-select"
      value={selectedQuestion}
      label="Select a Question"
      // onChange={handleChange}
    >
      {qaList?.map((question) => (
        <MenuItem key={question._id} value={question.question}>
          {question.question}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
