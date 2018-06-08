import React from 'react';

const QuizListComponent = (props) => {
    return (
        <div className="quiz-list-container">
            <ul>
                <div className="quiz-list-display">
                    <img src="https://i.pinimg.com/564x/ca/a8/42/caa8423f1fb11e575ed1795372531a26.jpg" className="quiz-list-image"/>
                    <div className="quiz-list-title">Quiz O' Saurus Fun Facts</div>
                </div>
                <div className="quiz-list-display">
                    <img src="https://i.pinimg.com/564x/ca/a8/42/caa8423f1fb11e575ed1795372531a26.jpg" className="quiz-list-image"/>
                    <div className="quiz-list-title">Quiz O' Saurus Fun Facts</div>
                </div>
            </ul>
        </div>
    );
}

export default QuizListComponent;