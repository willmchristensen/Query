from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Answer(db.Model):
    __tablename__ = "answers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
    details = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    question = db.relationship("Question", back_populates="answers")
    replies = db.relationship("Reply", back_populates="answer", cascade="all, delete-orphan")
    owner = db.relationship("User", back_populates="answers")

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.owner_id,
            "questionId": self.question_id,
            "details": self.details,
            "createdAt": str(self.created_at),
            "updatedAt": str(self.updated_at),
            # "question": self.question.to_dict(),
            # "replies": [reply.to_dict() for reply in self.replies]
        }
