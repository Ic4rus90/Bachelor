#include <iostream>
#include <string>
int main() {
    std::string comment;
    std::cout << "Enter your comment: ";
    std::getline(std::cin, comment);
    std::cout << "<html><body><h2>Comments</h2><p>" + comment + "</p></body></html>";
    return 0;
}
