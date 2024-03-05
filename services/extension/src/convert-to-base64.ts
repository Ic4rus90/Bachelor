

function encodeToBase64(string: string) : string {
    // 
    const encoded_string: string = btoa(string);
    return encoded_string;
  }


function decodeFromBase64(encoded_string: string) : string {
    // 
    const decoded_string: string = atob(encoded_string);
    return decoded_string;
  }

  export { encodeToBase64, decodeFromBase64 };