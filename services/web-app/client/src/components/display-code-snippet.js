import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import atomdark from './atomdark';
import './display-code.css'



const CodeBlockSnippet = ({ codeString, language }) => (
  <SyntaxHighlighter 
    language={language} 
    style={atomdark} 
  >
    {codeString}
  </SyntaxHighlighter>
);

export default CodeBlockSnippet;