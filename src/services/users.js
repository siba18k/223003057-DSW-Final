import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createUserDoc = async (user) => {
  if (!user?.uid) return;
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      createdAt: new Date().toISOString(),
    });
  }
};

export const updateUserDoc = async (uid, data) => {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, data, { merge: true });
};
