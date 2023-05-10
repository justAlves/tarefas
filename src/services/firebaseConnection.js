import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAyWEnlAba3Tv7VtkJbufTE4CEHjUlOVE8",
    authDomain: "tarefas-41881.firebaseapp.com",
    projectId: "tarefas-41881",
    storageBucket: "tarefas-41881.appspot.com",
    messagingSenderId: "321165491880",
    appId: "1:321165491880:web:c696dd9c9153c0c8ec4c9d"
};


if( !firebase.apps.length ){
    firebase.initializeApp(firebaseConfig)
} 

export default firebase;