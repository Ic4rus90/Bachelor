#include <iostream>
int main() {
    int* array = new int[5]{1, 2, 3, 4, 5};
    delete[] array;
    array[3] = 10;  
    return 0;
}
