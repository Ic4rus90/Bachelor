function LLMStub(code: string, file_extension: string): string {
	const length_of_code = code.length;
	
	return `Hello,\nI am Greg v2\nYou provided the following code:\n${code}\nThe length is ${length_of_code}\nThe file is ${file_extension}.\nEverything looks okay\nFOR NOW.`;
}

export { LLMStub };