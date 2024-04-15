import React, { useState } from "react";

function QuestionForm({ onQuestionAdd }) {
  const initialFormData = {
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.slice(-1)); // Get the index of the answer field
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers.filter((answer) => answer.trim() !== ""),
      correctIndex: parseInt(formData.correctIndex),
    };

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      const createdQuestion = await response.json();
      console.log("New question created:", createdQuestion);

      // Invoke the onQuestionAdd callback to add the new question to the parent component
      onQuestionAdd(createdQuestion);

      // Reset form data after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Answers:
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            type="text"
            name={`answer${index}`}
            value={formData.answers[index]}
            onChange={handleChange}
            required
          />
        ))}
      </label>
      <label>
        Correct Index:
        <input
          type="number"
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
          min="0"
          max="3"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
