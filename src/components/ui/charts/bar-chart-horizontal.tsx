import { VisAxis, VisStackedBar, VisTooltip } from '@unovis/solid'
import { Direction, Orientation, StackedBar } from '@unovis/ts'
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
}

const data: DataRecord[] = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const BarChartHorizontal = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart- Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class=''>
        <ChartContainer
          config={chartConfig}
          data={data}
          type='xy'
          yDirection={Direction.South}>
          <VisStackedBar<DataRecord>
            color='var(--color-desktop)'
            orientation={Orientation.Horizontal}
            roundedCorners={5}
            x={(_, i) => i}
            y={(d) => d.desktop}
          />
          <VisAxis<DataRecord>
            domainLine={false}
            gridLine={false}
            numTicks={data.length}
            tickFormat={(_, i) => data[i].month}
            tickLine={false}
            type='y'
          />
          <VisTooltip
            triggers={{
              [StackedBar.selectors.bar]: (d: DataRecord, x) => {
                const container = document.createElement('div')
                const Component = () => (
                  <ChartTooltipContent
                    config={chartConfig}
                    data={d}
                    hideLabel
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

export default BarChartHorizontal
