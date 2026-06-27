import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDZfaekzVm5JZD4stu1KiiYBChvqwr7xIY",
  authDomain: "slimefun-database.firebaseapp.com",
  projectId: "slimefun-database",
  storageBucket: "slimefun-database.firebasestorage.app",
  messagingSenderId: "201870075332",
  appId: "1:201870075332:web:bc453fcba32a78169a7091",
  measurementId: "G-Y1YDWMQ20C"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Analytics only runs in the browser (not during SSR)
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) getAnalytics(app)
  })
}

export default app