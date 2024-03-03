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


INSERT INTO report (user_id) VALUES ('auth0|65c8f6bf6691787817548bf0');


INSERT INTO cwe (cwe_id, cwe_name, cwe_description)
VALUES ('CWE-79', 'Improper Neutralization of Input During Web Page Generation (Cross-site Scripting)', 'The software does not neutralize or incorrectly neutralizes user-controllable input before it is placed in output that is used as a web page that is served to other users.');

INSERT INTO vulnerability (report_id, cwe_id, code_extract, vuln_summary)
VALUES (1, 'CWE-79', '<script>alert("XSS")</script>', 'A cross-site scripting vulnerability was found in the input validation routines.');

INSERT INTO analyzed_code (report_id, code, code_language, starting_line_number)
VALUES (1, 'console.log("Hello, world!");', 'JavaScript', 1);