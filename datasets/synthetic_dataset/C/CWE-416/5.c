#include <stdlib.h>

int main() {
    int *values = malloc(10 * sizeof(int));
    free(values);
    values = malloc(10 * sizeof(int));  
    values[0] = 1;  
    return 0;
}
