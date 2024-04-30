#include <stdlib.h>

int main() {
    char *data = malloc(10);
    free(data);
    *data = 'a';  
    return 0;
}
