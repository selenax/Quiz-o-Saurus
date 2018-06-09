import React from 'react';
import QuizSelectedEntry from './QuizSelectedEntry.jsx'

const QuizSelected = (props) => {

  const questionsEntries = props.questionsData[0].questions.map ((question, id) => {
    return <QuizSelectedEntry questions={question.text} selection={question.options} key={id}/>
  })

  return (
    <div className="quiz-selected-container">
      <div className="quiz-question-container">
        <ul>
          {questionsEntries}
        </ul>
      </div>

    </div>
  )
}

export default QuizSelected;


