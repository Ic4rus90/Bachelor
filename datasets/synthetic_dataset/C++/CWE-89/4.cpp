#include <iostream>
#include <string>
#include <sqlite3.h>

int main() {
    sqlite3* db;
    sqlite3_open("secure.db", &db);
    std::string user, pass;
    std::cout << "Username: ";
    std::cin >> user;
    std::cout << "Password: ";
    std::cin >> pass;
    std::string sql = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
    sqlite3_exec(db, sql.c_str(), nullptr, nullptr, nullptr);
    sqlite3_close(db);
}
