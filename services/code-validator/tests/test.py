from fastapi.testclient import TestClient
from unittest.mock import patch

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))
from main import app, encode_code, decode_code

client = TestClient(app)

# Test encode and decode functions
def test_encode_decode():
    original_code = "print('Hello, World!')"
    encoded_code = encode_code(original_code)
    decoded_code = decode_code(encoded_code)
    assert original_code == decoded_code

# Test Python code
@patch('validators.py_val.is_valid_python_code')
def test_check_python_syntax(mock_is_valid_python_code):
    # Valid code
    mock_is_valid_python_code.return_value = True
    response = client.post("/check-syntax/", json={"file_extension": "py", "code": encode_code("print('Hello, World!')")})
    assert response.status_code == 200

    # Invalid code
    mock_is_valid_python_code.return_value = False
    response = client.post("/check-syntax/", json={"file_extension": "py", "code": encode_code("printf('Hello, World!'")})
    assert response.status_code == 400

# Test C code
@patch('validators.c_val.check_c_syntax')
def test_check_c_syntax(mock_check_c_syntax):
    # Valid code
    mock_check_c_syntax.return_value = True
    response = client.post("/check-syntax/", json={"file_extension": "c", "code": encode_code("int main() { return 0; }")})
    assert response.status_code == 200

    # Invalid code
    mock_check_c_syntax.return_value = False
    response = client.post("/check-syntax/", json={"file_extension": "c", "code": encode_code("int mains; +2")})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid code"}

# Test CPP code
@patch('validators.cpp_val.check_cpp_syntax')
def test_check_cpp_syntax(mock_check_cpp_syntax):
    # Valid code
    mock_check_cpp_syntax.return_value = True
    response = client.post("/check-syntax/", json={"file_extension": "cpp", "code": encode_code("""#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}""")})
    assert response.status_code == 200

    # Invalid code
    mock_check_cpp_syntax.return_value = False 
    response = client.post("/check-syntax/", json={"file_extension": "cpp", "code": encode_code("""#include <iostream>

int main(.) {,
    std::cout << "Hello World!";
    return 0;
}""")})
    assert response.status_code == 400  

# Test C# code
@patch('validators.cs_val.check_csharp_syntax')
def test_check_csharp_syntax(mock_check_csharp_syntax):
    # Valid code
    mock_check_csharp_syntax.return_value = True
    response = client.post("/check-syntax/", json={"file_extension": "cs", "code": encode_code("""class MyClass
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
    }
}""")})
    assert response.status_code == 200

    # Invalid code
    mock_check_csharp_syntax.return_value = False
    response = client.post("/check-syntax/", json={"file_extension": "cs", "code": encode_code("Console.WriteLine('Hello, World!');")})
    assert response.status_code == 400

# Test invalid file extension
def test_invalid_file_extension():
    response = client.post("/check-syntax/", json={"file_extension": "java", "code": encode_code("import java.util.*;")})
    assert response.status_code == 422
    assert response.json() == {"detail": "Invalid file extension"}

