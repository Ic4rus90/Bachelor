#include <stdlib.h>
#include <stdio.h>

int main() {
    char host[256];
    printf("Enter the host address for SSH: ");
    scanf("%255s", host);
    char command[300];
    sprintf(command, "ssh $USER@%s", host);  
    system(command);
    return 0;
}
