#include <iostream>
int main() {
    int* ptr = new int(10);
    delete ptr;
    *ptr = 20;  
    return 0;
}
