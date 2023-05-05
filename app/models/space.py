from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Space(db.Model):
    __tablename__ = "spaces"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    owner_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    questions = db.relationship("Question", back_populates="space")
    owner = db.relationship("User", back_populates="spaces")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ownerId": self.owner_id,
            "questions": [question.to_dict() for question in self.questions],
            "createdAt": str(self.created_at),
            "updatedAt": str(self.updated_at)
        }
