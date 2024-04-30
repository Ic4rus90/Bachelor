from flask import Flask, request, redirect

app = Flask(__name__)

@app.route('/search')
def search():
    query = request.args.get('q', '')
    redirect_url = f"/results?query={query}"
    return redirect(redirect_url)

if __name__ == '__main__':
    app.run()
