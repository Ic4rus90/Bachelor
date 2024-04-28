#include <iostream>
class Widget {
public:
    void display() const { std::cout << "Displaying Widget" << std::endl; }
};

int main() {
    Widget* widget = new Widget();
    delete widget;
    widget->display();  
    return 0;
}
