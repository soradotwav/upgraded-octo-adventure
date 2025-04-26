from flask import Flask

app = Flask(__name__)  # THIS is what Flask is looking for!

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
    