from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text


def seed_answers():
    answer1 = Answer(
        owner_id=3,
        question_id=1,
        details="42"
    )
    answer2 = Answer(
        owner_id=2,
        question_id=1,
        details="Friends, Family, and good times"
    )
    answer3 = Answer(
        owner_id=1,
        question_id=2,
        details="You might be delusional."
    )
    answer4 = Answer(
        owner_id=3,
        question_id=2,
        details="Seek professional help."
    )
    answer5 = Answer(
        owner_id=2,
        question_id=3,
        details="No one is too cool for school"
    )
    answer6 = Answer(
        owner_id=1,
        question_id=3,
        details="Maybe school is too cool for you?"
    )
    answer7 = Answer(
        owner_id=2,
        question_id=4,
        details="We are all dreamers to some degree."
    )
    answer8 = Answer(
        owner_id=1,
        question_id=5,
        details="Exactly three pallets."
    )
    answer9 = Answer(
        owner_id=2,
        question_id=6,
        details="If you think about it."
    )
    answer10 = Answer(
        owner_id=3,
        question_id=7,
        details="The greatest group project in the Mod 6 December 2022 cohort."
    )
    answer11 = Answer(
        owner_id=1,
        question_id=8,
        details="A magical web that spreads across the world."
    )
    answer12 = Answer(
        owner_id=2,
        question_id=11,
        details="It is a bit of a complicated and dangerous topic for me to talk about, at least right now...."
    )


    all_answers = [answer1, answer2, answer3, answer4, answer5, answer6, answer7,  answer8, answer9, answer10, answer11, answer12]
    add_answers = [db.session.add(answer) for answer in all_answers]
    db.session.commit()


def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))

    db.session.commit()