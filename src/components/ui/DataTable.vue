<template>
  <div class="">
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- pagination -->
    <div class="flex items-center justify-between">
      <span class="text-sm mr-2">
        Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
      </span>

      <div class="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>

        <template v-for="(page, index) in pageList" :key="index">
          <span v-if="page === '...'">...</span>
          <Button
            v-else
            variant="outline"
            size="sm"
            :class="{
              'text-white bg-black': table.getState().pagination.pageIndex === Number(page) - 1,
            }"
            @click="table.setPageIndex(Number(page) - 1)"
          >
            {{ page }}
          </Button>
        </template>

        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="TData, TValue">
import { computed } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import Button from './button/Button.vue'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
} from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const maxPageButtons = 5

const pageList = computed(() => {
  const pageCount = table.getPageCount()
  const current = table.getState().pagination.pageIndex
  const pages: (number | string)[] = []

  if (pageCount <= maxPageButtons) {
    for (let i = 1; i <= pageCount; i++) pages.push(i)
  } else {
    if (current < 2) {
      pages.push(1, 2, 3, '...', pageCount)
    } else if (current > pageCount - 3) {
      pages.push(1, '...', pageCount - 2, pageCount - 1, pageCount)
    } else {
      pages.push(1, '...', current, current + 1, current + 2, '...', pageCount)
    }
  }
  return pages
})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

table.setPageSize(10)
</script>
