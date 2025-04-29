language model are smart brain in a computer world which are trained on multiple data. those model can also predit the future by analizing the past data. language model are build using transformer which help this model to identify the relation between word. language model can't understand human language directly so it need multiple step to understand i.e.
1. tokenization
2. word embedding
3. numerical embedding/ positional encoding 
4. transformer architecture/ neutral network
   1. encoder
   2. decorder
1. tokenization:
   token are words of a sentence. this step is divided into two category i.e. token and subtoken where token represnet complete word but subtoken represent token of token like example lets take a sentence i.e. my name is trishna. in this sentence, if LLM divide this sentence into tokens then my will be token1 name will be token2 is will be token3 and trishna will be token4. so total this sentence contain 4 token. i think now u are wondering if every word is a token then why the concept of sub token is introduced? there are multiple condition to use subtoken concept instead of token
1. if the word is too long like Vietnamese model will divide this token into sub token i.e. viet and namese.
2. if the word does contain or has similar meaning in a pretrain data then to understand the meaning of the new word model used to use the concept of subtokens.
3. same as 2 when model tries to understand the meaning of new data that has not been already defined.
tokenization also include many steps like converting each token into lower case, removing stop words from the token like he, she, is, am, are,?,". basically stop words are not always same stop words are those words which doesn't contain the main meaning of the sentence but are used to make the sentence transition. in this step, words like playing or any word that indicate past, present or future are converted into main word like play which only holds the meaning. if user use any new words then model will understand the meaning of the new words and convert that word into pretrain words which is also called lamitization and provide output.
ex:
pretrain_data_tokens = {question: set(word_tokenize(question.lower())) for question in pretrain_data.keys()}
stop_words = set(stopwords.words('english'))
pretrain_data_tokens = {k: v - stop_words for k, v in pretrain_data_tokens.items()}
# pretrain_data.keys() accessed data from pretrain_data and compare the user data to pretrain_data
#word_tokenize will convert user input into tokens and compare user input each words to pretrain_data dictionary.
#set() will remove duplicate words from user input and pretrain_data dictionary.
#question will search related tokens in key of pretrain_data dictionary.
2. word embedding:
in this step, words are converted into vector by using some mathematical concepts like statistics which contain mean, median, mode and standard deviation, linear algebra, probability, calculus and optimized methods. vector number can be ranched upto 0 to 1. let's take an example, if i use two word like play and playing to train my model whose vector number are 0.33 and 0.35 repectively and user uses new word called played then model will calculate average vector by (0.33+ 0.35)/2 = 0.34 so the vector number for played will be 0.34. hence, vector number of played is nearer to play and playing so the model understand they have same or similar meaning. now according to the vector number of new word they are replaced by the pretrain words whose vector number are similar to the vector number of new words. 
3. numberical embedding:
in this step, similarity score is provided to the words according to the vector number then according to similarity score, tokens are grouped to understand the meaning between the tokens. after that positional encoding is done on tokens where every tokens are again divided accorrding to their position in a sentence.
4. transformer architecture/ neutral network:
this network contain 6 encoder and 6 decoder which encoder understand the input of the user and decorder generate the output. in this architecture, each words has query,key and value where the word with higher query indicate that the word is getting attention from other wprd, the word with higher key indicate that the word is giving higher attention to other word and the word with higher value indicate that the word is the main words that hold the main meaning of the sentence. again score value is provided to the model according to the query and key value. the higher the score is more relatable the words are. Self Attention layer helps AI model to understand the meaning and relation between words.
