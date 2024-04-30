#include <iostream>
#include <cstdlib>
int main() {
    char ip[256], count[256];
    std::cout << "Enter IP address to ping: ";
    std::cin.getline(ip, 256);
    std::cout << "Enter count: ";
    std::cin.getline(count, 256);
    std::string command = "ping -c " + std::string(count) + " " + std::string(ip);
    system(command.c_str());
    return 0;
}
