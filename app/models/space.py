from .db import db, environment, SCHEMA, add_prefix_for_prod
from .space_users import space_users
from datetime import datetime


class Space(db.Model):
    __tablename__ = "spaces"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime)

    questions = db.relationship("Question", back_populates="space")
    owner = db.relationship("User", back_populates="spaces")

    users = db.relationship("User", secondary=space_users, back_populates="followed_spaces")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "ownerId": self.owner_id,
            "questions": [question.to_dict() for question in self.questions],
            "imageUrl": self.image_url,
            "createdAt": str(self.created_at),
            "updatedAt": str(self.updated_at)
        }
