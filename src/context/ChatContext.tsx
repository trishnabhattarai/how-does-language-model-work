import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Synonym mappings for better question matching
const synonymMap: { [key: string]: string } = {
  'provide': 'offer',
  'gives': 'offer',
  'giving': 'offer',
  'provided': 'offer',
  'delivers': 'offer',
  'delivering': 'offer',
  'do': 'offer',
  'does': 'offer',
  'doing': 'offer',
  'tell': 'what',
  'show': 'what',
  'list': 'what',
  'capabilities': 'skills',
  'abilities': 'skills',
  'expertise': 'skills',
  'talented': 'skills',
  'good': 'skills',
  'specialties': 'skills',
  'study': 'education',
  'studied': 'education',
  'degree': 'education',
  'qualification': 'education',
  'graduate': 'education',
  'graduated': 'education',
  'experience': 'work',
  'job': 'work',
  'position': 'work',
  'role': 'work',
  'career': 'work',
  'contact': 'email',
  'reach': 'contact',
  'message': 'contact',
  'phone': 'contact',
  'number': 'phone',
  'call': 'phone',
  'live': 'located',
  'lives': 'located',
  'living': 'located',
'stay': 'located',
  'based': 'located',
  'from': 'located',
  'service': 'services',
  'help': 'services',
  'assist': 'services',
  'portfolio': 'projects',
  'work': 'projects', // <-- Keep only one definition
  'created': 'projects',
  'made': 'projects',
  'built': 'projects',
  'developed': 'projects',
  'certified': 'certifications',
  'certificate': 'certifications',
  'credentials': 'certifications',
  'Hello': 'Hi',
  'Whats up': 'Hi',
  'Are you good?': 'Hi',
};

// Enhanced tokenization with synonym replacement
const tokenize = (text: string): string[] => {
  const tokens = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .split(/\s+/);
  
  return tokens.map(token => {
    const synonym = synonymMap[token];
    if (synonym) return synonym;
    
    if (token.endsWith('s') && token.length > 3) {
      const singular = token.slice(0, -1);
      if (synonymMap[singular]) return synonymMap[singular];
      return singular;
    }
    
    return token;
  });
};

const removeStopWords = (tokens: string[]): string[] => {
  const stopWords = new Set([
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 
    'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 
    'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 
    'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 
    'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 
    'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 
    'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 
    'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 
    'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 
    'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 
    'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 
    'just', 'should', 'now', 'extra', 'additional', 'also', 'else', 'like', 'want', 'know',
    'please', 'could', 'would'
  ]);
  
  return tokens.filter(token => !stopWords.has(token));
};

const calculateSimilarity = (set1: Set<string>, set2: Set<string>): number => {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  const jaccardSim = intersection.size / union.size;
  
  const importantWords = new Set([
    'email', 'phone', 'location', 'skills', 'education', 'services', 
    'projects', 'certifications', 'work', 'experience', 
    'technologies', 'companies', 'projects', 'latest', 'portfolio', 'current', 'expectation', 'expected salary','Hi'
  ]);

  const importantMatches = [...intersection].filter(word => importantWords.has(word)).length;
  const importantBonus = importantMatches * 0.1; 
  
  return Math.min(1, jaccardSim + importantBonus);
};

const trainingData = [
  {
    question: "what is sarah's email",
    answer: "Sarah's email is sarah@example.com"
  },
  {
    question: "what is sarah's phone number",
    answer: "Sarah's phone number is +1 (555) 123-4567"
  },
  {
    question: "where is sarah located",
    answer: "Sarah is located in San Francisco, CA"
  },
  {
    question: "what does sarah do",
    answer: "Sarah is a UI/UX Designer with over 5 years of experience in creating digital experiences"
  },
  {
    question: "what is sarah's education",
    answer: "Sarah holds a Master's in User Experience Design from Stanford University and a Bachelor's in Digital Media Design from UC Berkeley"
  },
  {
    question: "what are sarah's skills",
    answer: "Sarah's key skills include UI Design, UX Design, Figma, Adobe XD, HTML/CSS, Prototyping, and project management"
  },
  {
    question: "what services does sarah offer",
    answer: "Sarah offers UI Design, UX Design, User Research, and Prototyping services"
  },
  {
    question: "what projects has sarah worked on",
    answer: "Sarah's portfolio includes the HealthTrack App, an E-commerce Platform redesign, and a Finance Dashboard"
  },
  {
    question: "what certifications does sarah have",
    answer: "Sarah holds a Google UX Design Professional Certificate and Advanced UI/UX Design certification from IDF"
  },
  {
    question: "What companies have you worked with?",
    answer: "In my portfolio, I showcase personal and freelance projects rather than working at specific companies. However, the chatbot assistant helps guide users through all the work examples, simulating a professional experience."
  },
  {
    question: "Can you tell me about your latest project?",
    answer: "My latest project is creating a portfolio website integrated with a chatbot assistant. The chatbot interacts with users, answering their questions about my skills, projects, and experience, making the portfolio experience more interactive and modern."
  },
  {
    question: "What technologies do you know?",
    answer: "I am familiar with web development technologies like HTML, CSS, JavaScript, and backend tools like Node.js. I also explore AI integrations, chatbot development, and user experience (UX) best practices for creating modern, interactive websites."
  },
  {
    question: "What is Sarah's expected salary?",
    answer: "Sarah is open to offers depending on the role and responsibilities, but her expected salary range is between $70,000 to $85,000 annually."
  },
  {
    question: "Is Sarah looking for any specific conditions in a job environment or expectation?",
    answer: "Yes, Sarah values a collaborative work culture, opportunities for growth, and a healthy work-life balance."
  },
  {
    question: "Hi",
    answer: "Hello, How can i help you today?"
  }
];

interface ChatContextType {
  messages: { text: string; isBot: boolean }[];
  sendMessage: (message: string) => void;
  clearMessages: () => void;
  isAiTyping: boolean;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm Sarah's assistant. How can I help you today?", isBot: true }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const processedTrainingData = useMemo(() => {
    return trainingData.map(item => ({
      ...item,
      tokens: new Set(removeStopWords(tokenize(item.question)))
    }));
  }, []);

  const findBestMatch = (query: string): string => {
    const queryTokens = new Set(removeStopWords(tokenize(query)));
    let bestMatch = { similarity: 0, answer: "" };

    processedTrainingData.forEach(item => {
      const similarity = calculateSimilarity(queryTokens, item.tokens);
      if (similarity > bestMatch.similarity) {
        bestMatch = { similarity, answer: item.answer };
      }
    });

    return bestMatch.similarity > 0.4 ? bestMatch.answer : "Sorry, I don't have an answer to that question.";
  };

  const sendMessage = async (userMessage: string) => {
    if (userMessage.trim() === "") return;

    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsAiTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const botResponse = findBestMatch(userMessage);
    setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    setIsAiTyping(false);
  };

  const clearMessages = () => {
    setMessages([{ text: "Hi! I'm Sarah's assistant. How can I help you today?", isBot: true }]);
  };

  const contextValue = {
    messages,
    sendMessage,
    clearMessages,
    isAiTyping
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};