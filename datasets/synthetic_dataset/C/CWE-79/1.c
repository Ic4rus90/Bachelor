#include <stdio.h>

int main() {
    char title[100];
    printf("Content-type: text/html\n\n");
    printf("Enter page title: ");
    gets(title);  
    printf("<html><head><title>%s</title></head><body>", title);
    printf("Welcome to your personal page!");
    printf("</body></html>");
    return 0;
}
