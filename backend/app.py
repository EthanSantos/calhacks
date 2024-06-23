import fitz
import requests
from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './pdf_files'
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

section_names = [
    "Introduction",
    "Scope of Work",
    "Payment Terms",
    "Deliverables",
    "Timeline",
    "Intellectual Property",
    "Termination"
]

API_KEY = '65c95fb3-7f81-4a01-9419-b6f150340e56<__>1PTsFeETU8N2v5f4qmtDZVGS'
API_URL = 'https://chat-api.you.com/smart'

def analyze_section(section_text):
    headers = {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
    }
    payload = {
        'query': section_text,
        'chat_id': '3c90c3cc-0d44-4b50-8888-8dd25736052a'
    }
    response = requests.post(API_URL, json=payload, headers=headers)
    return response.json()

def parse_pdf(pdf_path, section_names):
    document = fitz.open(pdf_path)
    content = ""

    for page_num in range(document.page_count):
        page = document.load_page(page_num)
        text = page.get_text()
        content += text

    sections = {}
    for i in range(len(section_names) - 1):
        start_idx = content.find(section_names[i]) + len(section_names[i])
        end_idx = content.find(section_names[i + 1])
        if start_idx != -1 and end_idx != -1:
            section_content = content[start_idx:end_idx].strip()
            analysis_result = analyze_section(section_content)
            sections[section_names[i]] = {
                'content': section_content,
                'analysis': analysis_result
            }

    start_idx = content.find(section_names[-1]) + len(section_names[-1])
    if start_idx != -1:
        section_content = content[start_idx:].strip()
        analysis_result = analyze_section(section_content)
        sections[section_names[-1]] = {
            'content': section_content,
            'analysis': analysis_result
        }

    return sections

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/parse-text', methods=['POST'])
def parse_text():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        sections = parse_pdf(file_path, section_names)

        # this removes the file after we add it
        os.remove(file_path)

        return jsonify(sections)

    return jsonify({'error': 'Invalid file'}), 400

if __name__ == "__main__":
    app.run(port=8000, debug=True)
