import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import { NavigationContainer,useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AsyncStorage  from '@react-native-async-storage/async-storage';


import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList
} from "react-native";


function Login({navigation},props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidError, setEmailValidError] = useState('');
  const [passwordValidError, setpasswordValidError] = useState('');
  
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};
const post =() => {
  // fetch('http://10.0.2.2:8080/todo',{
  // }).then((res) => {
  //     console.log('result',res).json();
  //     console.log('data',res.arrayBuffer);
  //     console.log(res.status === 200);
  //     if (res.status === 200) {
  //         alert("Data fatched");
  //         //navigation.navigate('User');
  //     } else {
  //         alert("Sorry");
  //     }
  // }).catch((error) => {
  //     console.error(error);
  // });

  fetch("http://10.0.2.2:8080/todo")
      .then(response => response.json())
      .then(jsonResponse => console.log(jsonResponse))
      .catch(error => console.log(error))


} 
const login=()=>{
   
     console.log('Email :',email,'password')
    if(email==='Nikhil'&&password==='1234')
    {
      navigation.navigate("Home")
    }

}

 
const  validateemail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (text.length === 0) {
      setEmailValidError('email address must be entered');
    }else if (reg.test(text) === false) {
      console.log("Email is Not Correct");
       setEmail(text)
       setEmailValidError('Enter valid email address');
    }
    else {
       setEmail(text)
       console.log("Email is Correct");
       setEmailValidError('');
    }
  }

const checkPasswordValidity = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  if (value && !isNonWhiteSpace.test(value)) {
    return "Password must not contain Whitespaces.";
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (value && !isContainsUppercase.test(value)) {
    return "Password must have at least one Uppercase Character.";
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (value && !isContainsLowercase.test(value)) {
    return "Password must have at least one Lowercase Character.";
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (value && !isContainsNumber.test(value)) {
    return "Password must contain at least one Digit.";
  }

  const isValidLength = /^.{8,16}$/;
  if (value && !isValidLength.test(value)) {
    return "Password must be 8-16 Characters Long.";
  }
  return null;
};

const validatepassword = (password) => {
   
  setPassword(password)
  console.log(password)
  setpasswordValidError(checkPasswordValidity(password))
  
}



  return(
    <View style={styles.container}>
 
 {emailValidError ? <Text>{emailValidError}</Text> : null}
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(email) =>validateemail(email)}
      />
    </View>
   
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => validatepassword(password)}
      />
    </View>
    {passwordValidError ? <Text>{passwordValidError}</Text> : null}

    <TouchableOpacity>
      <Text style={styles.forgot_button}>Forgot Password?</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.loginBtn} onPress={()=>{login()}}>
      <Text style={styles.loginText}>LOGIN</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.SignUpBtn}  onPress={() =>{props.setShow(!props.show)}}>
      <Text style={styles.loginText}>SignUP</Text>
    </TouchableOpacity>
  </View>

  )

}


function SignUp(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  return(
    <View style={styles.container}>
 
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Name"
        placeholderTextColor="#003f5c"
        onChangeText={(name) => setname(email)}
      />
    </View>
    
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setEmail(email)}
      />
    </View>

    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
    </View>

    
    <TouchableOpacity style={styles.loginBtn}>
      <Text style={styles.loginText}>SignUp</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.SignUpBtn} onPress={() =>{props.setShow(!props.show)}}>
      <Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>
  </View>

  )

} 


function AddToDo({navigation},props){
  const [Title, setTitle] = useState("");
  const [Due_Date, setDue_Date] = useState("");

  const handleAddTodo = async () => {
    const data = await AsyncStorage.getItem('todos');
    const todos = JSON.parse(data);
 
    console.log("Title and Due_Date are Here",Title,Due_Date)
    todos.push({
      Title: Title,
      Due_Date:Due_Date,
    });
    console.log(todos, 'add form');
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    setTitle('');
    setDue_Date('');

    navigation.navigate("Home");
  };


  return(
    <View style={styles.container}>
 
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Title"
        placeholderTextColor="#003f5c"
        onChangeText={(title) => setTitle(title)}
      />
    </View>
    
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Due_Date"
        placeholderTextColor="#003f5c"
        onChangeText={(date) => setDue_Date(date)}
      />
    </View>

    
    <TouchableOpacity style={styles.loginBtn} onPress={()=>{handleAddTodo()}}>
      <Text style={styles.loginText}>Add ToDo</Text>
    </TouchableOpacity>

    <Button
      title="Go to  profile"
      onPress={() =>
        navigation.navigate('Home')
      }
    />

  </View>

  )

}
const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
}; 


const Item = ({ data }) => (
  <View style={styles.item}>
    <Text style={styles.title}>Title:{data.Title}</Text>
    <Text style={styles.title}>Due Date:{data.Due_Date}</Text>
  </View>
);

function Home({navigation}){

  const renderItem = ({item} ) => (
    <>
    {console.log(item)}
    <Item data={item} />
    </>
  ); 
const isFocused = useIsFocused()
 const myData1=[{
      
    "Title": "Gym",
    "Due_Date":"05/11/2022"
   },
   {
    
    "Title": "Purchase Grocery",
    "Due_Date":"05/11/2022"
   }
  ]
const [myData,setmyData]=useState([])
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('todos');
    if (value !== null) {
      // We have data!!
      // console.log("Data inside use Effect"+value);
      const data = JSON.parse(value)
      setmyData(data)
    }
    // console.log(value,'fghjkl;')
    // return value

  } catch (error) {
    // Error retrieving data
  }
}; 
useEffect(() => {
  
  _retrieveData()
  console.log("----",myData)
}, [isFocused]);  

const addtodo=()=>{
   
  navigation.navigate("AddToDo")

}

  return(
    <View style={styles.container}>
      <Text style={{height:100,marginTop:40,fontSize:25 }}>Hello Nikhil</Text>
      {/* <Image style={styles.icon}
        source={AddButton}
      /> */}
       
       <TouchableOpacity style={styles.SignUpBtn}  onPress={() =>{addtodo()}}>
         <Text style={styles.loginText}>AddTodo</Text>
       </TouchableOpacity>
     
      <FlatList
        data={myData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />




    </View>

    
  

  )

  } 

  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'key',
        'I like to save it.'
      );
    } catch (error) {
      // Error saving data
    }
  };
  

const Stack = createNativeStackNavigator();


AsyncStorage.setItem('todos', JSON.stringify([]));



export default function App() {
  //const [show, setShow] = useState(false);
    const [todoAdded,settodoAdded]=useState(false)
  return (
    // <View style={styles.parentcontainer} >
    // <Text style={styles.text}>ToDo App</Text>
    // {show?<Login show={show} setShow={setShow} />:<SignUp show={show} setShow={setShow} />}
    // </View>
    // <>
    // <Login/>
     
    //  </>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="AddToDo" component={AddToDo} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>  
   //  <AddToDo/>
    
   
  );
}
 
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text:{
    flex:1,
    marginLeft:70,
    fontSize: 50,
    color:'#ff1493'
  }, 
  parentcontainer: {
    flex:1,
    flexDirection:'column',
    backgroundColor: "#dcdcdc",   
  },
  container: {
    flex: 1,
    height:20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20

    
  },
  inputView: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color:"#000000"
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#841584",
  },
  SignUpBtn:{
    width: "20%",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#841584",
  },
  icon: {
    width: 25,
    height: 20,
  },
  HomeHeader:{
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    height:50,
    width:400,
    backgroundColor:	'#ffd700',
    
  },
  item: {
    width:350,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

});