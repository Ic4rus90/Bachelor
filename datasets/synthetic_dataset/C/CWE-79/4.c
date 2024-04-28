#include <stdio.h>

int main() {
    char data[1000];
    printf("Content-type: text/html\n\n");
    printf("Enter table data: ");
    gets(data);
    printf("<html><body><table><tr><td>%s</td></tr></table>", data);
    printf("</body></html>");
    return 0;
}
