const mapExtensionToLanguage = (extension) => {
    const languageMap = {
      c: 'c',
      cpp: 'cpp',
      cs: 'csharp',
      py: 'python',
      // ...other mappings
    };
  
    return languageMap[extension] || extension;
  };
  
  export default mapExtensionToLanguage;