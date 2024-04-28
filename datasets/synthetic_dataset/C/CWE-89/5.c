#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char condition[256], table[100];
    char query[400];
    printf("Enter table name: ");
    scanf("%s", table);
    printf("Enter search condition (e.g., 'price > 100'): ");
    scanf(" %[^\n]", condition);
    sprintf(query, "SELECT * FROM %s WHERE %s", table, condition);
    printf("Executing query: %s\n", query);
    return 0;
}
