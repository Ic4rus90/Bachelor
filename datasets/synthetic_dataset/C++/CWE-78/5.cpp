#include <iostream>
#include <cstdlib>
#include <string>
int main() {
    char host[256], options[256];
    std::cout << "Enter host to scan: ";
    std::cin.getline(host, 256);
    std::cout << "Enter scan options: ";
    std::cin.getline(options, 256);
    std::string command = "nmap " + std::string(options) + " " + std::string(host);
    system(command.c_str());
    return 0;
}
