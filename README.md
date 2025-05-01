# 🧠 Understanding Language Models: How They Work
Language models are smart brains in a computer world that are trained on multiple data. Those models can also predict the future by analyzing the past data. Language models are built using transformers, which help this model to identify the relation between words. 

However, Language models can't understand human language directly, so they need multiple steps to understand, i.e., 
1. tokenization.
2. Word embedding
3. Numerical embedding/positional encoding
4. Transformer architecture/neural network
   4.1. encoder
   4.2. decoder

## 🧩 1. Tokenization
Tokens are words of a sentence. This step is divided into two categories, i.e., token and subtoken, where the token represents a complete word, but the subtokens represent tokens of tokens. 
- Example:
- Sentence: "My name is Trishna."
- In this sentence, if LLM divides this sentence into tokens, then 'my' will be token1, 'name' will be token2, 'is' will be token3, and 'Trishna' will be token4. So, in total, this sentence contains 4 tokens.
- Tokens: ["My", "name", "is", "Trishna"] → 4 tokens.

### I think now you are wondering if every word is a token, then why is the concept of sub-tokens introduced?
There are multiple conditions to use the subtoken concept instead of the token.
- If the word is too long, like Vietnamese, the model will divide this token into subtokens, i.e., viet and namese.
- If the word does contain or has a similar meaning in the pre-trained data, then to understand the meaning of the new word, the model used the concept of subtokens.
- Same as 2 when the model tries to understand the meaning of new data that has not already been defined.

### Additional Tokenization Steps:
- Converting each token into lowercase.
- Removing stop words from the token, like he, she, is, am, are, and ?." Basically, stop words are not always the same. Stop words are those words that don't contain the main meaning of the sentence but are used to make the sentence transition. In this step, words like playing or any word that indicates past, present, or future are converted into the main word, like play, which only holds the meaning.
- If the user uses any new words, then the model will understand the meaning of the new words and convert that word into pretrained words, which is also called lemmatization, and provide output.

![_- visual selection (1)](https://github.com/trishnabhattarai/how-does-language-model-work/blob/main/_-%20visual%20selection%20(1).png)

## 🔢 2. Word Embedding
In this step, words are converted into vectors by using some mathematical concepts like statistics, which contain mean, median, mode, and standard deviation; linear algebra; probability; calculus; and optimized methods. The vector number can be ranged from 0 to 1.
- Example:
  - If I use two words like play and playing to train my model whose vector numbers are 0.33 and 0.35, respectively, and the user uses a new word called played, then the model will calculate the average vector by (0.33+ 0.35)/2 = 0.34, so the vector number for played will be 0.34.
  - Hence, the vector number of played is nearer to play and playing, so the model understands they have the same or similar meaning.
  - Now, according to the vector number of the new word, they are replaced by the pretrained words whose vector numbers are similar to the vector numbers of the new words. 
![_- visual selection (2)](https://github.com/trishnabhattarai/how-does-language-model-work/blob/main/_-%20visual%20selection%20(2).png)

## 📊 3. Numerical Embedding & Positional Encoding
-  In this step, a similarity score is provided to the words according to the vector number, and then, according to the similarity score, tokens are grouped to understand the meaning between the tokens.
-  After that, positional encoding is done on tokens where every token is again divided according to their position in a sentence.
![ss.png](https://github.com/trishnabhattarai/how-does-language-model-work/blob/main/ss.png)

## 🧠 4. Transformer Architecture (Neural Network)
- This network contains 6 encoders and 6 decoders, where encoders understand the input of the user and decoders generate the output.
- In this architecture, each word or vector has a query, key, and value, where the word with a higher query indicates that the word is getting attention from other words, the word with a higher key indicates that the word is giving higher attention to other words, and the word with a higher value indicates that the word is the main word that holds the main meaning of the sentence. 
- Again, the score value is provided to the model according to the query and key value. 
- The higher the score, the more relatable the words are. 
- Self-attention and the feed-forward layer are present inside the encoder and decoder. 
- This layer helps the AI model to understand the meaning and relation between words, where the self-attention layer helps the model to understand the meaning of the sentence, but the - feed-forward layer goes deep down and tries to understand the meaning of each token in a sentence. 
- This step is repeated many times, which helps the model to understand the meaning more deeply. 

### Now I think you are wondering why this layer has 6 encoders and 6 decoders?
- Because 1 encoder can encode 1 sentence at a time, but if we use multiple encoders in parallel, then the encoder can perform its task in parallel, and the same for the decoder too. 
- This process is used to understand the input of the user and remember the same reserve process, or reverse step, is used to generate and understand the tokens for output.

![_- visual selection (4)](https://github.com/trishnabhattarai/how-does-language-model-work/blob/main/_-%20visual%20selection%20(4).png)

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
# pretrain_data.keys() accessed data from pretrain_data and compared the user data to pretrain_data.
# word_tokenize will convert user input into tokens and compare user input to each word in the pretrain_data dictionary.
# set() will remove duplicate words from user input and the pretrain_data dictionary.
#question will search related tokens in the key of the pretrain_data dictionary.
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
