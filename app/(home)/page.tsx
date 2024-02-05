"use client"

import { Card, Title } from '@tremor/react';
import Search from './search';
import axios from 'axios';
import { baseUrl } from "../baseUrl";
import { toast } from 'react-hot-toast';
import ItemsTable from '../components/table';
import { useEffect, useState } from 'react';
interface Expense {
  id: number;
  amount: number;
  category: string;
  notes: string;
  date: string;
  status: number;
}

export default function Home() {

  const [items, setItems] = useState<Expense[]>([])

  const getExpenses = async () => {
    try {
      const res: { data: { rows: Expense[], error: string } } = await axios.get(`${baseUrl}expenses/`)
      if (res?.data?.error) {
        toast.error(res.data.error)
      }
      setItems(res?.data?.rows || [])
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Something went wrong')
    }

  }

  useEffect(() => {
    getExpenses()
  }, [])


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Expenses</Title>
      <Search />
      <Card className="mt-6">
        <ItemsTable<Expense, keyof Expense> items={items} columns={["id", "amount", "category", "date"]} />
      </Card>
    </main>
  );
}

