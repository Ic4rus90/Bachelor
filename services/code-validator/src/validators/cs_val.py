from antlr4 import *
from parsers.cs.CSharpLexer import CSharpLexer
from parsers.cs.CSharpParser import CSharpParser
from antlr4.error.ErrorListener import ErrorListener

# Error listener to raise an exception when a syntax error is found
class CustomErrorListener(ErrorListener):
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        raise SyntaxError(f"Syntax error at {line}:{column} - {msg}")

# Function to check the syntax of the C# code using the ANTLR parser
def check_csharp_syntax(code):
    input_stream = InputStream(code)
    lexer = CSharpLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = CSharpParser(stream)
    parser.removeErrorListeners()
    parser.addErrorListener(CustomErrorListener())
    tree = parser.compilation_unit()  # Adjust according to the entry point of your grammar

    return True
