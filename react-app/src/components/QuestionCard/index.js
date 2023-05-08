import './QuestionCard.css'


const QuestionCard = ({question}) => {

    return(
        <div className="question-card-container">
            <div className="question-card">
                <div className="question-text">
                    <h3>{question.details}</h3>
                </div>
            </div>   
        </div>
    )

}

export default QuestionCard