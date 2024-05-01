# Security Seal
Welcome to Security Seal. Security Seal is a system for scanning user code in C, C++, C# and Python for vulnerabilities in the CWE top 25 list (https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html) leveraging a large language model (LLM).
The system is developed using a microservice architecture with a Visual Studio Code extension for sending code to analysis and displaying a summary of the results, and a web application to display the report in its entirety.
The back-end services include a token validator, a code verifier (to verify that the code sent is in the correct language), an LLM (currently the Phind 34b model), and a report generator (for creating and summarizing the output from the LLM).
The services are orchestrated through Prefect.

## **Install Visual Studio Code extension**
1. Navigate to [services/extension](https://github.com/Ic4rus90/Bachelor/tree/main/services/extension) and download `security-seal-0.0.1.vsix`.
2. Open extensions in Visual Studio Code, click the three dots (...) and then _Install from VSIX..._
![image](https://github.com/Ic4rus90/Bachelor/assets/104506911/a43c0b63-efaa-48e6-ae0b-761efa55b0c9)

3. Find the downloaded `.vsix` and press install.

## How to use the extension 

### Signing up and signing in
1. Make sure you are either at University of Agder Campus Grimstad utilizing eduroam or have eduVPN activated.

2. Navigate to [Security Seal Homepage](https://cair-gpu12.uia.no:8500), and sign up. You can also skip this step, and sign up through the extension. _Note: The certificate of the web application is self-signed, and might produce warnings. You can safely navigate past this. If your browser does not allow you past this warning, both Firefox, Chrome and Edge has been shown to work._  

3. In Visual Studio Code, press `Ctrl + Shift + P` and find _Authenticate with Security Seal_.
![image](https://github.com/Ic4rus90/Bachelor/assets/104506911/b4ec5346-6b65-4fdc-976f-11c1db6d197a)

4. Click Open in the popup to open the authentication page.

5. The authentication page allows you to both register and log in. 
   ![image](https://github.com/Ic4rus90/Bachelor/assets/104506911/ca06aae6-b89b-45a6-8fb9-346ed1573754)
   When the process has been finished, you will receive a confirmation in the browser.

### Scanning the code

1. In Visual Studio Code, highlight the code you want to analyze, right click and select _Analyze code with Security Seal_. 
   ![image](https://github.com/Ic4rus90/Bachelor/assets/104506911/d9d1a93d-b35e-4cd7-b15d-f58d9ff460da)
   
   _Note: The file must be saved and have an extension reflecting the supported languages (.c, .cpp, .cs or .py)._

### Viewing the results
1. When the code analysis has been completed, a summary of the findings is presented in the output.
   For each detected vulnerability, the CWE ID and name will be presented, along with the code associated with the vulnerability.
   ![image](https://github.com/Ic4rus90/Bachelor/assets/104506911/334e85a4-55fc-41f8-bdfa-0883db10b19d)

2. To view the full report, navigate to the [Security Seal Homepage](https://cair-gpu12.uia.no:8500), and sign in. The report is presented on the landing page:
   ![image](https://github.com/Ic4rus90/Bachelor/assets/104506911/9d059f8c-2cd8-4d14-bfbe-0e11be441688)

3. By clicking the _Analyzed Code_ tab, you can view the entire code snippet that was sent for analysis with code highlighting.  
![image](https://github.com/Ic4rus90/Bachelor/assets/104506911/41eff5c9-4731-48f0-ab4a-f0d7d72712d0)


# Disclaimer
There is no guarantee that the reported results are correct.
