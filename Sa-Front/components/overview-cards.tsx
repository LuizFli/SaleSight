"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { DollarSign, Car } from "lucide-react"
import { getEstoqueSummary } from "@/lib/api"

export function OverviewCards() {
  const [summary, setSummary] = useState({ totalValue: 0, totalQuantity: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getEstoqueSummary()
        setSummary(data)
      } catch (error) {
        console.error("Failed to load summary", error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const cards = [
    {
      icon: DollarSign,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      label: "Receita Total (Estoque)",
      value: loading 
        ? "..." 
        : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summary.totalValue),
    },
    {
      icon: Car,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      label: "Veículos em Estoque",
      value: loading ? "..." : String(summary.totalQuantity),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center mb-3`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div className="text-xs text-gray-600 mb-1">{card.label}</div>
            <div className="text-2xl font-bold mb-2">
              {card.value}
              
            </div>
            <div className="flex items-center gap-1 text-xs">
              
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
