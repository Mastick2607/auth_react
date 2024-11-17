import { useContext, useEffect, useState } from 'react';
import QuizContext from '../components/QuizContext';
import { useNavigate } from 'react-router-dom';
import classes from '../components/Results.module.css'; // Asegúrate de crear este archivo

export const Result = () => {
  const [highscore, setHighScore] = useState<number | null>(parseInt(localStorage.getItem('highScore') || '0', 10));
  const { score, scoreDispatch } = useContext(QuizContext) as { score: number | null; scoreDispatch: any };
  const navigate = useNavigate();

  useEffect(() => {
    if (score === null) {
      navigate('/');
    } else if (score > (highscore || 0)) {
      setHighScore(score);
      localStorage.setItem('highScore', JSON.stringify(score));
    }
  }, [score, highscore, navigate]);

  const goToMainMenu = () => {
    scoreDispatch({ type: 'RESET_SCORE' });
    navigate('/menu');
  };

  const retakeQuiz = () => {
    scoreDispatch({ type: 'RESET_SCORE' });
    navigate(-1);
  };

  const scorePercentage = Math.round((score! / 10) * 100);
  const highScorePercentage = highscore === null ? 0 : Math.round((highscore / 10) * 100);

  return (
    <div className={classes.container}>
      <div className={classes.title}>RESULT</div>
      <div className={`${classes.scoreBox} ${scorePercentage > 40 ? classes.bgSuccess : classes.bgDanger}`}>
        You scored {score} out of {10} ({scorePercentage}%)
      </div>
      <div className={classes.highscore}>Highscore: {highscore || 0} ({highScorePercentage}%)</div>
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={goToMainMenu}>
          Main Menu
        </button>
        <button className={classes.button} onClick={retakeQuiz}>
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
