import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  const handleQuestionAdd = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <main>
      <AdminNavBar onChangePage={handlePageChange} />
      {page === "Form" ? (
        <QuestionForm onQuestionAdd={handleQuestionAdd} />
      ) : (
        <QuestionList questions={questions} />
      )}
    </main>
  );
}

export default App;

