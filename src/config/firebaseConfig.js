import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDQAksVr-o4tXyIOYaFXNs3-wp5Of_eW4A",
    authDomain: "all-invizo.firebaseapp.com",
    projectId: "all-invizo",
    storageBucket: "all-invizo.appspot.com",
    messagingSenderId: "672329966361",
    appId: "1:672329966361:web:f24169a82be9e48db75b88"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };