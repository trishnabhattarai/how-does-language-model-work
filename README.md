# 🧠 Understanding Language Models: How They Work
Language models are like the smart brains of the computer world. These models are trained on large datasets and can even predict the future by analyzing past data. At the core of most modern language models lies a powerful architecture called the Transformer, which helps the model understand relationships between words.

However, language models do not understand human language directly. They need to process it through several steps to grasp the meaning of sentences. Here's a breakdown of how this works:

## 🧩 1. Tokenization
- Tokenization is the first step in processing language. It involves breaking a sentence down into smaller units called tokens or subtokens.
- Token: A complete word (e.g., “play”).
- Subtoken: A piece of a longer or unfamiliar word (e.g., “viet” and “namese” from “Vietnamese”).
- Example:
- Sentence: "My name is Trishna."
- Tokens: ["My", "name", "is", "Trishna"] → 4 tokens.

### Why Use Subtokens?
- To split long or complex words.
- To interpret words that aren't in the pre-trained dataset.
- To understand newly encountered terms.

### Additional Tokenization Steps:
- Convert to lowercase.
- Remove stop words (e.g., “is”, “am”, “are”, punctuation, etc.).
- Apply lemmatization to reduce words to their base form (e.g., “playing”, “played” → “play”).

### This code:
- Tokenizes and cleans input.
- Removes duplicates using set().
- Compares user input against pre-trained data.


## 🔢 2. Word Embedding
In this step, words are converted into vectors (numerical representations) using statistical and mathematical concepts like:
- Linear Algebra
- Probability
- Calculus
- Optimization Techniques
- Example:
  - If the vectors for “play” and “playing” are 0.33 and 0.35, a new word like “played” can be given an average vector:
(0.33 + 0.35) / 2 = 0.34.
  - This helps the model recognize “played” as similar to “play” and “playing”.

## 📊 3. Numerical Embedding & Positional Encoding
- After embedding, a similarity score is calculated to group tokens by related meaning. Each token is also assigned a position in the sentence to preserve the order.
- Helps the model differentiate between:
- "Dog bites man" vs. "Man bites dog"

## 🧠 4. Transformer Architecture (Neural Network)
- The Transformer is the heart of modern language models. It typically includes:
- 6 Encoders: Understand and process the input.
- 6 Decoders: Generate meaningful output.
- Each token is assigned:
  - Query (Q): Measures how much attention it seeks.
  - Key (K): Measures how much attention it gives.
  - Value (V): Represents the actual information content.
- Attention Mechanism:
- If Query × Key = High Score → Strong relation between words.
- Enables model to focus on relevant parts of the sentence.

### Internal Components:
- Self-Attention Layer: Understands the meaning of the sentence.
- Feedforward Layer: Digs deeper into the meaning of each word.
- These layers are repeated multiple times, allowing the model to understand the input more thoroughly.

### Why 6 Encoders & Decoders?
- Using multiple encoders and decoders allows for parallel processing, improving speed and performance.
- 🔁 End-to-End Flow
  - User Input → Tokenization
  - Token → Word Embedding
  - Embedding → Positional Encoding
  - Transformer (Encoders + Decoders) → Output
  - Reverse process is applied to generate the response

This is how modern Language Models, such as ChatGPT, BERT, and GPT, convert human language into something they can process, understand, and respond to intelligently.

# 🧾 Code Explanation
## 🔧 Flask App Initialization
```bash
from flask import Flask, request, jsonify
app = Flask(__name__)
```
- Flask is used to create the API.
- __name__ tells Flask where the application is located.

## 📚 NLTK Imports and Downloads
```bash
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.metrics import jaccard_distance
import nltk

nltk.download('punkt')
nltk.download('stopwords')
```
- punkt is needed for breaking sentences into words.
- stopwords are filtered out to improve accuracy.

## 📋 Pretrained Data
```bash
pretrain_data = { 
    "what is your 12th standard gpa": "It's 3.37 GPA",
    "what is your name": "My name is FactBot."
}
```
- This is the dictionary of pre-defined questions and answers.

## ✂️ Tokenization & Stopword Removal
```bash
pretrain_data_tokens = {question: set(word_tokenize(question.lower())) for question in pretrain_data.keys()}
stop_words = set(stopwords.words('english'))
pretrain_data_tokens = {k: v - stop_words for k, v in pretrain_data_tokens.items()}
```
- Tokenizes all pre-defined questions.
- Converts to lowercase and removes common stopwords.
- Uses set() to eliminate duplicate tokens.

## 🏠 Home Route
```bash
@app.route('/')
def home():
    return app.send_static_file('index.html')
```
- Serves the frontend HTML page when accessing the root URL.

## 🤔 Question Matching Endpoint
```bash
@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    user_data = data['question'].lower()
    user_data_tokens = set(word_tokenize(user_data)) - stop_words
    
    min_distance = 1
    best_match = None
    
    for question, tokens in pretrain_data_tokens.items():
        distance = jaccard_distance(user_data_tokens, tokens)
        if distance < min_distance:
            min_distance = distance
            best_match = question
    
    if best_match:
        return jsonify({'answer': pretrain_data[best_match]})
    else:
        return jsonify({'answer': "No suitable match found."})
```
- Accepts a POST request with a user’s question.
- Tokenizes and cleans it, then calculates similarity.
- Returns the best-matched answer using Jaccard Distance.

## 🧪 Run the App
```bash
if __name__ == '__main__':
    app.run(debug=True)
```
- Starts the Flask development server in debug mode.

### 🚀 Project Vision
This mini NLP chatbot showcases how simple logic and token matching can power a functional question-answering bot. It can be extended with a larger dataset, more NLP techniques, or even deep learning models in the future.
