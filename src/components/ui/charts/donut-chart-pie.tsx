import { VisDonut, VisTooltip } from '@unovis/solid'
import { Donut } from '@unovis/ts'
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
  browser: string
  visitors: number
  fill: string
}

const data: DataRecord[] = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

const DonutChartPie = () => {
  return (
    <Card class='flex flex-col'>
      <CardHeader class='items-center'>
        <CardTitle>Donut Chart - Pie</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class='flex-1'>
        <ChartContainer config={chartConfig} type='single'>
          <VisDonut<DataRecord>
            arcWidth={0}
            color={(d) => d.fill}
            data={data}
            value={(d) => d.visitors}
          />
          <VisTooltip
            triggers={{
              [Donut.selectors.segment]: (d: { data: DataRecord }, x) => {
                const container = document.createElement('div')
                const Component = () => (
                  <ChartTooltipContent
                    config={chartConfig}
                    data={d.data}
                    hideLabel
                    labelAsKey
                    labelKey='browser'
                    x={x}
                  />
                )
                render(() => <Component />, container)
                return container.innerHTML
              },
            }}
          />
        </ChartContainer>
      </CardContent>
      <CardFooter class='flex-col gap-2 text-sm'>
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
      </CardFooter>
    </Card>
  )
}

export default DonutChartPie
