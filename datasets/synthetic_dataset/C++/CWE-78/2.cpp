#include <iostream>
#include <cstdlib>
int main() {
    char filename[256];
    std::cout << "Enter the filename to delete: ";
    std::cin.getline(filename, 256);
    std::string command = "rm -f " + std::string(filename);
    system(command.c_str());
    return 0;
}
