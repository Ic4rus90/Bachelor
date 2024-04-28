#include <iostream>
int* allocate() {
    int* data = new int(42);
    return data;
}

int main() {
    int* value = allocate();
    delete value;
    if (value) {
        *value = 0;  
    }
    return 0;
}
