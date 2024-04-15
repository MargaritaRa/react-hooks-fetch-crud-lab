import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(questions => setQuestions(questions))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedQuestions = questions.filter(question => question.id !== questionId);
        setQuestions(updatedQuestions);
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={() => handleDeleteQuestion(question.id)}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;


