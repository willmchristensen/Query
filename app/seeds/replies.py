from app.models import db, Reply, environment, SCHEMA
from sqlalchemy.sql import text


def seed_replies():
    reply1 = Reply(
        details="I cannot believe you said this.",
        owner_id=1,
        answer_id=1
    )
    reply2 = Reply(
        details="I cannot believe you said this.",
        owner_id=3,
        answer_id=2
    )
    reply3 = Reply(
        details="I cannot believe you said this.",
        owner_id=2,
        answer_id=3
    )
    reply4 = Reply(
        details="I cannot believe you said this.",
        owner_id=1,
        answer_id=4
    )
    reply5 = Reply(
        details="I cannot believe you said this.",
        owner_id=2,
        answer_id=5
    )
    reply6 = Reply(
        details="I cannot believe you said this.",
        owner_id=3,
        answer_id=6
    )
    reply7 = Reply(
        details="I cannot believe you said this.",
        owner_id=1,
        answer_id=7
    )
    reply8 = Reply(
        details="What are your sources?",
        owner_id=2,
        answer_id=8
    )
    reply9 = Reply(
        details="What are your sources?",
        owner_id=3,
        answer_id=9
    )
    reply10 = Reply(
        details="What are your sources?",
        owner_id=1,
        answer_id=10
    )
    reply11 = Reply(
        details="What are your sources?",
        owner_id=2,
        answer_id=1
    )
    reply12 = Reply(
        details="What are your sources?",
        owner_id=3,
        answer_id=11
    )
    reply13 = Reply(
        details="I cannot believe you said this.",
        owner_id=1,
        answer_id=12
    )
    reply14 = Reply(
        details="I cannot believe you said this.",
        owner_id=2,
        answer_id=2
    )


    all_replies = [reply1, reply2, reply3, reply4, reply5, reply6, reply7, reply8, reply9, reply10, reply11, reply12, reply13, reply14]
    add_replies = [db.session.add(reply) for reply in all_replies]
    db.session.commit()


def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM replies"))

    db.session.commit()