CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  code VARCHAR(5000) NOT NULL
);


CREATE TABLE vulnerabilities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  report_id INTEGER NOT NULL,
  vulnerability VARCHAR(255) NOT NULL,
  vulnerable_code VARCHAR(500) NOT NULL,
  FOREIGN KEY (report_id) REFERENCES reports(id)
);


INSERT INTO reports (user_id, code) VALUES ('auth0|65c23300ee05ad4b27e3fb1a', 'const x = 1; const y = 2; const z = x + y;');
INSERT INTO reports (user_id, code) VALUES ('auth0|65c23300ee05ad4b27e3fb1a', 'const x = 1; const y = 2; const z = x - y;');
INSERT INTO reports (user_id, code) VALUES (2, 'const x = 1; const y = 2; const z = x * y;');
INSERT INTO reports (user_id, code) VALUES (3, 'const x = 1; const y = 2; const z = x / y;');

INSERT INTO vulnerabilities (user_id, report_id, vulnerability, vulnerable_code) VALUES (1, 1, 'Addition', 'const z = x + y;');
INSERT INTO vulnerabilities (user_id, report_id, vulnerability, vulnerable_code) VALUES (2, 2, 'Subtraction', 'const z = x - y;'),
(2, 2, 'Overflow', 'for (let i = 0; i < MAX_INT; i++) {}'),
(2, 2, 'Division by Zero', 'const result = x / 0;');
INSERT INTO vulnerabilities (user_id, report_id, vulnerability, vulnerable_code) VALUES (3, 3, 'Multiplication', 'const z = x * y;');
INSERT INTO vulnerabilities (user_id, report_id, vulnerability, vulnerable_code) VALUES (4, 4, 'Division', 'const z = x / y;');
