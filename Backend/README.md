This is the backend. We have 2 table:
- Users server mapping usernames to points, preferences, etc... if necessary
- Stories server mapping usernames to stories and their state

We will expose an API that lets you
- Given a user, return the story and its progress and the competitor and their progress
- Be able to update the user progress

TODO
0. Be able to serialize/deserialize entries
1. Close API
2. Filter sports by times and by preferences when selecting