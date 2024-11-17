import { useContext, useEffect, useState } from 'react';
import QuizContext from '../components/QuizContext';
import classes from '../components/Question.module.css'; // Importa los estilos

const shuffle = (array:any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

interface QuestionType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
 interface Props {
  question:QuestionType,
  setIsAnswered:(isAnswered:boolean)=>void;
  isAnswered:boolean;
 }


 export const Question = (props:Props) => {

  const { question, setIsAnswered, isAnswered } = props;
  const [selectedOption, setSelectedOption] = useState('');

  const quizContext = useContext(QuizContext);

  // Verificar si el contexto está definido
  if (!quizContext) {
    throw new Error('QuizContext no está disponible');
  }

  const { score, scoreDispatch, options, optionsDispatch } = quizContext;

  // const [score, scoreDispatch, options, optionsDispatch] = useContext(QuizContext);

  useEffect(() => {
    const shuffledOptions = shuffle([question.correct_answer, ...question.incorrect_answers]);
    optionsDispatch({
      type: 'SET_OPTIONS',
      payload: shuffledOptions,
    });
  }, [question]);

  const selectOption = (opt:string) => {
    setSelectedOption(opt);
    if (opt === question.correct_answer) {
      scoreDispatch({
        type: 'SET_SCORE',
        payload: (score ?? 0) + 1,
      });
    }
    setIsAnswered(true);
  };

  const displayedOptions = options;
  return (
    <div className={classes.container}>
      <div>
        <div className={classes.question} dangerouslySetInnerHTML={{ __html: question.question }} />
        <div className={classes.options}>
          {isAnswered
            ? displayedOptions.map((opt:string, i:number) => (
                <button
                  key={i}
                  type="button"
                  className={`${classes.optionButton} ${classes.disabled} ${
                    opt === question.correct_answer ? classes.correct : '' 
                  } ${opt === selectedOption && opt !== question.correct_answer ? classes.incorrect : ''}`}
                  disabled
                  onClick={() => selectOption(opt)}
                >
                  <div dangerouslySetInnerHTML={{ __html: opt }} />
                </button>
              ))
            : displayedOptions.map((opt:string, i:number) => (
                <button
                  key={i}
                  type="button"
                  className={classes.optionButton}
                  onClick={() => selectOption(opt)}
                >
                  <div dangerouslySetInnerHTML={{ __html: opt }} />
                </button>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
