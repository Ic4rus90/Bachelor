#include <iostream>
#include <string>
#include <sqlite3.h>

int main() {
    sqlite3* db;
    sqlite3_open("example.db", &db);
    std::string username;
    std::cout << "Enter username: ";
    std::cin >> username;
    std::string query = "SELECT * FROM users WHERE username = '" + username + "'";
    sqlite3_exec(db, query.c_str(), nullptr, nullptr, nullptr);
    sqlite3_close(db);
}
