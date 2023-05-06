from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text


def seed_questions():
    question1 = Question(
        details="What is the meaning of life?",
        user_id=1
    )
    question2 = Question(
        details="If I'm a barbie girl in a Barbie world, And if it's plastic and its fantistic, am i made of furniture?",
        user_id=2,
        space_id=1
    )
    question3 = Question(
        details="Am I really too cool for school?",
        user_id=3,
        space_id=2
    )
    question4 = Question(
        details= "You may say I'm a dreamer. But am I the only one?",
        user_id=1,
        space_id=3
    )
    question5 = Question(
        details="How much wood would a wood chuck chuck if a wood chuck could chuck will?",
        user_id=2,
        space_id=4
    )
    question6 = Question(
        details="How do you know you're alive?",
        user_id=3,
        space_id=5
    )
    question7 = Question(
        details="What is query?",
        user_id=1,
        space_id=6
    )
    question8 = Question(
        details="Where do i find my internet?",
        user_id=2,
        space_id=7
    )
    question9 = Question(
        details="What is my browser?",
        user_id=3,
        space_id=8
    )
    question10 = Question(
        details="What does my tounge tase like?",
        user_id=1,
        space_id=1
    )
    question11 = Question(
        details="Does water burn?",
        user_id=2,
        space_id=2
    )
    question12 = Question(
        details="Is water wet?",
        user_id=3,
        space_id=3
    )
    question13 = Question(
        details="If i'm mostly water, do I burn?",
        user_id=1,
        space_id=4
    )
    question14 = Question(
        details="Burn Wards near me?",
        user_id=2,
        space_id=5
    )
    question15 = Question(
        details="What does fire taste like?",
        user_id=3,
        space_id=6
    )
    question16 = Question(
        details="Does boiling water tase different than other water?",
        user_id=1,
        space_id=7
    )
    question16 = Question(
        details="Can i unburn my tounge?",
        user_id=2,
        space_id=8
    )

    all_questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16]
    add_questions = [db.session.add(question) for question in all_questions]
    db.session.commit()


def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
