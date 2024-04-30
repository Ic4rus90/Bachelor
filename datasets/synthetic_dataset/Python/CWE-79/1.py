from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
    user_input = request.args.get('name', 'Guest')
    return f"Hello, {user_input}!"

if __name__ == '__main__':
    app.run()
