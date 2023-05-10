from .db import db , environment, SCHEMA, add_prefix_for_prod


space_users = db.Table(
    "space_users",
    db.Model.metadata,
    db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("spaces", db.Integer, db.ForeignKey(add_prefix_for_prod("spaces.id")))
)

if environment == "production":
    space_users.schema = SCHEMA
