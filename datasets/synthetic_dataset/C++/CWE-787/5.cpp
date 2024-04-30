#include <iostream>
int main() {
    int* data = new int[5];
    for (int i = 0; i <= 5; i++) {  
        data[i] = i;  
    }
    delete[] data;
    return 0;
}
