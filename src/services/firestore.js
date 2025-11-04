import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const REVIEWS = 'reviews';
const BOOKINGS = 'bookings';

export const addReview = async ({ hotelId, userId, rating, comment }) => {
  const doc = await addDoc(collection(db, REVIEWS), {
    hotelId,
    userId,
    rating,
    comment,
    createdAt: serverTimestamp(),
  });
  return doc.id;
};

export const getReviewsForHotel = async (hotelId) => {
  const q = query(collection(db, REVIEWS), where('hotelId', '==', hotelId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addBooking = async ({ hotelId, userId, name, nights, price }) => {
  const doc = await addDoc(collection(db, BOOKINGS), {
    hotelId,
    userId,
    name,
    nights,
    total: nights * price,
    createdAt: serverTimestamp(),
  });
  return doc.id;
};

export const getBookingsForUser = async (userId) => {
  const q = query(collection(db, BOOKINGS), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
