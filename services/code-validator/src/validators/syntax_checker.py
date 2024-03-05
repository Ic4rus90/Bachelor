from validators.py_val import is_valid_python_code
from validators.c_val import check_c_syntax
from validators.cpp_val import check_cpp_syntax
from validators.cs_val import check_csharp_syntax

def check_syntax_by_extension(code, file_extension):
    if file_extension == "py":
        is_valid_python_code(code)
    elif file_extension == "c":
        check_c_syntax(code)
    elif file_extension == "cpp":
        check_cpp_syntax(code)
    elif file_extension == "cs":
        check_csharp_syntax(code)
    else:
        raise ValueError("Invalid file extension")
