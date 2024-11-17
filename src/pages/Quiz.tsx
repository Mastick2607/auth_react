import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { categories, getQuestions } from '../components/request';
import { useContext, useState } from 'react';
import Question from '../pages/Question';
import QuizContext from '../components/QuizContext';
import styles from './../components/Quiz.module.css';

export const Quiz = () => {
  const navigate = useNavigate();
  const [isAnswered, setIsAnswered] = useState(false);
  const { category, difficulty } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  
  const quizContext = useContext(QuizContext);

// Verificar si el contexto está definido
if (!quizContext) {
  throw new Error('QuizContext no está disponible');
}

const { score, scoreDispatch } = quizContext;
  // const [score, scoreDispatch] = useContext(QuizContext);

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setIsAnswered(false);
  };

  const finishQuiz = () => {
    if (score === null) {
      scoreDispatch({
        type: 'SET_SCORE',
        payload: 0,
      });
    }
    setIsAnswered(false);
    navigate('/results');
  };

  const result = useQuery({
    queryKey: ['questions'],
    queryFn: () => {
      // Convertir category a número
      const categoryNumber = category ? Number(category) : undefined;
  
      if (categoryNumber === undefined || difficulty === undefined) {
        throw new Error('Category or difficulty is undefined');
      }
  
      return getQuestions({ category: categoryNumber, difficulty });
    },
  });

  if (result.isLoading) {
    return (
      <div className='d-flex flex-column align-items-center justify-content-center my-5'>
        <div className={styles.spinner}></div>
        <div className='my-2 fs-5 lead'>Loading questions ...</div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className='d-flex flex-column align-items-center justify-content-center my-5'>
        <div className='my-2 fs-5 lead'>An Error Occurred</div>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${isAnswered === false ? styles.buttonDisabled : ''}`}
            onClick={nextQuestion}
            disabled={isAnswered === false}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  const questions = result.data.results;
  const categoryLabel = categories.find(cat => cat.value === Number(category));
  return (
    <div className={styles.container}>
      <div className="container my-5">
        <div className="d-flex flex-column justify-content-start align-items-start">
          <div className="d-flex flex-row justify-content-between align-items-center w-100 my-2">
            <div className={styles.categoryLabel}>
              {categoryLabel ? categoryLabel.label : 'Unknown Category'}
            </div>
            <div className={styles.difficultyLabel}>
              {difficulty}
            </div>
          </div>
          <div className={styles.progress}>
            <div
              style={{
                width: `${Math.round(((currentQuestion + 1) / 10) * 100)}%`,
                backgroundColor: '#007bff', /* Bootstrap primary */
                height: '1rem',
              }}
            ></div>
          </div>
          <span className="my-2">Question {currentQuestion + 1}/10</span>
        </div>
        <div className="my-4 d-flex flex-column justify-content-center">
          <Question
            question={questions[currentQuestion]}
            setIsAnswered={setIsAnswered}
            isAnswered={isAnswered}
          />
          <div className={styles.buttonContainer}>
            {questions.length === currentQuestion + 1 ? (
              <button
                className={`${styles.button} ${isAnswered === false ? styles.buttonDisabled : ''}`}
                onClick={finishQuiz}
                disabled={isAnswered === false}
              >
                Finish
              </button>
            ) : (
              <button
                className={`${styles.button} ${isAnswered === false ? styles.buttonDisabled : ''}`}
                onClick={nextQuestion}
                disabled={isAnswered === false}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
