// Maps the analysed code language received from the VS Code extension to the correct format
const mapExtensionToLanguage = (extension) => {
    const languageMap = {
      c: 'c',
      cpp: 'cpp',
      cs: 'csharp',
      py: 'python',
    };
  
    return languageMap[extension] || extension;
  };
  
  export default mapExtensionToLanguage;