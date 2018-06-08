import React from 'react';

const QuizListComponent = (props) => {
  return (
    <div className="quiz-list-container">
      <ul>
        { props.quizData.quizzes.map ( (quiz, id) => 
          <div className="quiz-list-display" key={id}>
            <img src={quiz.imgUrl} className="quiz-list-image"/>
            <div className="quiz-list-creator">{quiz.creator}</div>
            <div className="quiz-list-title">{quiz.quizName}</div>
          </div>
        )}
        </ul>
    </div>
  );
}

export default QuizListComponent;
