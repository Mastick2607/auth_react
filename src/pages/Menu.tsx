import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, difficulty } from '../components/request';
import classes from './../components/Menu.module.css';

export const Menu = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    difficulty: '',
  });

  const selectCategory = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  const selectDifficulty = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      difficulty: event.target.value,
    }));
  };

  const startQuiz = (event: any) => {
    event.preventDefault();
    navigate(`/quiz/${formData.category}/${formData.difficulty}/`);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={startQuiz} className={classes.form}>
        <div className={classes.radioGroup}>
          <h3>Select Category</h3>
          {categories.map((cat) => (
            <div key={cat.value}>
              <input
                type="radio"
                id={`${cat.label}`}
                name="category"
                onChange={selectCategory}
                value={cat.value}
              />
              <label htmlFor={`${cat.label}`}>{cat.label}</label>
            </div>
          ))}
        </div>

        <div className={classes.radioGroup}>
          <h3>Select Difficulty</h3>
          {difficulty.map((option) => (
            <div key={option}>
              <input
                type="radio"
                id={`${option}`}
                name="difficulty"
                onChange={selectDifficulty}
                value={option}
              />
              <label htmlFor={`${option}`}>{option}</label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`${classes.button} ${formData.category === '' || formData.difficulty === '' ? classes.buttonDisabled : classes.buttonEnabled}`}
          disabled={formData.category === '' || formData.difficulty === ''}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Menu;
