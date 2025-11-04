import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const getLocation = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return null;
      }
    }
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        position => resolve(position.coords),
        _err => resolve(null),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
      );
    });
  } catch {
    return null;
  }
};
