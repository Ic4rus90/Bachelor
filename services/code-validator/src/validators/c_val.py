from antlr4 import *
from parsers.c.CLexer import CLexer
from parsers.c.CParser import CParser
from antlr4.error.ErrorListener import ErrorListener

# Error listener to raise an exception when a syntax error is found
class MyErrorListener(ErrorListener):
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        raise SyntaxError(f"Syntax error at {line}:{column} - {msg}")

# Function to check the syntax of the C code using the ANTLR parser
def check_c_syntax(code):
    input_stream = InputStream(code)
    lexer = CLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = CParser(stream)
    parser.removeErrorListeners()
    parser.addErrorListener(MyErrorListener())
    tree = parser.compilationUnit()  # Adjust according to the grammar entry point

    return True