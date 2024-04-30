#include <stdio.h>

int main() {
    char comment[256];
    printf("Content-type: text/html\n\n");
    printf("Enter your comment: ");
    fgets(comment, sizeof(comment), stdin);
    printf("<html><body><h2>User Comments</h2>");
    printf("<p>%s</p>", comment);
    printf("</body></html>");
    return 0;
}
