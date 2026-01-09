import {
  VisAxis,
  VisBulletLegend,
  VisStackedBar,
  VisTooltip,
} from '@unovis/solid'
import { type BulletLegendItemInterface, StackedBar } from '@unovis/ts'
import { render } from 'solid-js/web'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card'
import { type ChartConfig, ChartContainer, ChartTooltipContent } from './chart'

interface DataRecord {
  month: string
  desktop: number
  mobile: number
}

const data: DataRecord[] = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const BarChartStacked = () => {
  const items = (): BulletLegendItemInterface[] => {
    return Object.entries(chartConfig).map(([_, config]) => ({
      name: config.label,
      color: config.color,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class=''>
        <ChartContainer
          config={chartConfig}
          data={data}
          type='xy'
          yDomain={[0, 620]}>
          <VisStackedBar<DataRecord>
            color={['var(--color-desktop)', 'var(--color-mobile)']}
            roundedCorners={4}
            x={(_, i) => i}
            y={[(d) => d.desktop, (d) => d.mobile]}
          />
          <VisAxis<DataRecord>
            domainLine={false}
            gridLine={false}
            numTicks={data.length}
            tickFormat={(d) => data[d as number].month.slice(0, 3)}
            tickLine={false}
            type='x'
          />
          <VisTooltip
            triggers={{
              [StackedBar.selectors.bar]: (d: DataRecord, x) => {
                const container = document.createElement('div')
                const Component = () => (
                  <ChartTooltipContent
                    config={chartConfig}
                    data={d}
                    labelKey='month'
                    x={x}
                  />
                )
                render(() => <Component />, container)
                return container.innerHTML
              },
            }}
          />
        </ChartContainer>
        <div class='flex items-center justify-center gap-4 pt-3'>
          <VisBulletLegend items={items()} />
        </div>
      </CardContent>
      <CardFooter>
        <div class='flex w-full items-start gap-2 text-sm'>
          <div class='grid gap-2'>
            <div class='flex items-center gap-2 font-medium leading-none'>
              Trending up by 5.2% this month{' '}
              <svg
                class='size-4'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <g
                  fill='none'
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'>
                  <path d='m22 7l-8.5 8.5l-5-5L2 17' />
                  <path d='M16 7h6v6' />
                  <title>Icon</title>
                </g>
              </svg>
            </div>
            <div class='flex items-center gap-2 text-muted-foreground leading-none'>
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BarChartStacked
