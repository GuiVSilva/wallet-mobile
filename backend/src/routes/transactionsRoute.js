import express from 'express'
import {
  createTransaction,
  deleteTransaction,
  getCategorySummary,
  getMonthlyComparison,
  getSummaryByUserId,
  getSummaryReport,
  getTransactionsByUserId
} from '../controllers/transactionsController.js'

const router = express.Router()

router.get('/:userId', getTransactionsByUserId)

router.post('/', createTransaction)

router.delete('/:id', deleteTransaction)

router.get('/summary/:userId', getSummaryByUserId)

router.get('/categories/:userId', getCategorySummary)

router.get('/comparison/:userId', getMonthlyComparison)

router.get('/summary-report/:userId', getSummaryReport)

export default router
