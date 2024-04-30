import mysql.connector

def check_login(userid, userpassword):
    db = mysql.connector.connect(host="localhost", user="root", password="root", database="test")
    cursor = db.cursor()
    sql = "SELECT * FROM users WHERE userid = '" + userid + "' AND password = '" + userpassword + "'"
    cursor.execute(sql)
    result = cursor.fetchall()
    return result
