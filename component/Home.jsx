import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  Pressable,
  Button,
  Image,
  Modal,
  Alert,
} from 'react-native';

import {useContext, useState} from 'react';
import {AuthContext} from './context/AuthContext';
import {QuizContext} from './context/QuizContext';

const Home = ({navigation}) => {
  const {logout, userName, idUser} = useContext(AuthContext);
  const {quiz} = useContext(QuizContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});
  const [dataAnswer, setDataAnswer] = useState(0);

  

  const GoToListQuestion = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Question', {
      item: item,
    });
  };

  const getByUserAndQuiz = (item) => {
    // baseurl http://localhost:8080/v1/answers-quiz with query param id_user and id_quiz
    setModalVisible(true);
    setItem(item);
    
    fetch(`http://localhost:8080/v1/answers-quiz?id_user=${idUser}&id_quiz=${item.id}`)
      .then(response => response.json())
      .then(data => {
        setDataAnswer(data.data[0].skor)
      });
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHome}>
        <Text style={styles.homeText}>Welcome {userName}</Text>
        <Text style={styles.logoutText} onPress={logout}>
          Logout
        </Text>
        {/* <Button title="Logout" onPress={logout} /> */}
      </View>
      <View style={styles.mainImage}>
        {/* this is view for banner */}
        <Image
          source={require('../assets/banner.jpg')}
          style={{width: '100%', height: '100%', padding: 20, borderRadius: 20}}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 30,
        }}>
        <Text style={styles.listQuiz}>Quiz Tersedia</Text>
      </View>

      <ScrollView>
        {
          dataAnswer > 0 ?
          <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextJudul}>Nilai Kamu Adalah</Text>
              <Text style={{ fontSize:30, fontWeight:'bold', textAlign:'center' }}>{dataAnswer}</Text>
              
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Terima Kasih</Text>
                </Pressable>
                
              </View>
            </View>
          </View>
        </Modal>
        :
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextJudul}>{item.judul}</Text>
            <Text style={styles.modalText}>{item.deskripsi}</Text>
            <Text style={styles.modalText}>{item.total_soal} Soal</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.buttonBatal, styles.buttonCloseBatal]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyleBatal}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => GoToListQuestion()}>
                <Text style={styles.textStyle}>Lanjut</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
        }
      
        
        {quiz.map((item, index) => {
          return (
            <View style={{}}>
              <QuizCard
                key={index}
                title={item.judul}
                total_soal={item.total_soal}
                onPress={() => getByUserAndQuiz(item)}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const QuizCard = ({title, onPress, total_soal}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
      <Text style={styles.cardMiniText}>{total_soal} Soal</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logoutText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 13,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    height: 40,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonBatal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    height: 40,
  },

  buttonCloseBatal: {
    backgroundColor: 'white',
    borderColor: '#5d76cb',
    borderWidth: 1,
  },
  textStyleBatal: {
    color: '#5d76cb',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTextJudul: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'semibold',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#5d76cb',
  },
  cardMiniText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#5d76cb',
  },
  viewAll: {
    fontSize: 12,
    textDecorationLine: 'underline',
    fontWeight: 'normal',
    color: '#5d76cb',
    marginRight: 30,
    marginTop: 8,
    textAlign: 'right',
  },
  listQuiz: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5d76cb',
    marginLeft: 20,
    textAlign: 'left',
  },
  mainImage: {
    backgroundColor: '#41528e',
    height: '25%',
    borderRadius: 20,
    marginTop: -130,
    marginHorizontal: 20,
  },
  topHome: {
    backgroundColor: '#5d76cb',
    padding: 20,
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  card: {
    backgroundColor: 'transparent',
    borderColor: '#5d76cb',
    borderWidth: 2,
    padding: 10,
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 30,
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 10,
  },
  homeText: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#fff',
    margin: 10,
    textAlign: 'left',
  },

  container: {
    flex: 1,
  },
});

export default Home;
