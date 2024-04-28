from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/post', methods=['GET', 'POST'])
def post_message():
    if request.method == 'POST':
        message = request.form['message']
        return render_template_string(f"<div>Message: {message}</div>")
    else:
        return '<form method="post"><input type="text" name="message"><input type="submit" value="Post"></form>'

if __name__ == '__main__':
    app.run()
