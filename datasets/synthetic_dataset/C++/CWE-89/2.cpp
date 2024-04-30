#include <iostream>
#include <string>
#include <mysql/mysql.h>

int main() {
    MYSQL* conn = mysql_init(nullptr);
    mysql_real_connect(conn, "localhost", "user", "password", "testdb", 0, nullptr, 0);
    std::string userID;
    std::cout << "Enter user ID to delete: ";
    std::cin >> userID;
    std::string query = "DELETE FROM users WHERE id = '" + userID + "'";
    mysql_query(conn, query.c_str());
    mysql_close(conn);
}
