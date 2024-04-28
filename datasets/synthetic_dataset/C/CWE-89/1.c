#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char user_id[100];
    char query[150];
    printf("Enter user ID: ");
    scanf("%s", user_id);
    sprintf(query, "SELECT * FROM users WHERE id = '%s'", user_id);
    printf("Executing query: %s\n", query);
    return 0;
}
