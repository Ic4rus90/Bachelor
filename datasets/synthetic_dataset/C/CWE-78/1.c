#include <stdlib.h>
#include <stdio.h>

int main() {
    char cmd[256];
    printf("Enter a domain to ping: ");
    gets(cmd);  
    system(cmd);
    return 0;
}
