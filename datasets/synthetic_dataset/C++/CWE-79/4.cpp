#include <iostream>
#include <string>
#include <vector>
int main() {
    std::vector<std::string> items;
    std::string item;
    while (true) {
        std::cout << "Enter an item (type 'done' to finish): ";
        std::getline(std::cin, item);
        if (item == "done") break;
        items.push_back(item);
    }
    std::cout << "<html><body><ul>";
    for (const auto& it : items) {
        std::cout << "<li>" + it + "</li>";
    }
    std::cout << "</ul></body></html>";
    return 0;
}
