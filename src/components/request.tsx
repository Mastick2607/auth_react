import axios from 'axios';

const baseUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';

// Tipado básico de los parámetros
export const getQuestions = ({ category, difficulty }: { category: number, difficulty: string }) => {
  return axios
    .get(`${baseUrl}&difficulty=${difficulty}&category=${category}`)
    .then((res) => res.data);
};

// Tipado sencillo para las categorías
export const categories = [
  { label: 'General Knowledge', value: 9 },
  { label: 'Entertaiment: Music', value: 12 },
  { label: 'Science and Nature', value: 17 },
  { label: 'Sports', value: 21 },
  { label: 'Geography', value: 22 },
];

// Tipado básico de las dificultades
export const difficulty: string[] = ['easy', 'medium', 'hard'];