"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Leaf,
  Languages,
  Loader2,
  Trash2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "en" | "hi" | "mr";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const languages: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
];

const quickQuestions: Record<Language, string[]> = {
  en: [
    "Which crop should I grow?",
    "Why are my leaves turning yellow?",
    "How much fertilizer should I use?",
    "When should I irrigate?",
    "What is the market price of wheat?",
  ],
  hi: [
    "मुझे कौन सी फसल उगानी चाहिए?",
    "मेरे पत्ते पीले क्यों हो रहे हैं?",
    "मुझे कितना उर्वरक इस्तेमाल करना चाहिए?",
    "मुझे सिंचाई कब करनी चाहिए?",
    "गेहूं का बाजार भाव क्या है?",
  ],
  mr: [
    "मी कोणते पीक घालावे?",
    "माझी पाने पिवळी का होत आहेत?",
    "मी किती खत वापरावे?",
    "मी सिंचन कधी करावे?",
    "गहूचा बाजारभाव काय आहे?",
  ],
};

const mockResponses: Record<Language, Record<string, string>> = {
  en: {
    "which crop": "Based on your location in Maharashtra and the current Rabi season, I recommend Wheat, Chickpea (Chana), or Mustard. Wheat is currently showing good market prices and has moderate water requirements. Would you like detailed recommendations for any specific crop?",
    "yellow leaves": "Yellowing leaves can be caused by several factors: 1) Nitrogen deficiency - apply urea fertilizer, 2) Overwatering - reduce irrigation frequency, 3) Pest attack - check for aphids or mites, 4) Disease - look for spots or fungal growth. Can you share a photo for better diagnosis?",
    "fertilizer": "Fertilizer quantity depends on your crop and soil type. For wheat on medium soil: apply 120kg N, 60kg P2O5, and 40kg K2O per hectare. Split nitrogen into 3 doses - basal, tillering, and flowering stages. I can calculate precise quantities if you share your farm details.",
    "irrigate": "Best irrigation times are early morning (5-7 AM) or evening (5-7 PM) to minimize evaporation. For wheat, irrigate at crown root initiation, tillering, flowering, and grain filling stages. Current weather shows dry conditions - consider irrigating within 2-3 days.",
    "market price": "Today's wheat price in Nagpur mandi is ₹2,425/quintal, up 2.5% from yesterday. Rice is at ₹3,850/quintal. Cotton prices have slightly decreased to ₹6,620/quintal. Would you like prices for specific markets or crops?",
  },
  hi: {
    "फसल": "महाराष्ट्र में आपके स्थान और वर्तमान रबी मौसम के आधार पर, मैं गेहूं, चना या सरसों की सिफारिश करता हूं। गेहूं में वर्तमान में अच्छे बाजार भाव हैं और इसकी पानी की आवश्यकता मध्यम है। क्या आप किसी विशिष्ट फसल के लिए विस्तृत सिफारिशें चाहेंगे?",
    "पत्ते": "पत्तियों का पीला पड़ना कई कारणों से हो सकता है: 1) नाइट्रोजन की कमी - यूरिया खात डालें, 2) अधिक पानी - सिंचाई की मात्रा कम करें, 3) कीट का हमला - एफिड्स या माइट्स के लिए जांचें, 4) रोग - धब्बे या फफूंद की जांच करें।",
    "उर्वरक": "उर्वरक की मात्रा आपकी फसल और मिट्टी के प्रकार पर निर्भर करती है। मध्यम मिट्टी पर गेहूं के लिए: प्रति हेक्टेयर 120 किलोग्राम N, 60 किलोग्राम P2O5 और 40 किलोग्राम K2O डालें।",
    "सिंचाई": "सिंचाई का सबसे अच्छा समय सुबह (5-7 बजे) या शाम (5-7 बजे) है ताकि वाष्पीकरण कम हो। गेहूं के लिए, मुकुट मूल आरंभ, टिलरिंग, फूलने और दाना भरने की अवस्था में सिंचाई करें।",
    "बाजार": "आज नागपुर मंडी में गेहूं का भाव ₹2,425/क्विंटल है, जो कल से 2.5% अधिक है। चावल ₹3,850/क्विंटल पर है। कपास के भाव थोड़ा घटकर ₹6,620/क्विंटल हो गए हैं।",
  },
  mr: {
    "पीक": "महाराष्ट्रातील तुमच्या स्थानाच्या आधारे आणि वर्तमान रबी हंगामाच्या विचारात घेता, मी गहू, हरभरा किंवा मोहरीची शिफारस करतो. गहूला सध्या चांगले बाजारभाव आहेत आणि त्याच्या पाणी गरजा मध्यम आहेत.",
    "पाने": "पानांचा पिवळसरपणा अनेक कारणांमुळे होऊ शकतो: 1) नायट्रोजनची कमतरता - युरिया खत टाका, 2) जास्त पाणी - सिंचन कमी करा, 3) कीड हल्ला - अॅफिड्स किंवा माइट्ससाठी तपासा, 4) रोग - डाग किंवा बुरशीसाठी तपासा.",
    "खत": "खताची मात्रा तुमच्या पिकावर आणि मातीच्या प्रकारावर अवलंबून असते. मध्यम मातीसाठी गहूसाठी: प्रति हेक्टर 120 किलो N, 60 किलो P2O5 आणि 40 किलो K2O टाका.",
    "सिंचन": "सिंचनाची सर्वोत्तम वेळ सकाळी (5-7 वाजता) किंवा संध्याकाळी (5-7 वाजता) आहे जेणेकरून बाष्पीभवन कमी होईल. गहूसाठी, क्राउन रूट इनिशिएशन, टिलरिंग, फ्लावरिंग आणि ग्रेन फिलिंग स्टेजमध्ये सिंचन करा.",
    "बाजारभाव": "आज नागपूर मंडईत गहूचा भाव ₹2,425/क्विंटल आहे, जो कालपेक्षा 2.5% जास्त आहे. तांदूळ ₹3,850/क्विंटलवर आहे. कापसाचे दर थोडे घसरून ₹6,620/क्विंटल झाले आहेत.",
  },
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI farming assistant. I can help you with crop recommendations, disease diagnosis, fertilizer calculations, and more. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerInput = input.toLowerCase();
    let responseContent = "I'm sorry, I don't have specific information about that. Could you please rephrase your question or ask about crop recommendations, disease detection, fertilizer usage, irrigation, or market prices?";

    // Simple keyword matching for demo
    const responses = mockResponses[language];
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        responseContent = value;
        break;
      }
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI farming assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate voice input
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput(quickQuestions[language][0]);
      }, 2000);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background pt-16 md:ml-64 md:pt-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold">AI Farming Assistant</h1>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="rounded-lg border bg-background px-3 py-1.5 text-sm focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.native}
              </option>
            ))}
          </select>
          <button
            onClick={clearChat}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "assistant" ? "bg-primary" : "bg-muted"
                )}
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/70"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      <div className="border-t bg-card px-4 py-3">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs text-muted-foreground">Quick questions:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickQuestions[language].map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="whitespace-nowrap rounded-full bg-muted px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted/80"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-card p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <button
            onClick={toggleRecording}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
              isRecording
                ? "animate-pulse bg-red-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {isRecording ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              language === "en"
                ? "Ask anything about farming..."
                : language === "hi"
                ? "खेती के बारे में कुछ भी पूछें..."
                : "शेतीबद्दल काहीही विचारा..."
            }
            className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
