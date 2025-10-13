import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native'
import { useUser, useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { useState } from 'react'

export default function ProfileScreen() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true)
          await signOut()
          setIsLoading(false)
        }
      }
    ])
  }

  const menuItems = [
    {
      id: 'edit-profile',
      title: 'Editar Perfil',
      icon: 'person-outline',
      onPress: () =>
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
      color: COLORS.primary
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: 'notifications-outline',
      onPress: () =>
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
      color: '#F59E0B'
    },
    {
      id: 'security',
      title: 'Segurança',
      icon: 'shield-checkmark-outline',
      onPress: () =>
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
      color: '#10B981'
    },
    {
      id: 'help',
      title: 'Ajuda & Suporte',
      icon: 'help-circle-outline',
      onPress: () =>
        Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
      color: '#3B82F6'
    },
    {
      id: 'about',
      title: 'Sobre o App',
      icon: 'information-circle-outline',
      onPress: () =>
        Alert.alert(
          'Sobre',
          'Carteira Digital v1.0\n\nGerencie suas finanças de forma simples e eficiente.'
        ),
      color: '#8B5CF6'
    }
  ]

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={COLORS.white} />
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={COLORS.primary}
              />
            </View>
          </View>

          <Text style={styles.userName}>
            {user?.firstName ||
              user?.emailAddresses[0]?.emailAddress.split('@')[0]}
          </Text>
          <Text style={styles.userEmail}>
            {user?.emailAddresses[0]?.emailAddress}
          </Text>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <View style={styles.menuList}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View
                  style={[
                    styles.menuIcon,
                    { backgroundColor: `${item.color}20` }
                  ]}
                >
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.signOutButton,
            isLoading && styles.signOutButtonDisabled
          ]}
          onPress={handleSignOut}
          disabled={isLoading}
        >
          <Ionicons name="log-out-outline" size={22} color={COLORS.expense} />
          <Text style={styles.signOutText}>
            {isLoading ? 'Saindo...' : 'Sair da Conta'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Carteira Digital v1.0</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  scrollView: {
    flex: 1
  },
  userCard: {
    backgroundColor: COLORS.card,
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.cardLight
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 2
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center'
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 24,
    textAlign: 'center'
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8
  },
  menuSection: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
    marginLeft: 4
  },
  menuList: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  menuItemLast: {
    borderBottomWidth: 0
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLORS.expense}15`,
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${COLORS.expense}30`
  },
  signOutButtonDisabled: {
    opacity: 0.5
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.expense,
    marginLeft: 8
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textLight,
    opacity: 0.7
  }
})
