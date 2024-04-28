#include <iostream>
#include <vector>

int main() {
    std::vector<int*>* pointers = new std::vector<int*>();
    pointers->push_back(new int(1));
    pointers->push_back(new int(2));

    for (auto ptr : *pointers) {
        delete ptr;
    }
    for (auto ptr : *pointers) {
        *ptr = 3;  
    }

    delete pointers;
    return 0;
}
