import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, usePathname } from 'expo-router'
import { COLORS } from '../constants/colors'

export function FooterMenu() {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    {
      id: 'home',
      label: 'Tela Inicial',
      icon: 'home',
      route: '/'
    },
    {
      id: 'add',
      label: 'Adicionar',
      icon: 'add-circle',
      route: '/create'
    },
    {
      id: 'reports',
      label: 'Relatório',
      icon: 'bar-chart',
      route: '/reports'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: 'person',
      route: '/profile'
    }
  ]

  const isActive = route => {
    if (route === '/') return pathname === '/'
    return pathname.startsWith(route)
  }

  const handleNavigation = route => {
    if (isActive(route)) return
    router.push(route)
  }

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              isActive(item.route) && styles.menuItemActive
            ]}
            onPress={() => handleNavigation(item.route)}
          >
            <View
              style={[
                styles.iconContainer,
                isActive(item.route) && styles.iconContainerActive
              ]}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={isActive(item.route) ? COLORS.white : COLORS.textLight}
              />
            </View>
            <Text
              style={[
                styles.menuText,
                isActive(item.route) && styles.menuTextActive
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: `${COLORS.border}20`
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  menuItemActive: {
    backgroundColor: `${COLORS.primary}08`,
    transform: [{ translateY: -1 }]
  },
  iconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent'
  },
  iconContainerActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4
  },
  menuText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textLight
  },
  menuTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 11
  }
})
