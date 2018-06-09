import React from 'react';
import QuizSelectedEntry from './QuizSelectedEntry.jsx'

const QuizSelected = (props) => {

  const questionsEntries = props.questionsData[0].questions.map ((question, id) => {
    return <QuizSelectedEntry questions={question.text} key={id}/>
  })

  // const answerChoicesEntries = props.quizzes.question[3].map ((choice, id) => {
  //   return <QuizChoicesEntry selection={choice.options} key={id}/>
  // })

  return (
    <div className="quiz-selected-container">
      <div className="quiz-question-container">
        <ul>
          {questionsEntries}
        </ul>
      </div>
      <div className="quiz-choice-container"></div>
    </div>
  )
}

export default QuizSelected;


