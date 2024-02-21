# This is translated from the Java files in the antlr grammar repository https://github.com/antlr/grammars-v4/blob/master/csharp/Java/CSharpParserBase.java

from antlr4 import Parser

class CSharpParserBase(Parser):
    def __init__(self, input, output=None):
        super().__init__(input, output)

    def IsLocalVariableDeclaration(self):
        if not isinstance(self._ctx, CSharpParser.Local_variable_declarationContext):
            return False
        local_var_decl = self._ctx
        if local_var_decl is None:
            return True
        local_variable_type = local_var_decl.local_variable_type()
        if local_variable_type is None:
            return True
        if local_variable_type.getText() == "var":
            return False
        return True
