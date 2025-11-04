import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const seedHotels = async () => {
  const hotels = [
    { id: '1', name: 'Oceanview Resort', location: 'Cape Town', price: 1299, rating: 4.6, image: 'https://picsum.photos/seed/hotel1/600/400' },
    { id: '2', name: 'Safari Lodge', location: 'Kruger Park', price: 1899, rating: 4.8, image: 'https://picsum.photos/seed/hotel2/600/400' },
    { id: '3', name: 'City Lights Hotel', location: 'Johannesburg', price: 999, rating: 4.2, image: 'https://picsum.photos/seed/hotel3/600/400' },
  ];
  for (const h of hotels) {
    await addDoc(collection(db, 'hotels'), h);
  }
};
