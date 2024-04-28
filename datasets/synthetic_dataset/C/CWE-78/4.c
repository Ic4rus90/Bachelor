#include <stdlib.h>
#include <stdio.h>

int main() {
    char action[10];
    char target[256];
    printf("Enter action (start/stop): ");
    scanf("%9s", action);
    printf("Enter service name: ");
    scanf("%255s", target);
    char command[300];
    sprintf(command, "%s %s", action, target);
    system(command);
    return 0;
}
