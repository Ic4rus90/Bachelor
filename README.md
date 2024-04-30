# Bachelor

Welcome
Welcome to Security Seal. We utilize an advanced microservices architecture with an LLM to analyze your code for security vulnerabilities from the CWE top 25 list (https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html).
Please note: This version of the software is for testing purposes only, and the seal of approval does not guarantee that your code is secure.

How to use Security Seal
Make sure you are either at campus Grimstad utilizing eduroam or have eduVPN activated. Navigate to https://cair-gpu12.uia.no:8500, and create an account. In this web-application you will be able to see the complete report of your most recent vulnerability scan, including the full code and all detected vulnerabilities.

Select the code you want to analyze, right-click and select "Analyze code with Security Seal".

If you have not yet authenticated with the extension, press the authentication button that appears in the lower right hand corner, and log in with the user you created at the web application. Please note, the system currently only supports C, C++, C# and Python, and the code needs to be functional.

When authentication is successfull, close the tab and go back to Visual Studio Code. Right-click the selected code again, and select "Analyze with Security Seal".

Sit back and wait for our system to perform the check. This might take some time, so be patient.
Please note: As we are only operating with one LLM, rate limiting is implemented. This means that you will only be able to send about one request per minute.

When the process has finished, you will get a summary of the generated report in the extension, containing the vulnerabilities detected. To see the full report, sign in to the web application. If you perform the scan while on the dashboard page of the web application, navigate to the account page and back to the dashboard to display the most recent scan.

If you wish to log out of the web application or delete your account, you can click the account button in the upper right hand corner of the web application, and select the respective option.