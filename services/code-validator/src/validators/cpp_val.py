from antlr4 import *
from parsers.cpp.CPP14Lexer import CPP14Lexer
from parsers.cpp.CPP14Parser import CPP14Parser
from antlr4.error.ErrorListener import ErrorListener

# Error listener to raise an exception when a syntax error is found
class CustomErrorListener(ErrorListener):
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        raise SyntaxError(f"Syntax error at {line}:{column} - {msg}")

# Function to check the syntax of the C++ code using the ANTLR parser
def check_cpp_syntax(code):
    input_stream = InputStream(code)
    lexer = CPP14Lexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = CPP14Parser(stream)
    parser.removeErrorListeners()
    parser.addErrorListener(CustomErrorListener())
    tree = parser.translationUnit()

    return True


