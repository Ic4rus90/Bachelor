from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    user_input = request.form['comment']
    return render_template_string(f"<h2>Your comment: {user_input}</h2>")

if __name__ == '__main__':
    app.run()
