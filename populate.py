"""
This script populates the database with some sample data.
"""

import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["event-planner"]

users = [
    {"email": "user1@example.com", "username": "user1", "password": "password1", "name": "User 1", "link": "https://example.com/user1"},
    {"email": "user2@example.com", "username": "user2", "password": "password2", "name": "User 2", "link": "https://example.com/user2"},
]

db.users.insert_many(users)

events = [
    {"title": "event 1", "body": "event 1 desc", "organizer": "user1", "date": "2025-01-01", "location": "location 1", "thumbnail": "thumbnail 1", "maxAttendees": 10, "contact": "contact 1", "price": 10, "isPublic": True, "tags": ["tag1", "tag2"]},
    {"title": "event 2", "body": "event 2 desc", "organizer": "user2", "date": "2025-01-02", "location": "location 2", "thumbnail": "thumbnail 2", "maxAttendees": 10, "contact": "contact 2", "price": 10, "isPublic": False, "tags": ["tag3", "tag4"]},
]

db.events.insert_many(events)
