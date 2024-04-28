#include <iostream>
#include <string>
int main() {
    std::string title, content;
    std::cout << "Enter blog post title: ";
    std::getline(std::cin, title);
    std::cout << "Enter blog post content: ";
    std::getline(std::cin, content);
    std::cout << "<html><head><title>" + title + "</title></head>";
    std::cout << "<body><h1>" + title + "</h1><p>" + content + "</p></body></html>";
    return 0;
}
