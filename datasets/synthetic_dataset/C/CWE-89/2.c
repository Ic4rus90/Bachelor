#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char username[100], password[100];
    char query[250];
    printf("Enter username: ");
    scanf("%s", username);
    printf("Enter password: ");
    scanf("%s", password);
    sprintf(query, "SELECT * FROM users WHERE username = '%s' AND password = '%s'", username, password);
    printf("Executing query: %s\n", query);
    return 0;
}
