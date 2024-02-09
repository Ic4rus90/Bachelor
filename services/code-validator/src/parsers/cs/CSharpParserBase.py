from antlr4 import Parser

class CSharpParserBase(Parser):
    def __init__(self, input, output=None):
        super().__init__(input, output)

    def IsLocalVariableDeclaration(self):
        # In Python, isinstance checks if the first arg is an instance of the second arg
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
