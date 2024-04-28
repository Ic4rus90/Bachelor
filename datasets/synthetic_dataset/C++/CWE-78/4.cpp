#include <iostream>
#include <cstdlib>
int main() {
    int choice;
    char param[256];
    std::cout << "Enter 1 to ping, 2 to traceroute: ";
    std::cin >> choice;
    std::cin.ignore();
    std::cout << "Enter parameter: ";
    std::cin.getline(param, 256);
    std::string command = (choice == 1 ? "ping " : "traceroute ") + std::string(param);
    system(command.c_str());
    return 0;
}
