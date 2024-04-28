import psycopg2

def update_user_status(userid, status):
    connection = psycopg2.connect("dbname=enterprise user=postgres")
    cursor = connection.cursor()
    query = "UPDATE users SET status = '" + status + "' WHERE id = '" + userid + "'"
    cursor.execute(query)
    connection.commit()
    connection.close()
