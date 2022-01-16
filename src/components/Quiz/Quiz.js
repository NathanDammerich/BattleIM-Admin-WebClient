import {
  Card,
  Grid,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { removeModal } from "../../actions/modals";
import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";

import { addPassedQuiz } from "../../actions/user";
import useStyles from "./styles.js";

export default function Quiz({ quizID }) {
  const [quiz] = useFetchData(null, quizID, "quiz");
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(10).fill(""));
  const [userScore, setUserScore] = useState(0);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [userAnswersIndex, setUserAnswersIndex] = useState([]);
  const [userCorrect, setUserCorrect] = useState(new Array(10).fill(false));

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const classes = useStyles();

  const submitQuiz = () => {
    let rightAnswers = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      const userAnswer = parseInt(userAnswers[i].charAt(3));
      const newUserAnswersIndex = [...userAnswersIndex];
      newUserAnswersIndex[i] = userAnswer;
      setUserAnswersIndex(newUserAnswersIndex);
      if (quiz.questions[i].answers[userAnswer].correct) {
        rightAnswers = rightAnswers + 1;
        const newUserCorrect = [...userCorrect];
        newUserCorrect[i] = true;
        setUserCorrect(newUserCorrect);
      }
    }
    setUserScore(rightAnswers);
    if (rightAnswers >= quiz.minimumScore) {
      callAddPassedQuiz();
    }
    setSubmittedQuiz(true);
  };

  const retryQuiz = () => {
    console.log("retry quiz");
  };

  const callAddPassedQuiz = () => {
    dispatch(addPassedQuiz(user._id, quizID));
  };

  const handleRadioChange = (event) => {
    const arr = [...userAnswers];
    arr[questionIndex] = event.target.value;
    setUserAnswers(arr);
  };

  const closeQuizModal = () => {
    dispatch(removeModal());
  };

  return (
    <>
      {quiz && (
        <Card raised className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {!startedQuiz || submittedQuiz ? (
                <Typography
                  variant="h5"
                  color="primary"
                >{`${quiz.sport.description} Quiz`}</Typography>
              ) : (
                <Typography variant="h5" color="primary">{`Question ${
                  questionIndex + 1
                }/${quiz.questions.length}`}</Typography>
              )}
            </Grid>
            {!startedQuiz ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="body1" color="primary">
                    To create a team, you must pass the quiz first.
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <form action="https://www.ducksters.com/sports/basketballrules.php">
                    <Button type="submit" variant="outlined" size="small">
                      Rules
                    </Button>
                  </form>
                </Grid>
                <Grid item xs={6} align="left">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setStartedQuiz(true)}
                    size="small"
                  >
                    Start Quiz
                  </Button>
                </Grid>
              </>
            ) : submittedQuiz ? (
              userScore >= quiz.minimumScore ? (
                <>
                  <Grid item xs={12} align="center">
                    <Typography
                      variant="h5"
                      className={classes.passed}
                    >{`Score: ${userScore}/${quiz.questions.length}`}</Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Typography variant="body1">You passed!</Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={closeQuizModal}
                    >
                      Ok
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} align="center">
                    <Typography
                      variant="h5"
                      className={classes.failed}
                    >{`Score: ${userScore}/${quiz.questions.length}`}</Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Typography
                      variant="body1"
                      color="primary"
                    >{`To pass the quiz, you must get a score of ${quiz.minimumScore}/${quiz.questions.length}`}</Typography>
                  </Grid>
                  <Container>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" align="left">
                        Review
                      </Typography>
                    </Grid>
                  </Container>
                  {quiz.questions.map((question, qIndex) => (
                    <Container className={classes.spaceBetween}>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          align="left"
                          className={classes.bold}
                        >
                          {question.question}
                        </Typography>
                      </Grid>
                      {question.answers.map((answer, aIndex) => (
                        <Grid item xs={12} className={classes.lessSpacing}>
                          {aIndex === userAnswersIndex[qIndex] &&
                          userCorrect[qIndex] ? (
                            <Typography
                              variant="body1"
                              align="left"
                              className={classes.passed}
                            >
                              {`${answer.answer}`}
                            </Typography>
                          ) : aIndex !== userAnswersIndex[qIndex] ? (
                            <Typography variant="body1" align="left">
                              {`${answer.answer}`}
                            </Typography>
                          ) : (
                            <Typography
                              variant="body1"
                              align="left"
                              className={classes.failed}
                            >
                              {`${answer.answer}`}
                            </Typography>
                          )}
                        </Grid>
                      ))}
                    </Container>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={retryQuiz}
                    >
                      Retry
                    </Button>
                  </Grid>
                </>
              )
            ) : (
              <>
                <Grid item xs={12} align="center">
                  <Typography
                    variant="body1"
                    color="primary"
                    align="center"
                    className={classes.question}
                  >
                    {quiz.questions[questionIndex].question}
                  </Typography>
                </Grid>
                <Grid item xs={12} align="left">
                  <RadioGroup
                    name="quiz"
                    aria-label="quiz"
                    onClick={handleRadioChange}
                    align="left"
                    value={userAnswers[questionIndex]}
                  >
                    {quiz.questions[questionIndex].answers.map(
                      (answer, index) => (
                        <FormControlLabel
                          value={`Q${questionIndex}:${index}`}
                          control={<Radio />}
                          key={index}
                          label={answer.answer}
                        />
                      )
                    )}
                  </RadioGroup>
                </Grid>

                {questionIndex === 0 && quiz.questions.length > 1 ? (
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
                ) : questionIndex < quiz.questions.length - 1 ? (
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
            )}
          </Grid>
        </Card>
      )}
    </>
  );
}
