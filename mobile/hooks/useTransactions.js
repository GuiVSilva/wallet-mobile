import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { API_URL } from '../constants/api'

// const API_URL = "https://wallet-api-cxqp.onrender.com/api";

export const useTransactions = userId => {
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0
  })
  const [categorySummary, setCategorySummary] = useState([])
  const [summaryReport, setSummaryReport] = useState([])
  const [monthlyComparison, setMonthlyComparison] = useState({
    currentMonth: 0,
    previousMonth: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`)
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }, [userId])

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
      const data = await response.json()
      setSummary(data)
    } catch (error) {
      console.error('Error fetching summary:', error)
    }
  }, [userId])

  const loadData = useCallback(async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      await Promise.all([fetchTransactions(), fetchSummary()])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [fetchTransactions, fetchSummary, userId])

  const deleteTransaction = async id => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete transaction')

      loadData()
      Alert.alert('Sucesso', 'Transação excluida com sucesso!')
    } catch (error) {
      console.error('Error deleting transaction:', error)
      Alert.alert('Error', error.message)
    }
  }

  const fetchCategorySummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/categories/${userId}`
      )
      const data = await response.json()
      setCategorySummary(data)
    } catch (error) {
      console.error('Error fetching category summary:', error)
    }
  }, [userId])

  const fetchMonthlyComparison = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/comparison/${userId}`
      )
      const data = await response.json()
      setMonthlyComparison(data)
    } catch (error) {
      console.error('Error fetching monthly comparison:', error)
    }
  }, [userId])

  const fetchSummaryReport = useCallback(
    async (period = 'month') => {
      try {
        const response = await fetch(
          `${API_URL}/transactions/summary-report/${userId}?period=${period}`
        )
        const data = await response.json()
        console.log('summaryReport', data)
        setSummaryReport(data)
      } catch (error) {
        console.error('Error fetching summary report:', error)
      }
    },
    [userId]
  )

  const loadReport = useCallback(async () => {
    if (!userId) return
    setIsLoading(true)
    try {
      await Promise.all([
        fetchCategorySummary(),
        fetchMonthlyComparison(),
        fetchSummaryReport()
      ])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [fetchCategorySummary, fetchMonthlyComparison, fetchSummaryReport, userId])

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
    loadReport,
    categorySummary,
    monthlyComparison,
    summaryReport,
    fetchSummaryReport
  }
}
