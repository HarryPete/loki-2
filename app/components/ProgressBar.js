import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { FormatDate } from "@/utility/FormatDate"
import Link from "next/link"

const chartConfig = 
{
    completed: {
      label: "Completed",
      color: "hsl(0 72.2% 50.6%)",
    },
    upcoming: {
      label: "Upcoming",
      color: "hsl(0 0% 9%)",
    },
};

const ProgressBar = ({batch}) =>
{

    const completed = batch.sessions.filter((session) => session.isCompleted).length;
    const pending = batch.sessions.length - completed;

    const chartData = 
    [
        { label: 'Completed', value: completed, fill:'hsl(0 72.2% 50.6%)'},
        { label: 'Upcoming', value: pending, fill:'hsl(0 0% 9%)'},
    ]

    return (
    <Card className="flex flex-col h-fit text-lg">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>{batch.course.title}</CardTitle>
        <CardDescription>{FormatDate(batch.startDate) +' - ' +FormatDate(batch.endDate) }</CardDescription>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
            <Label
              content={({ viewBox }) => {
              return (
              <text x={viewBox.cx}
              y={viewBox.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-black text-lg font-semibold">
              {((completed / (completed + pending)) * 100).toFixed(1)}%
            </text>);
            }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="font-semibold">
          
        </div>
        <div className="flex items-center gap-2 font-semibold leading-none text-sm">
        {batch.title} <span className="text-gray-500 font-medium">instructed by</span> {batch.mentor.name}
        </div>
        <div className="space-x-2 text-white mt-2">
          {/* <Link href={batch?.zoomLink ? batch?.zoomLink : ""} target="_blank" className="bg-[hsl(var(--chart-1))] p-1 rounded shadow-lg" >Zoom</Link> */}
          {/* <Link href='/forum' className="bg-[hsl(var(--chart-1))] p-1 rounded shadow-lg" >Forum</Link> */}
          {/* <Link href='' className="bg-[hsl(var(--chart-1))] p-1 rounded shadow-lg" >Whatsapp</Link> */}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProgressBar