import React from 'react';
import QuizSelectedEntry from './QuizSelectedEntry.jsx';

const QuizSelected = ({data, handleClick}) => (
  <div className="quiz-selected">

    {data.map((item) => 
      <QuizSelectedEntry
        handleClick={handleClick}
        key={item._id}
        item={item} 
      />
    )}
  </div>
);

export default QuizSelected;

