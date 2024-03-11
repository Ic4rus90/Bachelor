import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import atomdark from './atomdark';
import './display-code.css'



const CodeBlock = ({ codeString, language }) => (
  <SyntaxHighlighter 
    language={language} 
    style={atomdark} 
    showLineNumbers={true} // Enable line numbers
    lineNumberStyle={{ color: '#888', paddingRight: '30px', paddingLeft: '10px' }} // Style line numbers
  >
    {codeString}
  </SyntaxHighlighter>
);

export default CodeBlock;