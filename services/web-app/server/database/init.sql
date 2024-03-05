CREATE TABLE report (
  report_id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  report_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cwe (
  cwe_id VARCHAR(255) PRIMARY KEY,
  cwe_name VARCHAR(255) NOT NULL,
  cwe_description VARCHAR(500) NOT NULL
);


CREATE TABLE vulnerability (
  vuln_id SERIAL PRIMARY KEY,
  report_id INTEGER NOT NULL,
  cwe_id VARCHAR(255) NOT NULL,
  code_extract VARCHAR(500) NOT NULL,
  vuln_summary VARCHAR(500),
  FOREIGN KEY (report_id) REFERENCES report(report_id),
  FOREIGN KEY (cwe_id) REFERENCES cwe(cwe_id)
);

CREATE TABLE analyzed_code (
  analyzed_code_id SERIAL PRIMARY KEY,
  report_id INTEGER NOT NULL,
  code VARCHAR(5000) NOT NULL,
  code_language VARCHAR(50) NOT NULL,
  starting_line_number INT,
  FOREIGN KEY (report_id) REFERENCES report(report_id)
);

/* Populating CWE-table */
INSERT INTO cwe (cwe_id, cwe_name, cwe_description)
VALUES 
('CWE-787', 'Out-of-bounds Write', 'The software writes data past the end, or before the beginning, of the intended buffer.'),
('CWE-79', 'Improper Neutralization of Input During Web Page Generation (Cross-site Scripting)', 'The software does not neutralize or incorrectly neutralizes user-controllable input before it is placed in output that is used as a web page that is served to other users.'),
('CWE-125', 'Out-of-bounds Read', 'The software reads data past the end, or before the beginning, of the buffer.'),
('CWE-20', 'Improper Input Validation', 'The software does not validate or incorrectly validates input that can affect the control flow or data flow of a program.'),
('CWE-78', 'Improper Neutralization of Special Elements used in an OS Command (OS Command Injection)', 'The software constructs all or part of an OS command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended OS command when it is sent to a downstream component (OS command injection).'),
('CWE-89', 'Improper Neutralization of Special Elements used in an SQL Command (SQL Injection)', 'The product constructs all or part of an SQL command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended SQL command when it is sent to a downstream component.'),
('CWE-416', 'Use After Free', 'Referencing memory after it has been freed can cause a program to crash, use unexpected values, or execute code.'),
('CWE-22', 'Improper Limitation of a Pathname to a Restricted Directory (Path Traversal)', 'The software uses external input to construct a pathname that is intended to identify a file or directory that is located underneath a restricted parent directory, but the software does not properly neutralize special elements within the pathname that can cause the pathname to resolve to a location that is outside of the restricted directory.'),
('CWE-352', 'Cross-Site Request Forgery (CSRF)', 'The web application does not, or can not, sufficiently verify whether a well-formed, valid, consistent request was intentionally provided by the user who submitted the request.'),
('CWE-434', 'Unrestricted Upload of File with Dangerous Type', 'The software allows the attacker to upload or transfer files of dangerous types that can be automatically processed within the product’s environment.'),
('CWE-306', 'Missing Authentication for Critical Function', 'The software does not perform any authentication for functionality that requires a provable user identity or consumes a significant amount of resources.'),
('CWE-190', 'Integer Overflow or Wraparound', 'The software performs a calculation that can produce an integer overflow or wraparound, when the logic assumes that the resulting value will always be larger than the original value.'),
('CWE-502', 'Deserialization of Untrusted Data', 'The application deserializes untrusted data without sufficiently verifying that the resulting data will be valid.'),
('CWE-287', 'Improper Authentication', 'When an actor claims to have a given identity, the software does not prove or insufficiently proves that the claim is correct.'),
('CWE-476', 'NULL Pointer Dereference', 'The software dereferences a pointer that it expects to be valid, but is NULL, typically causing a crash or exit.'),
('CWE-798', 'Use of Hard-coded Credentials', 'The software contains hard-coded credentials, such as a password or cryptographic key, which it uses for its own inbound authentication, outbound communication to external components, or encryption of internal data.'),
('CWE-862', 'Missing Authorization', 'The software does not perform an authorization check when an actor attempts to access a resource or perform an action.'),
('CWE-345', 'Insufficient Verification of Data Authenticity', 'The software does not verify, or incorrectly verifies, the authenticity of data.'),
('CWE-918', 'Server-Side Request Forgery (SSRF)', 'The web server receives a URL or similar input from an upstream component and retrieves the contents of this URL, but it does not sufficiently ensure that the request is being sent to the expected destination.'),
('CWE-77', 'Improper Neutralization of Special Elements used in a Command (Command Injection)', 'The software constructs all or part of a command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended command when it is sent to a downstream component.'),
('CWE-119', 'Improper Restriction of Operations within the Bounds of a Memory Buffer', 'The software performs operations on a memory buffer, but it can read from or write to a memory location that is outside of the intended boundary of the buffer.'),
('CWE-276', 'Incorrect Default Permissions', 'The software, upon installation, sets incorrect permissions for an object that exposes it to an unintended actor.'),
('CWE-200', 'Exposure of Sensitive Information to an Unauthorized Actor', 'The software exposes sensitive information to an actor that is not explicitly authorized to have access to that information.'),
('CWE-522', 'Insufficiently Protected Credentials', 'The software stores or transmits credentials in a way that is not sufficiently protected against unauthorized access.'),
('CWE-732', 'Incorrect Permission Assignment for Critical Resource', 'The software specifies permissions for a security-critical resource in a way that allows that resource to be read or modified by unintended actors.');

/* Example data 1 */
INSERT INTO report (user_id) VALUES ('auth0|65c8f6bf6691787817548bf0');

INSERT INTO vulnerability (report_id, cwe_id, code_extract, vuln_summary)
VALUES (1, 'CWE-79', '<script>alert("XSS")</script>', 'A cross-site scripting vulnerability was found in the input validation routines.');

INSERT INTO analyzed_code (report_id, code, code_language, starting_line_number)
VALUES (1, 'console.log("Hello, world!");', 'JavaScript', 1);

/* Example data 2 */
INSERT INTO report (user_id) VALUES ('auth0|65c8f6bf6691787817548bf0');

INSERT INTO vulnerability (report_id, cwe_id, code_extract, vuln_summary)
VALUES (2, 'CWE-79', 
E'@app.route(''/'')
    def hello():
        name = request.args.get(''name'', ''World'')
        return render_template_string(''<h1>Hello '' + name + ''!</h1>'')', 
'This code constructs an HTML response using unsanitized input from a requests query parameter, which could be exploited for XSS.');

INSERT INTO vulnerability (report_id, cwe_id, code_extract, vuln_summary)
VALUES (2, 'CWE-89', 
E'@app.route(''/sum/<int:a>/<int:b>'')
    def add(a, b):
        result = a + b
        return render_template_string(''<h3>Sum: {{result}}</h3>'', result=result)', 
'This code constructs a SQL query using unsanitized input from a requests query parameter, which could be exploited for SQL injection.');

INSERT INTO analyzed_code (report_id, code, code_language, starting_line_number)
VALUES (2, E'from flask import Flask, request, render_template_string, jsonify\n\napp = Flask(__name__)\n\n@app.route(''/'')\ndef hello():\n    name = request.args.get(''name'', ''World'')\n    return render_template_string(''<h1>Hello '' + name + ''!</h1>'')\n\n@app.route(''/greet/<username>'')\ndef greet_user(username):\n    return render_template_string(''<h2>Greetings, {{username}}!</h2>'', username=username)\n\n@app.route(''/postdata'', methods=[''POST''])\ndef handle_data():\n    data = request.json\n    return jsonify({''message'': ''Data received'', ''yourData'': data})\n\n@app.route(''/about'')\ndef about():\n    return ''<h3>About Us</h3><p>This is a simple Flask application.</p>''\n\n@app.route(''/sum/<int:a>/<int:b>'')\ndef add(a, b):\n    result = a + b\n    return render_template_string(''<h3>Sum: {{result}}</h3>'', result=result)\n\nif __name__ == ''__main__'':\n    app.run(debug=True)\n', 
'Python', 1);

