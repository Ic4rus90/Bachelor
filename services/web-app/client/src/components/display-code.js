import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomdark from './atomdark';
import './display-code.css'


// Displays code with syntax highlighting
const CodeBlock = ({ codeString, language }) => (
  <SyntaxHighlighter 
    language={language} // Specifies programming language for correct syntax highlighting
    style={atomdark} 
    showLineNumbers={true} 
    lineNumberStyle={{ color: '#888', paddingRight: '30px', paddingLeft: '10px' }} 
  >
    {codeString}
  </SyntaxHighlighter>
);

export default CodeBlock;