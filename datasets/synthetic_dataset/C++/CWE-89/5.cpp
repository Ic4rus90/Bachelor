#include <iostream>
#include <string>
#include <mysql/mysql.h>

int main() {
    MYSQL* conn = mysql_init(nullptr);
    mysql_real_connect(conn, "localhost", "user", "password", "testdb", 0, nullptr, 0);
    std::string field, value;
    std::cout << "Enter search field (username, email): ";
    std::cin >> field;
    std::cout << "Enter search value: ";
    std::cin >> value;
    std::string query = "SELECT * FROM users WHERE " + field + " = '" + value + "'";
    mysql_query(conn, query.c_str());
    mysql_close(conn);
}
