import React, { useState } from 'react';
import { addMonths, format, isSameDay, isWithinInterval, startOfMonth, 
  endOfMonth, eachDayOfInterval, isBefore, isToday, compareAsc,
  addDays, subDays, getDay, startOfWeek, endOfWeek, getMonth } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface CustomDateRangePickerProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  onChange: (range: { from?: Date, to?: Date }) => void;
  className?: string;
  numberOfMonths?: number;
  showPrices?: boolean;
}

// Price configuration per night based on seasons
const getPriceForDate = (date: Date): number => {
  const month = getMonth(date);
  
  // June
  if (month === 5) return 180;
  // July and August - peak season
  if (month === 6 || month === 7) return 200; 
  // April and May - early season
  if (month === 3 || month === 4) return 170;
  // September - late summer
  if (month === 8) return 180;
  // Rest of the year - off-season
  return 150;
};

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  initialStartDate = null,
  initialEndDate = null,
  isDateDisabled = () => false,
  onChange,
  className,
  numberOfMonths = 2,
  showPrices = false
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(initialStartDate || new Date());
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: initialStartDate,
    endDate: initialEndDate
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Generate array of all days visible in the month view, including days from previous/next months
  const generateCalendarDays = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    return eachDayOfInterval({ start: startDate, end: endDate }).map(date => ({
      date,
      isCurrentMonth: date.getMonth() === month.getMonth(),
      price: getPriceForDate(date)
    }));
  };

  // Navigate to previous/next month
  const prevMonth = () => setCurrentMonth(prev => addMonths(prev, -1));
  const nextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  // Check if date is in the selected range
  const isInRange = (date: Date) => {
    if (!dateRange.startDate) return false;
    if (!dateRange.endDate && hoverDate && dateRange.startDate) {
      return isWithinInterval(date, {
        start: new Date(Math.min(dateRange.startDate.getTime(), hoverDate.getTime())),
        end: new Date(Math.max(dateRange.startDate.getTime(), hoverDate.getTime()))
      });
    }
    if (dateRange.startDate && dateRange.endDate) {
      return isWithinInterval(date, {
        start: dateRange.startDate,
        end: dateRange.endDate
      });
    }
    return false;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!dateRange.startDate || dateRange.endDate) {
      // Start a new selection
      const newRange = {
        startDate: date,
        endDate: null
      };
      setDateRange(newRange);
      onChange({ from: date, to: undefined });
    } else {
      // Complete the selection
      if (isBefore(date, dateRange.startDate)) {
        // If clicked date is before start date, swap them
        const newRange = {
          startDate: date,
          endDate: dateRange.startDate
        };
        setDateRange(newRange);
        onChange({ from: date, to: dateRange.startDate });
      } else {
        // Normal case - end date is after start date
        const newRange = {
          startDate: dateRange.startDate,
          endDate: date
        };
        setDateRange(newRange);
        onChange({ from: dateRange.startDate, to: date });
      }
    }
  };

  // Handle mouse hover to show date range preview
  const handleDateHover = (date: Date) => {
    if (!dateRange.startDate || dateRange.endDate || isDateDisabled(date)) return;
    setHoverDate(date);
  };

  // Generate all months that we want to display
  const monthsToDisplay = Array.from({ length: numberOfMonths }, (_, idx) => {
    return addMonths(currentMonth, idx);
  });

  return (
    <div className={cn("custom-date-range-picker", className)}>
      <div className="flex justify-between items-center mb-4">
        <button 
          type="button"
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="font-medium">
          {format(currentMonth, 'MMMM yyyy')}
          {numberOfMonths > 1 && (
            <> - {format(addMonths(currentMonth, numberOfMonths-1), 'MMMM yyyy')}</>
          )}
        </div>
        
        <button 
          type="button"
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {monthsToDisplay.map((month, monthIdx) => {
          const calendarDays = generateCalendarDays(month);
          
          return (
            <div key={monthIdx} className="month">
              <div className="grid grid-cols-7 mb-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {/* All days including those from previous/next months */}
                {calendarDays.map((dayInfo, i) => {
                  const { date, isCurrentMonth, price } = dayInfo;
                  const isDisabled = isDateDisabled(date);
                  const isSelected = (dateRange.startDate && isSameDay(date, dateRange.startDate)) || 
                                    (dateRange.endDate && isSameDay(date, dateRange.endDate));
                  const isRangeStart = dateRange.startDate && isSameDay(date, dateRange.startDate);
                  const isRangeEnd = dateRange.endDate && isSameDay(date, dateRange.endDate);
                  const isInDateRange = isInRange(date);
                  
                  return (
                    <div 
                      key={i} 
                      className={cn(
                        "h-10 w-full flex flex-col items-center justify-center rounded-md text-sm transition-all",
                        !isCurrentMonth && "opacity-40",
                        isToday(date) && !isSelected && "border-2 border-[var(--sea-blue)]",
                        isDisabled ? "bg-red-100 text-red-700 line-through cursor-not-allowed" : (
                          isSelected ? "bg-[var(--terracotta)] text-white font-bold hover:bg-[var(--terracotta)]/90 cursor-pointer" : (
                            isInDateRange ? "border border-[var(--terracotta)] cursor-pointer" : (
                              "hover:bg-gray-100 cursor-pointer"
                            )
                          )
                        ),
                        isBefore(date, new Date()) && !isToday(date) && "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                      onClick={() => !isDisabled && !isBefore(date, new Date()) && handleDateClick(date)}
                      onMouseEnter={() => handleDateHover(date)}
                    >
                      {showPrices && isCurrentMonth && !isBefore(date, new Date()) && !isDisabled && (
                        <div className="text-[8px] font-medium text-gray-600 -mt-1 mb-0.5">
                          €{price}
                        </div>
                      )}
                      {format(date, "d")}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex gap-4 text-xs text-gray-600 mt-4">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-100"></span>
          <span>Booked</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[var(--terracotta)]"></span>
          <span>Selected</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-white border border-[var(--terracotta)]"></span>
          <span>In Range</span>
        </div>
      </div>
    </div>
  );
};

export default CustomDateRangePicker;