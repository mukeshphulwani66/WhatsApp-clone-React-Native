import React,{useEffect,useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import HomeScreen from './screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ChatScreen from './screens/ChatScreen';
import firestore from '@react-native-firebase/firestore'
import AccountScreen from './screens/AccountScreen';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};


const Stack = createStackNavigator();

const Navigation = ()=>{
  const [user,setuser] = useState('')
  useEffect(()=>{
   const unregister =  auth().onAuthStateChanged(userExist=>{
      if(userExist){
       
        firestore().collection('users')
        .doc(userExist.uid)
        .update({
          status:"online"
        })
        setuser(userExist)


      } 
 
      else setuser("")
    })

    return ()=>{
      unregister()
    }

  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
         headerTintColor:"green"
       }}
      
      >
        {user?
        <>
        <Stack.Screen name="home"  options={{
          // headerRight:()=><MaterialIcons
          // name="account-circle"
          // size={34}
          // color="green"
          // style={{marginRight:10}}
          // onPress={()=>{
          //   firestore().collection('users')
          //   .doc(user.uid)
          //   .update({
          //     status:firestore.FieldValue.serverTimestamp()
          //   }).then(()=>{
          //        auth().signOut()
          //   })
           
         
          // }}
          // />,
          title:"WhatsApp"
        }}> 
         {props => <HomeScreen {...props}  user={user} />}
        </Stack.Screen>
        <Stack.Screen name="chat" options={({ route }) => ({ title:<View><Text>{route.params.name}</Text><Text>{route.params.status}</Text></View> })}>
          {props => <ChatScreen {...props} user={user} /> }
        </Stack.Screen>
        <Stack.Screen name="account">
          {props => <AccountScreen {...props} user={user}/> }
        </Stack.Screen>
       
        
        </>
        :
        <>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}}/>
        </>
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const App = () => {


  return (
    <>
      <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="green" />
       <View style={styles.container}>
         <Navigation />
       </View>
      </PaperProvider>

    </>
  );
};

const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:"white"
   }
});

export default App;
