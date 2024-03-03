import {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Animated, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { AuthContext } from './context/AuthContext';

export default function Question({route, navigation}) {
  const {item} = route.params;
  const [indexPage, setIndexPage] = useState(0);
  const [jawaban, setJawaban] = useState([]);
  const {idUser, userToken} = useContext(AuthContext);
  console.log(idUser);
  const [jawabanIndex, setJawabanIndex] = useState(0);
  const [jawabanArray, setJawabanArray] = useState([]);

const [jawabanClicked, setJawabanClicked] = useState(Array(item.questions[indexPage].opsi_jawaban.split('~&').length).fill(false));


const refreshQuiz = () => {
  setIndexPage(0);
  setJawabanClicked(Array(item.questions[indexPage].opsi_jawaban.split('~&').length).fill(false));
  setJawabanArray([]);
}

  const ArrayIdPertanyaan = () => {
    const arrayIdPertanyaan = []
    for (let i = 0; i < item.questions.length; i++) {
      arrayIdPertanyaan.push(item.questions[i].id)
    }
    return arrayIdPertanyaan
  }


  const splitJawaban = () => {
   
    const splitted = item.questions[indexPage].opsi_jawaban.split('~&');
    setJawaban(splitted);
  };

  const handleNextButton = () => {
    if (jawabanClicked.includes(true)) {
      setJawabanArray((prevArray) => [...prevArray, jawabanIndex+1]);
      if (indexPage < item.questions.length - 1) {
        setIndexPage(indexPage + 1);
        setJawabanClicked(Array(item.questions[indexPage + 1].opsi_jawaban.split('~&').length).fill(false));
        
      
      } else {
        console.log('end of question');
      }
      
    } else {
      Alert.alert('Pilih jawaban terlebih dahulu');
    }
  };
  
  const isJawabanClicked = (index) => {
    
    setJawabanClicked((prevClicked) => {
      const newClicked = prevClicked.map((value, i) => (i === index ? !value : false));
      setJawabanIndex(index);
      return newClicked;
    });
  }
const submitData = async (jawabanIndex) => {
  const newArray = [...jawabanArray, jawabanIndex];
  try {
    for (let i = 0; i < ArrayIdPertanyaan().length; i++) {
    //   console.log('i:', i, 'id_pertanyaan:', ArrayIdPertanyaan()[i], 'jawaban_peserta:', newArray[i]);
        const response = await fetch('http://localhost:8080/v1/answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
            id_user: idUser,
            id_quiz: item.id,
            id_pertanyaan: ArrayIdPertanyaan()[i],
            jawaban_peserta: newArray[i],
          }),
        });
        const data = await response.json();
        
        console.log(data);
    
      
    }
    Alert.alert(
      'Ok', 
      'Harap tunggu admin menilai', 
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ],
    );
    
    
    
} catch (error) {
  console.log(error);
}
}
const handleSubmit = (jawabanIndex) => {
  console.log(jawabanIndex);
  setJawabanArray((prevArray) => [...prevArray, jawabanIndex]);
 
  Alert.alert('Submit', 'Apakah anda yakin?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => submitData(jawabanIndex),
    },
  ]);

}

// console.log(jawabanArray);
  useEffect(() => {
    splitJawaban();
    ArrayIdPertanyaan();
   
   
  }, [indexPage]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop: 20}}>{item.judul}</Text>
      <Text>{indexPage+1}/{item.total_soal}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.textSoal}>{item.questions[indexPage].pertanyaan}</Text>
      </View>
      <View>
        {jawaban.map((item, index) => {
          return (
            <View key={index}>
              <Pressable
                style={
                  jawabanClicked[index]? styles.jawabanClicked : styles.jawaban
                }
                onPress={() => isJawabanClicked(index)}>
                <Text
                  style={
                    jawabanClicked[index]
                      ? styles.textJawabanClicked
                      : styles.textJawaban
                  }>
                  {item}
                </Text>
              </Pressable>
            </View>
          );
        })}
        <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}>
        
        {indexPage === ArrayIdPertanyaan().length -1 ? <Pressable style={styles.nextButton} onPress={() => handleSubmit(jawabanIndex+1)}>
          <Text style={styles.nextButtonText}>Submit</Text>
        </Pressable> : <Pressable style={styles.nextButton} onPress={() => handleNextButton()}>
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>}
        
        <Pressable style={styles.refreshButton} onPress={() => refreshQuiz()}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </Pressable>
      </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    minWidth: '30%',
    marginVertical: 10,
    minHeight: '10%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5d76cb',
    padding: 10,
  },
  refreshButtonText: {
    color: '#5d76cb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButton: {
    minWidth: '30%',
    marginVertical: 10,
    minHeight: '10%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderColor: '#5d76cb',
    borderWidth: 1,
    padding: 10,
  },
  jawaban: {
    minWidth: '90%',
    marginVertical: 10,
    minHeight: '10%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderColor: '#5d76cb',
    borderWidth: 1,
    padding: 10,
  },
  jawabanClicked: {
    minWidth: '90%',
    marginVertical: 10,
    minHeight: '10%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5d76cb',
    borderColor: '#5d76cb',
    borderWidth: 1,
    padding: 10,
  },
  textJawaban: {
    color: 'black',
    fontSize: 16,
  },
  textJawabanClicked: {
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 16,
  },
  questionContainer: {
    width: '90%',
    marginVertical: 20,
    minHeight: '25%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5d76cb',
    padding: 10,
  },
  textSoal: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
