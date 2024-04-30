#include <iostream>
#include <string>
#include <pqxx/pqxx>

int main() {
    pqxx::connection conn("dbname=testdb user=postgres password=pass host=localhost");
    pqxx::work txn(conn);
    std::string product;
    std::cout << "Enter product name to search: ";
    std::cin >> product;
    std::string query = "SELECT price FROM products WHERE name = '" + product + "'";
    txn.exec(query);
    txn.commit();
}
