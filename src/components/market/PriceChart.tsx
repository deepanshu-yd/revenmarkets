import React, { useEffect, useRef } from 'react'
import { createChart, ColorType, ISeriesApi, AreaSeries, Time } from 'lightweight-charts'

type Props = {
  data: { t: number; p: number }[]
  liveTick?: { t: number; p: number } | null
}

export const PriceChart = ({ data, liveTick }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#666',
        fontSize: 10,
        fontFamily: 'Plus Jakarta Sans',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.02)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.02)' },
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      handleScroll: true,
      handleScale: true,
    })

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: '#5eead4',
      topColor: 'rgba(94, 234, 212, 0.2)',
      bottomColor: 'rgba(94, 234, 212, 0.0)',
      lineWidth: 2,
      priceFormat: {
        type: 'custom',
        formatter: (p: number) => `${(p * 100).toFixed(1)}¢`,
      },
    })

    const formattedData = data
      .map((d) => ({
        time: d.t as Time,
        value: d.p,
      }))
      .sort((a, b) => (a.time as number) - (b.time as number))

    // Remove duplicates
    const uniqueData: typeof formattedData = []
    let lastT = -Infinity
    for (const p of formattedData) {
      const t = p.time as number
      if (t <= lastT) continue
      uniqueData.push(p)
      lastT = t
    }

    if (uniqueData.length > 0) {
      areaSeries.setData(uniqueData)
      lastTimeRef.current = uniqueData[uniqueData.length - 1].time as number
      chart.timeScale().fitContent()
    }

    chartRef.current = chart
    seriesRef.current = areaSeries

    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: containerRef.current.clientWidth, 
          height: containerRef.current.clientHeight 
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data])

  useEffect(() => {
    if (seriesRef.current && liveTick) {
      const t = Math.max(liveTick.t, lastTimeRef.current) as Time
      seriesRef.current.update({
        time: t,
        value: liveTick.p,
      })
      lastTimeRef.current = t as number
    }
  }, [liveTick])

  return <div ref={containerRef} className="w-full h-full" />
}
