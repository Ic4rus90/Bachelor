#include <stdio.h>
#include <string.h>

int main() {
    char input[16];
    printf("Enter a long string: ");
    fgets(input, 64, stdin);  
    printf("Input: %s\n", input);
    return 0;
}
