#include <stdio.h>

int main() {
    char listItems[1024];
    printf("Content-type: text/html\n\n");
    printf("Enter list items, separated by commas: ");
    fgets(listItems, sizeof(listItems), stdin);
    printf("<html><body><ul>");
    char *item = strtok(listItems, ",");
    while(item != NULL) {
        printf("<li>%s</li>", item);
        item = strtok(NULL, ",");
    }
    printf("</ul></body></html>");
    return 0;
}
