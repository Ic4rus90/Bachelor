#include <stdlib.h>
#include <stdio.h>

int main() {
    char ip[100];
    char option[100];
    printf("Enter IP address: ");
    scanf("%99s", ip);
    printf("Enter ping options: ");
    scanf("%99s", option);
    char command[300];
    sprintf(command, "ping %s %s", option, ip);
    system(command);
    return 0;
}
