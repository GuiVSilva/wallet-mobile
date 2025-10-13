import { useUser } from '@clerk/clerk-expo'
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect, useState } from 'react'
import PageLoader from '../../components/PageLoader'
import { BalanceCard } from '../../components/BalanceCard'
import { TransactionItem } from '../../components/TransactionItem'
import NoTransactionsFound from '../../components/NoTransactionsFound'
import { COLORS } from '../../constants/colors'

export default function Page() {
  const { user } = useUser()
  const [refreshing, setRefreshing] = useState(false)

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user.id)

  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDelete = id => {
    Alert.alert(
      'Excluir Transação',
      'Você quer realmente excluir essa transação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteTransaction(id)
        }
      ]
    )
  }

  if (isLoading && !refreshing) return <PageLoader />

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Bem Vindo,</Text>
                <Text style={styles.usernameText}>
                  {user?.emailAddresses[0]?.emailAddress.split('@')[0]}
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <SignOutButton />
            </View>
          </View>

          <BalanceCard summary={summary} />

          <View style={styles.transactionsHeaderContainer}>
            <Text style={styles.sectionTitle}>Transações Recentes</Text>
          </View>
        </View>

        <FlatList
          style={styles.transactionsList}
          contentContainerStyle={styles.transactionsListContent}
          data={transactions}
          renderItem={({ item }) => (
            <TransactionItem item={item} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<NoTransactionsFound />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  mainContent: {
    flex: 1
  },
  content: {
    padding: 20,
    paddingBottom: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 12
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  welcomeContainer: {
    flex: 1
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: 'bold',
    marginBottom: 2
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  transactionsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15
  },
  transactionsList: {
    flex: 1,
    marginHorizontal: 20
  },
  transactionsListContent: {
    paddingBottom: 20
  }
})
