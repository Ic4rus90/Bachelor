import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VulnerabilityCards from './vulnerability-cards';
import CodeBlock from './display-code';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  {
    CWE: 'CWE-79 - Cross Site Scripting',
    info: 'This code constructs an HTML response using unsanitized input from a requests query parameter, which could be exploited for XSS.',
    code: `@app.route('/')
    def hello():
        name = request.args.get('name', 'World')
        return render_template_string('<h1>Hello ' + name + '!</h1>')`
  },
  {
    CWE: 'CWE-89 - SQL Injection',
    info: 'This code constructs a SQL query using unsanitized input from a requests query parameter, which could be exploited for SQL injection.',
    code: `@app.route('/sum/<int:a>/<int:b>')
    def add(a, b):
        result = a + b
        return render_template_string('<h3>Sum: {{result}}</h3>', result=result)`
  }
];

const fullCode = [
  {
  full_code:  `from flask import Flask, request, render_template_string, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    name = request.args.get('name', 'World')
    return render_template_string('<h1>Hello ' + name + '!</h1>')

@app.route('/greet/<username>')
def greet_user(username):
    return render_template_string('<h2>Greetings, {{username}}!</h2>', username=username)

@app.route('/postdata', methods=['POST'])
def handle_data():
    data = request.json
    return jsonify({'message': 'Data received', 'yourData': data})

@app.route('/about')
def about():
    return '<h3>About Us</h3><p>This is a simple Flask application.</p>'

@app.route('/sum/<int:a>/<int:b>')
def add(a, b):
    result = a + b
    return render_template_string('<h3>Sum: {{result}}</h3>', result=result)

if __name__ == '__main__':
    app.run(debug=True)
`
  }
]

function DashboardTabs() {
  return (
    <Tabs
      defaultActiveKey="vulnerabilities"
      id="Report-tabs"
      className="mb-3"
      style={{ color: '#FFFFFF' }}
    >
      <Tab eventKey="vulnerabilities" title="Vulnerabilities ">
        <VulnerabilityCards data={data} />
      </Tab>
      <Tab eventKey="code" title="Code">
        <CodeBlock codeString={fullCode[0].full_code} />
      </Tab>
    </Tabs>
  );
}




export default DashboardTabs;