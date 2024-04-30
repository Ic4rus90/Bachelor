import sqlite3

def get_user_details(field, value):
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE {field} = '{value}'"
    cursor.execute(query)
    results = cursor.fetchall()
    conn.close()
    return results
