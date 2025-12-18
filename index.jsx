import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/explore/explore');
      router.replace('/explore/index');
    }, 50); // small delay for mounting

    return () => clearTimeout(timer);
  }, []);

  return null;
}
