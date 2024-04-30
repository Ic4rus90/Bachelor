from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/profile')
def profile():
    user_name = request.args.get('user', 'Anonymous')
    return render_template_string(f"<html><body><h1>Welcome back, {user_name}!</h1></body></html>")

if __name__ == '__main__':
    app.run()
