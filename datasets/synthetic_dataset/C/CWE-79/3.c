#include <stdio.h>

int main() {
    char name[100], bio[256];
    printf("Content-type: text/html\n\n");
    printf("Enter your name: ");
    gets(name);
    printf("Enter your bio: ");
    gets(bio);
    printf("<html><body><h1>%s's Profile</h1>", name);
    printf("<p>%s</p>", bio);
    printf("</body></html>");
    return 0;
}
