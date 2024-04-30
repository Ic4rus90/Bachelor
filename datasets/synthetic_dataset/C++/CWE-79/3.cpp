#include <iostream>
#include <string>
int main() {
    std::string username;
    std::cout << "Enter your username: ";
    std::getline(std::cin, username);
    std::cout << "<html><body>Welcome, <b>" + username + "</b>!</body></html>";
    return 0;
}
