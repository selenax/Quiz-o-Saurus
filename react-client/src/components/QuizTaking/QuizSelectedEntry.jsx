import React from 'react';

const QuizSelectedEntry = (props) => {
  return (
    <div className="quiz-question-entry">
      {props.questions}
      <div className="quiz-answer-entry">
        <button> {props.selection[0]} </button>
        <button> {props.selection[1]} </button>
        <button> {props.selection[2]} </button>
        <button> {props.selection[3]} </button>
      </div>
    </div>
  )
};

export default QuizSelectedEntry;
