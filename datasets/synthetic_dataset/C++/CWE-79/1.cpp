#include <iostream>
#include <string>
int main() {
    std::string title;
    std::cout << "Enter page title: ";
    std::getline(std::cin, title);
    std::cout << "<html><head><title>" + title + "</title></head><body></body></html>";
    return 0;
}
