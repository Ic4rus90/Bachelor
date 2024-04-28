#include <stdlib.h>
#include <stdio.h>

int main() {
    char file[256];
    printf("Enter the file name to delete: ");
    scanf("%255s", file);
    char command[300];
    sprintf(command, "rm -rf %s", file);
    system(command);
    return 0;
}
