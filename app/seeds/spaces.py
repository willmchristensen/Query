from app.models import db, Space, environment, SCHEMA
from sqlalchemy.sql import text

#   space = Space(
#         name=",
#         image_url=,
#         owner_id=
#     )
def seed_spaces():
    space1 = Space(
        name="Internet of Things",
        image_url="https://images.unsplash.com/photo-1610168388710-a8cfbafe6c30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        description="A space where people gather to talk about the Internet",
        owner_id= 4
    )
    space2 = Space(
        name="Virtual Reality",
        image_url="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80",
        description="A space where people gather to talk about Virtual Reality",
        owner_id=2
    )
    space3 = Space(
        name="Product Management",
        image_url="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80",
        description="A space where people gather to talk about Product Management",
        owner_id=3
    )
    space4 = Space(
        name="Graphic Design",
        image_url="https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        description="A space where people gather to talk about Graphic Design",
        owner_id=1
    )
    space5 = Space(
        name="User Experience Design",
        image_url="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        description="A space where people gather to talk about UI",
        owner_id=2
    )
    space6 = Space(
        name="Game Development",
        image_url="https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        description="A space where people gather to talk about Game Development",
        owner_id=3
    )
    space7 = Space(
        name="Blockchain",
        image_url="https://plus.unsplash.com/premium_photo-1672914187190-3bb9eaed6a27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
        description="A space where people gather to talk about the Blockchain",
        owner_id=1
    )
    space8 = Space(
        name="Cybersecurity",
        image_url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        description="A space where people gather to talk about Cybersecurity",
        owner_id=2
    )

    all_spaces = [space1, space2, space3, space4, space5, space6, space7, space8]
    add_spaces = [db.session.add(space) for space in all_spaces]
    db.session.commit()


def undo_spaces():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.spaces RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spaces"))

    db.session.commit()
