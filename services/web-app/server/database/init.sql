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

/* Example data 1 */
INSERT INTO report (user_id) VALUES ('auth0|65c8f6bf6691787817548bf0');

INSERT INTO cwe (cwe_id, cwe_name, cwe_description)
VALUES ('CWE-79', 'Improper Neutralization of Input During Web Page Generation (Cross-site Scripting)', 'The software does not neutralize or incorrectly neutralizes user-controllable input before it is placed in output that is used as a web page that is served to other users.');

INSERT INTO vulnerability (report_id, cwe_id, code_extract, vuln_summary)
VALUES (1, 'CWE-79', '<script>alert("XSS")</script>', 'A cross-site scripting vulnerability was found in the input validation routines.');

INSERT INTO analyzed_code (report_id, code, code_language, starting_line_number)
VALUES (1, 'console.log("Hello, world!");', 'JavaScript', 1);

/* Example data 2 */
INSERT INTO report (user_id) VALUES ('auth0|65c8f6bf6691787817548bf0');

INSERT INTO cwe (cwe_id, cwe_name, cwe_description)
VALUES ('CWE-89', 'Improper Neutralization of Special Elements used in an SQL Command (SQL Injection)', 'The product constructs all or part of an SQL command using externally-influenced input from an upstream component, but it does not neutralize or incorrectly neutralizes special elements that could modify the intended SQL command when it is sent to a downstream component.');

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
