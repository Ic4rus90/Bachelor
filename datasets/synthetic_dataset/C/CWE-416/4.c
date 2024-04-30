#include <stdio.h>
#include <stdlib.h>

int main() {
    char *text = malloc(50);
    sprintf(text, "Hello, world!");
    free(text);
    if (text) {
        printf("%s\n", text);  
    }
    return 0;
}
