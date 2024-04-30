#include <stdio.h>
#include <stdlib.h>

int main() {
    int *data = (int*) malloc(5 * sizeof(int));
    data[5] = 20;  
    free(data);
    return 0;
}
