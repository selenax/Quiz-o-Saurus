import React from 'react';


const QuizSelectedEntry = ({item, handleClick}) => {
  return (
    <div>
      <li className="quiz-selected-item">
        <div className="quiz-selected-item-question" onClick={() => handleClick(item)}>{item.question}</div>
        <img src={item.imageUrl} onClick={() => handleClick(item)} className="quiz-selected-item-image"/>
        <div className="quiz-selected-item-options">
            {item.body.map(option => (
                <div className="quiz-option" onClick={() => handleClick(option)}>{item.option}.</div>
            )
            )}
        </div>
      </li>
    </div>
  );
};

export default QuizSelectedEntry;
