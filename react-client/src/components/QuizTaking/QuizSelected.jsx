import React from 'react';
import QuizSelectedEntry from './QuizSelectedEntry.jsx'

const QuizSelected = (props) => {
  let score = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false
  }

  //patch to the user googleId
  const updateUserScore = function(googleId) {
    $.ajax({
      url: `home/${googleId}`,
      method: "PATCH"
    })
  }

  function scoreCounter (result) {
    let score = 0;

    for (let key in result) {
      if (result[key] === true) {
        score += 1;
      }
    }
    console.log(score)
  }

  const questionsEntries = props.questionsData[0].questions.map ((question, id) => {
    return <QuizSelectedEntry questions={question.text} selection={question.options} answer={question.correctAnswer} key={id} id={id} score={score}/>
  })

  return (
    <div className="quiz-selected-container">
      <div className="quiz-question-container">
        <ul>
          {questionsEntries}
          <div className="quiz-answer-submission">
            <button className="quiz-answer-confirmation" onClick={() => {scoreCounter(score)}}>Confirm Submission</button> 
          </div>
        </ul>
      </div>
    </div>
  )
}

export default QuizSelected;