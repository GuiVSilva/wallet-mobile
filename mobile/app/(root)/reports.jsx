// app/root/reports.jsx
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl
} from 'react-native'
import { useUser } from '@clerk/clerk-expo'
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { useTransactions } from '../../hooks/useTransactions'
import { getCategoryColor } from '../../constants/categories'

const { width } = Dimensions.get('window')

export default function ReportsScreen() {
  const { user } = useUser()
  const {
    summaryReport,
    categorySummary,
    monthlyComparison,
    loadReport,
    fetchSummaryReport
  } = useTransactions(user.id)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await loadReport()
    setRefreshing(false)
  }

  useEffect(() => {
    loadReport()
  }, [loadReport])

  useEffect(() => {
    fetchSummaryReport(selectedPeriod)
  }, [selectedPeriod, fetchSummaryReport])

  const periods = [
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mês' },
    { id: 'year', label: 'Ano' }
  ]
  const statsCards = [
    {
      id: 'balance',
      title: 'Saldo Atual',
      value: `R$ ${parseFloat(summaryReport.balance || 0).toFixed(2)}`,
      icon: 'wallet-outline',
      color: '#8B5CF6',
      trend: '+5.2%'
    },
    {
      id: 'income',
      title: 'Receitas',
      value: `R$ ${parseFloat(summaryReport.income || 0).toFixed(2)}`,
      icon: 'trending-up-outline',
      color: COLORS.income,
      trend: '+12.1%'
    },
    {
      id: 'expense',
      title: 'Despesas',
      value: `R$ ${Math.abs(parseFloat(summaryReport.expense || 0)).toFixed(
        2
      )}`,
      icon: 'trending-down-outline',
      color: COLORS.expense,
      trend: '-3.4%'
    }
  ]

  const CategoryBar = ({ name, value, percentage, color }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryInfo}>
          <View style={[styles.categoryDot, { backgroundColor: color }]} />
          <Text style={styles.categoryName}>{name}</Text>
        </View>
        <Text style={styles.categoryValue}>R$ {value.toFixed(2)}</Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: color
            }
          ]}
        />
      </View>
      <Text style={styles.categoryPercentage}>{percentage.toFixed(1)}%</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.periodSelector}>
          {periods.map(period => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period.id && styles.periodButtonTextActive
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsGrid}>
          {statsCards.map(card => (
            <View key={card.id} style={styles.statCard}>
              <View style={styles.statHeader}>
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: `${card.color}20` }
                  ]}
                >
                  <Ionicons name={card.icon} size={20} color={card.color} />
                </View>
                <Text style={styles.statTrend}>{card.trend}</Text>
              </View>
              <Text style={styles.statValue}>{card.value}</Text>
              <Text style={styles.statTitle}>{card.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gastos por Categoria</Text>
          </View>
          <View style={styles.categoriesList}>
            {categorySummary.map((category, index) => (
              <CategoryBar
                key={category.category}
                name={category.category}
                value={category.total}
                percentage={category.percentage}
                color={getCategoryColor(category.category, index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comparativo Mensal</Text>
          <View style={styles.comparisonCard}>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Este Mês</Text>
              <Text style={[styles.comparisonValue, { color: COLORS.income }]}>
                R$ {monthlyComparison.currentMonth.toFixed(2)}
              </Text>
            </View>
            <View style={styles.comparisonDivider} />
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Mês Passado</Text>
              <Text style={[styles.comparisonValue, { color: COLORS.text }]}>
                R$ {monthlyComparison.previousMonth.toFixed(2)}
              </Text>
            </View>
          </View>
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

  periodSelector: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight
  },
  periodButtonTextActive: {
    color: COLORS.white,
    fontWeight: '600'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24
  },
  statCard: {
    width: (width - 56) / 2,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statTrend: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.income
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4
  },
  statTitle: {
    fontSize: 14,
    color: COLORS.textLight
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text
  },
  categoriesList: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  categoryItem: {
    marginBottom: 16
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },
  categoryName: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500'
  },
  categoryValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600'
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 3,
    marginBottom: 4
  },
  progressFill: {
    height: '100%',
    borderRadius: 3
  },
  categoryPercentage: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'right'
  },
  comparisonCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center'
  },
  comparisonDivider: {
    width: 1,
    backgroundColor: COLORS.border
  },
  comparisonLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8
  },
  comparisonValue: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
