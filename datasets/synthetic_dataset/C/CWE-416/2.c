#include <stdlib.h>

void process() {
    int *ptr = malloc(sizeof(int));
    *ptr = 10;
    free(ptr);
    *ptr = 20;  
}

int main() {
    process();
    return 0;
}
