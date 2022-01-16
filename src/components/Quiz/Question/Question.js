import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import useStyles from "./styles.js";

export default function Question({
  questionIndex,
  setUserAnswers,
  question,
  answers,
  quizLength,
  setQuestionIndex,
  submitQuiz,
  userAnswers,
}) {
  const [value, setValue] = useState("");
  const classes = useStyles();

  const handleRadioChange = (event) => {
    console.log(userAnswers);
    setValue(event.target.value);
    let newUserAnswers = userAnswers;
    newUserAnswers[questionIndex] = value;
    setUserAnswers(newUserAnswers);
  };

  return (
    <>
      <Grid item xs={12} align="center">
        <Typography
          variant="body1"
          color="primary"
          align="center"
          className={classes.question}
        >
          {question}
        </Typography>
      </Grid>
      <Grid item xs={12} align="left">
        <RadioGroup
          name="quiz"
          aria-label="quiz"
          onClick={handleRadioChange}
          align="left"
          value={value}
        >
          {answers.map((answer, index) => (
            <FormControlLabel
              value={index.toString()}
              control={<Radio />}
              key={index}
              label={answer.answer}
            />
          ))}
        </RadioGroup>
      </Grid>

      {questionIndex === 0 && quizLength > 1 ? (
        <Grid item xs={12} align="center">
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => setQuestionIndex(questionIndex + 1)}
          >
            Next
          </Button>
        </Grid>
      ) : questionIndex === 0 ? (
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={submitQuiz}
          >
            Submit
          </Button>
        </Grid>
      ) : questionIndex < quizLength - 1 ? (
        <>
          <Grid item xs={6} align="right">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => setQuestionIndex(questionIndex - 1)}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6} align="left">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => setQuestionIndex(questionIndex + 1)}
            >
              Next
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={6} align="right">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => setQuestionIndex(questionIndex - 1)}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6} align="left">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={submitQuiz}
            >
              Submit
            </Button>
          </Grid>
        </>
      )}
    </>
  );
}
