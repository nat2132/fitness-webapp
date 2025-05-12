import * as React from "react"
import { format } from "date-fns"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimePickerProps {
  date: Date
  setDate: (date: Date) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)

  const [hour, setHour] = React.useState<number>(date ? date.getHours() : 12)
  const [minute, setMinute] = React.useState<number>(date ? date.getMinutes() : 0)
  const [meridiem, setMeridiem] = React.useState<"AM" | "PM">(date ? (date.getHours() >= 12 ? "PM" : "AM") : "AM")

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10)
    if (isNaN(value)) {
      setHour(0)
      return
    }
    if (value > 12) {
      setHour(12)
    } else if (value < 0) {
      setHour(0)
    } else {
      setHour(value)
    }
    if (e.target.value.length >= 2) {
      minuteRef.current?.focus()
    }
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10)
    if (isNaN(value)) {
      setMinute(0)
      return
    }
    if (value > 59) {
      setMinute(59)
    } else if (value < 0) {
      setMinute(0)
    } else {
      setMinute(value)
    }
  }

  const handleMeridiemChange = (value: string) => {
    setMeridiem(value as "AM" | "PM")
  }

  React.useEffect(() => {
    const newCalculatedDate = new Date(date);
    let currentHours = hour;
    if (meridiem === "PM" && hour < 12) {
      currentHours += 12;
    }
    if (meridiem === "AM" && hour === 12) {
      currentHours = 0;
    }
    newCalculatedDate.setHours(currentHours);
    newCalculatedDate.setMinutes(minute);
    newCalculatedDate.setSeconds(0);
    newCalculatedDate.setMilliseconds(0);

    if (newCalculatedDate.getTime() !== new Date(date).setSeconds(0, 0).valueOf()) {
      setDate(newCalculatedDate);
    }
  }, [hour, minute, meridiem, date, setDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? format(date, "h:mm a") : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex items-center space-x-2">
          <Input
            ref={hourRef}
            className="w-14"
            value={hour}
            onChange={handleHourChange}
            type="number"
            min={1}
            max={12}
          />
          <span className="text-center">:</span>
          <Input
            ref={minuteRef}
            className="w-14"
            value={minute.toString().padStart(2, "0")}
            onChange={handleMinuteChange}
            type="number"
            min={0}
            max={59}
          />
          <Select value={meridiem} onValueChange={handleMeridiemChange}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}
