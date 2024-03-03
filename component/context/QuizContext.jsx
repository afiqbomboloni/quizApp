import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const [isLoading2, setIsLoading2] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [userToken, setUserToken] = useState(null);
    const [userName, setUserName] = useState(null);
    // console.log(userToken)
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const name = await AsyncStorage.getItem('userName');
            setUserToken(token);
            // console.log(token);
            setUserName(name);
        } catch (error) {
            console.log(error);
        }
    }
    
    const getQuiz = () => {
        try {
            fetch('http://localhost:8080/v1/quizzes',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setQuiz(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert(
                'Error',
                'Network request failed. Please check your internet connection.',
                );
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getQuiz();
        getToken();
    }, []);
    
    return (
        <QuizContext.Provider value={{isLoading2, quiz}}>
        {children}
        </QuizContext.Provider>
    );
}
