import psycopg2

def search_product(name):
    conn = psycopg2.connect("dbname=test user=admin")
    cur = conn.cursor()
    cur.execute("SELECT * FROM products WHERE name = '" + name + "'")
    results = cur.fetchall()
    conn.close()
    return results
