def is_valid_python_code(code):
    try:
        compile(code, "<string>", "exec")
        return True
    except SyntaxError as e:
        raise SyntaxError(e)
