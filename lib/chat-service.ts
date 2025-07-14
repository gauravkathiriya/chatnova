import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id?: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export class ChatService {
  static async createChat(userId: string, title: string): Promise<string> {
    const chatData = {
      userId,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'chats'), chatData);
    return docRef.id;
  }

  static async getChats(userId: string): Promise<Chat[]> {
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Chat[];
  }

  static async addMessage(chatId: string, message: Message): Promise<void> {
    const chatRef = doc(db, 'chats', chatId);
    const chat = await getDocs(query(collection(db, 'chats'), where('__name__', '==', chatId)));
    
    if (!chat.empty) {
      const chatData = chat.docs[0].data() as Chat;
      const updatedMessages = [...chatData.messages, message];
      
      await updateDoc(chatRef, {
        messages: updatedMessages,
        updatedAt: new Date()
      });
    }
  }

  static async sendMessageToChatGPT(messages: Message[]): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: 1000,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      throw new Error('Failed to get response from ChatGPT');
    }
  }

  static async sendMessage(chatId: string, userId: string, userMessage: string): Promise<string> {
    // Add user message to chat
    const userMsg: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    await this.addMessage(chatId, userMsg);

    // Get all messages for context
    const chat = await getDocs(query(collection(db, 'chats'), where('__name__', '==', chatId)));
    const chatData = chat.docs[0].data() as Chat;
    const allMessages = [...chatData.messages, userMsg];

    // Get response from ChatGPT
    const assistantResponse = await this.sendMessageToChatGPT(allMessages);

    // Add assistant message to chat
    const assistantMsg: Message = {
      role: 'assistant',
      content: assistantResponse,
      timestamp: new Date()
    };

    await this.addMessage(chatId, assistantMsg);

    return assistantResponse;
  }
} 