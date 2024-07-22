import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://10.0.2.2:5000/feedback', {
    transports: ['websocket'],
});

const FeedBackScreen: React.FC = () => {
    const [feedback, setFeedback] = useState<string>('');
    const [feedbackType, setFeedbackType] = useState<string>('');
    const [receivedFeedback, setReceivedFeedback] = useState<string>('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
            socket.emit('client_connected', { connected: true });
            ToastAndroid.show('Connected to server', ToastAndroid.LONG);
        });

        socket.on('error', (error) => {
            ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
        });

        socket.on('feedbackReceived', (data) => {
            const parsedData = JSON.parse(data); 
            setReceivedFeedback(parsedData.message); 
        });

        return () => {
            socket.off('connect');
            socket.off('error');
            socket.off('feedbackReceived');
        };
    }, []);

    const handleSubmit = () => {
        if (!feedbackType) {
            Alert.alert('Error', 'Please select feedback type');
            return;
        }
        else{
            Alert.alert('Feedback sumbitted Successfully !')
        }

        const data = {
            feedbackType: feedbackType,
            feedback: feedback,
        };

        socket.emit('submitFeedback', data);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Give Us Your Feedback</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your feedback here..."
                multiline
                value={feedback}
                onChangeText={text => setFeedback(text)}
            />
            <View style={styles.feedbackTypeContainer}>
                <TouchableOpacity
                    style={[styles.feedbackTypeButton, feedbackType === 'complain' ? styles.selectedFeedbackType : null]}
                    onPress={() => setFeedbackType('complain')}>
                    <Text style={styles.feedbackTypeButtonText}>Complain</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.feedbackTypeButton, feedbackType === 'suggestion' ? styles.selectedFeedbackType : null]}
                    onPress={() => setFeedbackType('suggestion')}>
                    <Text style={styles.feedbackTypeButtonText}>Suggestion</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Submit Feedback</Text>
            </TouchableOpacity>

            {receivedFeedback &&
                <View style={styles.receivedFeedbackContainer}>
                    <Text style={styles.receivedFeedbackHeading}>Your Feedback</Text>
                    <Text>{receivedFeedback}</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    feedbackTypeContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    feedbackTypeButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    feedbackTypeButtonText: {
        fontSize: 16,
    },
    selectedFeedbackType: {
        backgroundColor: 'grey',
    },
    submitButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    submitText: {
        color: 'white',
        fontSize: 18,
    },
    receivedFeedbackContainer: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    receivedFeedbackHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default FeedBackScreen;