import React,{useEffect,useState} from 'react'
import { View, Text,ActivityIndicator ,StyleSheet,Image} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Feather from 'react-native-vector-icons/Feather'
import {Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth'

export default function AccountScreen({user}) {
     const [profile,setProfile] = useState('')

     useEffect(()=>{
     firestore().collection('users').doc(user.uid).get().then(docSnap=>{
        setProfile(docSnap.data())
     })
     },[])
     if(!profile){
        return  <ActivityIndicator size="large" color="#00ff00" />
    }
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{uri:profile.pic}} />
            <Text style={styles.text}>Name - {profile.name}</Text>
            <View style={{flexDirection:"row"}}>
                <Feather name="mail" size={30} color="white" />
                <Text style={[styles.text,{marginLeft:10}]}>{profile.email}</Text>
            </View>
            <Button
                style={styles.btn}
                mode="contained"
                onPress={()=>{
                    firestore().collection('users')
                    .doc(user.uid)
                    .update({
                      status:firestore.FieldValue.serverTimestamp()
                    }).then(()=>{
                         auth().signOut()
                    })
                }}
            >Logout</Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"green",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    img:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:3,
        borderColor:"white"
    },
    text:{
        fontSize:23,
        color:"white"
    },
    btn:{
        borderColor:"white",
        borderWidth:3
    }
})