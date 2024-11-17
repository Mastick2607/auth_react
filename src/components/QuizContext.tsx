import { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface OptionsAction {
  type: 'SET_OPTIONS';
  payload: any[];
}

interface ScoreAction {
  type: 'SET_SCORE' | 'RESET_SCORE';
  payload?: number | null;
}

type OptionsState = any[];
type ScoreState = number | null;

const optionsReducer = (state: OptionsState, action: OptionsAction): OptionsState => {
  switch (action.type) {
    case 'SET_OPTIONS':
      return action.payload;
    default:
      return state;
  }
};

const scoreReducer = (state: ScoreState, action: ScoreAction): ScoreState => {
  switch (action.type) {
    case 'SET_SCORE':
      return action.payload ?? null;
    case 'RESET_SCORE':
      return null;
    default:
      return state;
  }
};

interface QuizContextType {
  score: ScoreState;
  scoreDispatch: Dispatch<ScoreAction>;
  options: OptionsState;
  optionsDispatch: Dispatch<OptionsAction>;
}


const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizContextProviderProps {
  children: ReactNode;
}

export const QuizContextProvider = ({ children }: QuizContextProviderProps) => {
  const [options, optionsDispatch] = useReducer(optionsReducer, []);
  const [score, scoreDispatch] = useReducer(scoreReducer, null);

  return (
    <QuizContext.Provider value={{ score, scoreDispatch, options, optionsDispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
