from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Reply(db.Model):
    __tablename__ = "replies"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("answers.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime)

    owner = db.relationship("User", back_populates="replies")
    answer = db.relationship("Answer", back_populates="replies")


    def to_dict(self):
        return {
            "id": self.id,
            "details": self.details,
            "ownerId": self.owner_id,
            "answerId": self.answer_id,
            "createdAt": str(self.created_at),
            "updatedAt": str(self.updated_at)
        }
