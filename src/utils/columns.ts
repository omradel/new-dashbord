import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export type order = {
  amount: number
  id: string
  status: number
  email: string
}

//===================================================================================
// orders table columns definition
//===================================================================================
export const columns: ColumnDef<order>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-center' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-center font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-center' }, 'Id'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('id'))
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-center' }, 'Email'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center font-medium' }, row.getValue('email'))
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-center' }, 'Status'),
    cell: ({ row }) => {
      const status = row.getValue('status')
      const statusText = status === 1 ? 'Completed' : status === 2 ? 'Pending' : 'Cancelled'
      const statusClass =
        status === 1
          ? 'text-green-500 rounded-lg bg-green-200'
          : status === 2
            ? 'text-yellow-500 rounded-lg bg-yellow-200'
            : 'text-red-500 rounded-lg bg-red-200'

      const div = h(
        'div',
        { class: `text-center font-medium ${statusClass} w-fit px-2` },
        statusText,
      )

      return h('div', { class: `flex justify-center w-full` }, div)
    },
  },
]
