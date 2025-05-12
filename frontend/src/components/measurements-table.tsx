import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp } from "lucide-react"

const measurements = [
  {
    date: "May 24, 2023",
    weight: "182 lbs",
    bodyFat: "18.2%",
    chest: "42 in",
    waist: "34 in",
    hips: "40 in",
    arms: "15 in",
    thighs: "24 in",
    changes: {
      weight: -2.5,
      bodyFat: -1.3,
      chest: 0.5,
      waist: -1,
      hips: -0.5,
      arms: 0.25,
      thighs: 0,
    },
  },
  {
    date: "Apr 24, 2023",
    weight: "184.5 lbs",
    bodyFat: "19.5%",
    chest: "41.5 in",
    waist: "35 in",
    hips: "40.5 in",
    arms: "14.75 in",
    thighs: "24 in",
    changes: {
      weight: -3,
      bodyFat: -1.5,
      chest: 0,
      waist: -1.5,
      hips: -1,
      arms: 0,
      thighs: -0.5,
    },
  },
  {
    date: "Mar 24, 2023",
    weight: "187.5 lbs",
    bodyFat: "21%",
    chest: "41.5 in",
    waist: "36.5 in",
    hips: "41.5 in",
    arms: "14.75 in",
    thighs: "24.5 in",
    changes: {
      weight: 0,
      bodyFat: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      arms: 0,
      thighs: 0,
    },
  },
]

export function MeasurementsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Body Fat</TableHead>
            <TableHead>Chest</TableHead>
            <TableHead>Waist</TableHead>
            <TableHead>Hips</TableHead>
            <TableHead>Arms</TableHead>
            <TableHead>Thighs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {measurements.map((measurement, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{measurement.date}</TableCell>
              <TableCell>
                {measurement.weight}
                {measurement.changes.weight !== 0 && (
                  <Badge variant="outline" className="ml-2">
                    {measurement.changes.weight > 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                    )}
                    {Math.abs(measurement.changes.weight)} lbs
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {measurement.bodyFat}
                {measurement.changes.bodyFat !== 0 && (
                  <Badge variant="outline" className="ml-2">
                    {measurement.changes.bodyFat > 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
                    )}
                    {Math.abs(measurement.changes.bodyFat)}%
                  </Badge>
                )}
              </TableCell>
              <TableCell>{measurement.chest}</TableCell>
              <TableCell>{measurement.waist}</TableCell>
              <TableCell>{measurement.hips}</TableCell>
              <TableCell>{measurement.arms}</TableCell>
              <TableCell>{measurement.thighs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
