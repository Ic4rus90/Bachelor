import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomdark from './atomdark';
import './display-code.css'


// Displays code snippet with syntax highlighting
const CodeBlockSnippet = ({ codeString, language }) => (
  <SyntaxHighlighter 
    language={language} // Specifies programming language for correct syntax highlighting
    style={atomdark} 
  >
    {codeString} 
  </SyntaxHighlighter>
);

export default CodeBlockSnippet;