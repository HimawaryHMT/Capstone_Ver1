
import ChatBubble from '@/components/components_doctorAI/chatBubble';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Stack } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp?: string;
    senderName?: string;
}

export default function ChatScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const scrollViewRef = useRef<ScrollView>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello, my name is Dr. Emma. How can I assist you today? Could you please tell me about any health concerns or symptoms you\'re currently experiencing? I support over 140 languages.',
            isUser: false,
            senderName: 'Emma',
            timestamp: '2025-10-06 20:42:40'
        }
    ]);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        if (params.initialQuestion && typeof params.initialQuestion === 'string') {
            setInputText(params.initialQuestion);
        }
    }, [params.initialQuestion]);

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText,
                isUser: true,
            };

            setMessages(prev => [...prev, newMessage]);
            setInputText('');

            // Simulate AI response
            setTimeout(() => {
                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: 'Thank you for sharing that with me. Based on what you\'ve described, I\'d like to ask a few more questions to better understand your situation. When did you first notice these symptoms?',
                    isUser: false,
                    senderName: 'Emma',
                    timestamp: new Date().toLocaleString('sv-SE', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).replace(' ', ' ')
                };
                setMessages(prev => [...prev, aiResponse]);
            }, 1000);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']} >
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ title: "Trò chuyện" }} />

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >

                {/* Messages */}
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map((message) => (
                        <ChatBubble
                            key={message.id}
                            message={message.text}
                            isUser={message.isUser}
                            senderName={message.senderName}
                            timestamp={message.timestamp}
                        />
                    ))}
                </ScrollView>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity style={styles.inputIconButton}>
                            <Text style={styles.inputIcon}>⊞</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.textInput}
                            placeholder="My blood pressure is a bit high, do I have high blood pressure?"
                            placeholderTextColor="#999"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            maxLength={500}
                        />

                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={handleSend}
                            disabled={!inputText.trim()}
                        >
                            <Text style={styles.sendIcon}>➤</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.toolbarContainer}>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Text style={styles.toolbarIcon}>⊞⊞</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Text style={styles.toolbarIcon}>🖼</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Text style={styles.toolbarIcon}>GIF</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Text style={styles.toolbarIcon}>📄</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Text style={styles.toolbarIcon}>⚙️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Text style={styles.toolbarIcon}>🎨</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolbarButton}>
                            <Text style={styles.toolbarIcon}>🎤</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: '#1a1a1a',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        flex: 1,
        marginLeft: 8,
        includeFontPadding: false,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 0,
    },
    creditBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#3F8F75',
        marginRight: 8,
    },
    creditIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    creditText: {
        fontSize: 12,
        color: '#3F8F75',
        fontWeight: '700',
    },
    menuButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 24,
        color: '#1a1a1a',
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messagesContent: {
        padding: 16,
        paddingBottom: 8,
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
        paddingBottom: Platform.OS === 'ios' ? 0 : 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    inputIconButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    inputIcon: {
        fontSize: 22,
        color: '#666',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        maxHeight: 100,
        color: '#1a1a1a',
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3F8F75',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendIcon: {
        fontSize: 18,
        color: '#fff',
    },
    toolbarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
    },
    toolbarButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolbarIcon: {
        fontSize: 20,
        color: '#666',
    },
});