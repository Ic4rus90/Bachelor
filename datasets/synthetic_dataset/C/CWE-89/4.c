#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char table[100], key[50], val[50];
    char query[300];
    printf("Enter table name: ");
    scanf("%s", table);
    printf("Enter key to search: ");
    scanf("%s", key);
    printf("Enter value for key: ");
    scanf("%s", val);
    sprintf(query, "SELECT * FROM %s WHERE %s = '%s'", table, key, val);
    printf("Executing query: %s\n", query);
    return 0;
}
