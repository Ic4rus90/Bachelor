#include <stdlib.h>

int main() {
    char *buffer = malloc(100);
    free(buffer);
    if (buffer != NULL) {
        buffer[0] = 'x';  
    }
    return 0;
}
