import sqlite3

def add_user(username, password):
    connection = sqlite3.connect('users.db')
    cursor = connection.cursor()
    query = "INSERT INTO users (username, password) VALUES ('" + username + "', '" + password + "')"
    cursor.execute(query)
    connection.commit()
    connection.close()
