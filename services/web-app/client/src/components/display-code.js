import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ codeString }) => (
  <SyntaxHighlighter language="python" style={coldarkDark}>
    { codeString }
  </SyntaxHighlighter>
);

export default CodeBlock;
