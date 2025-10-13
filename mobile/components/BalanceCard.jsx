import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../constants/colors'

export const BalanceCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Saldo Total</Text>
      <Text style={styles.balanceAmount}>
        ${parseFloat(summary.balance).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Entradas</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${parseFloat(summary.income || 0).toFixed(2)}
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Saidas</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${Math.abs(parseFloat(summary.expense || 0)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  balanceTitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  balanceStatItem: {
    flex: 1,
    alignItems: 'center'
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border
  },
  balanceStatLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4
  },
  balanceStatAmount: {
    fontSize: 18,
    fontWeight: '600'
  }
})
