import React, { useState } from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  const handleCorrectIndexChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    setSelectedCorrectIndex(newCorrectIndex);

    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update correct index');
        }
        
        const updatedQuestion = { ...question, correctIndex: newCorrectIndex };
      })
      .catch(error => console.error('Error updating correct index:', error));
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={selectedCorrectIndex}
          onChange={handleCorrectIndexChange}
        >
          {options}
        </select>
      </label>
      <button onClick={onDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;


