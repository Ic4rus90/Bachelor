#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char column[50], value[100];
    char query[200];
    printf("Enter search column: ");
    scanf("%s", column);
    printf("Enter value to search for: ");
    scanf("%s", value);
    sprintf(query, "SELECT * FROM data WHERE %s = '%s'", column, value);
    printf("Executing query: %s\n", query);
    return 0;
}
