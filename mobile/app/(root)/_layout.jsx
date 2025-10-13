import { useUser } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { StyleSheet, View } from 'react-native'
import { FooterMenu } from '../../components/FooterMenu'

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return null

  if (!isSignedIn) return <Redirect href={'/sign-in'} />

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <FooterMenu />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  }
})
