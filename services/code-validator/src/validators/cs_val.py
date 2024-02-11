from antlr4 import *
from parsers.cs.CSharpLexer import CSharpLexer
from parsers.cs.CSharpParser import CSharpParser
from antlr4.error.ErrorListener import ErrorListener

class CustomErrorListener(ErrorListener):
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        raise SyntaxError(f"Syntax error at {line}:{column} - {msg}")

def check_csharp_syntax(code):
    input_stream = InputStream(code)
    lexer = CSharpLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = CSharpParser(stream)
    parser.removeErrorListeners()
    parser.addErrorListener(CustomErrorListener())
    tree = parser.compilation_unit()  # Adjust according to the entry point of your grammar

    return True
