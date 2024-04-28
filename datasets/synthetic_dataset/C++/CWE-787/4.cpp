#include <iostream>
#include <cstring>
int main() {
    char dest[10];
    const char *src = "This is the string that will be copied into dest";
    strcpy(dest, src);  
    return 0;
}
