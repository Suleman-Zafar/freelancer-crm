'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Wallet, TrendingUp, DollarSign } from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import Navbar from "../components/layout/Navbar"
import useInvoiceStore from '../stores/invoiceStore'
import { useEffect } from 'react'

// Register Chart.js plugins
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// 🔧 Helper to parse various date formats
function parseDateSmart(dateStr) {
  if (!dateStr) return null

  if (typeof dateStr === 'object' && dateStr.toDate) {
    return dateStr.toDate()
  }

  const isoDate = new Date(dateStr)
  if (!isNaN(isoDate)) return isoDate

  const parts = dateStr.split('-')
  if (parts.length === 3) {
    const [day, month, year] = parts
    const fallbackDate = new Date(`${year}-${month}-${day}`)
    if (!isNaN(fallbackDate)) return fallbackDate
  }

  return null
}

export default function Income() {
  const { invoices, fetchInvoices } = useInvoiceStore()

  useEffect(() => {
    const unsubscribe = fetchInvoices()
    return () => unsubscribe()
  }, [])

  const paidInvoices = invoices.filter(i => i.status === 'Paid')

  const totalIncome = paidInvoices.reduce(
    (sum, inv) => sum + Number(inv.amount || 0),
    0
  )

  const incomeByWeek = [0, 0, 0, 0]
  paidInvoices.forEach(invoice => {
    const date = parseDateSmart(invoice.paidDate)
    if (!date) return

    const week = Math.ceil(date.getDate() / 7)
    if (week >= 1 && week <= 4) {
      incomeByWeek[week - 1] += Number(invoice.amount || 0)
    }
  })

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Income ($)',
        data: incomeByWeek,
        backgroundColor: '#6366f1',
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 500 },
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
  }

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6 max-w-6xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Wallet className="text-indigo-600" />
              <CardTitle>Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalIncome}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-4">
              <TrendingUp className="text-green-600" />
              <CardTitle>Monthly Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $5000
              </p>
              <p className="text-sm text-muted-foreground">
                You’re at {Math.round((totalIncome / 5000) * 100)}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-4">
              <DollarSign className="text-blue-600" />
              <CardTitle>Paid Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {paidInvoices.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              {incomeByWeek.every(val => val === 0) ? (
                <div className="text-center text-sm text-muted-foreground py-16">
                  No valid <strong>Paid Date</strong> entries for paid invoices.
                  <br />
                  Check your invoice data or mark invoices as <em>Paid</em>.
                </div>
              ) : (
                <Bar data={chartData} options={chartOptions} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Income Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>${item.amount}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>{item.paidDate || '-'}</TableCell>
                    <TableCell>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          item.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
