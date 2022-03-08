import React from 'react';

import { startOfWeek, addDays, format, set, eachHourOfInterval } from 'date-fns';

const now = new Date()
const firstDayOfThisWeek: Date = startOfWeek(now);
const days = [
  firstDayOfThisWeek, // Sunday
  addDays(firstDayOfThisWeek, 1), // Monday
  addDays(firstDayOfThisWeek, 2), // Tuesday
  addDays(firstDayOfThisWeek, 3), // Wednesday
  addDays(firstDayOfThisWeek, 4), // Thursday
  addDays(firstDayOfThisWeek, 5), // Friday
  addDays(firstDayOfThisWeek, 6), // Saturday
]

const DAY_START = 9 // 9am
const DAY_END = 0 // 12am 

// getHoursOfDay returns the hours between dayStart and dayEnd for date.
// If dayEnd is less than dayStart, 
// dayStart/dayEnd are in 24-hour format. I.e. 9 -> 9 AM, 23 -> 11 PM, 0 -> 12 AM.
const getHoursOfDay = (date: Date, dayStart: number, dayEnd: number): Date[] => {
  const start = set(date, { hours: dayStart, minutes: 0, seconds: 0, milliseconds: 0 });
  let end = set(date, { hours: dayEnd, minutes: 0, seconds: 0, milliseconds: 0 });
  if (dayEnd <= dayStart) {
    end = addDays(end, 1);
  }
  return eachHourOfInterval({
    start,
    end,
  })
}

function App() {
  return (
    <div className='grid grid-cols-7 gap-0 h-screen'>
      {days.map(day => <div className='h-full border border-1'>
        <div className='border-b text-center'>
          <h3>{format(day, 'E')}</h3>
          <h2 className='text-lg'>{format(day, 'M/d')}</h2>
        </div>
        <div className='h-full border-collapse flex flex-col'>
          {getHoursOfDay(day, DAY_START, DAY_END).map(hour => <div className='border-b flex-1 basis-1' />)}
        </div>
      </div>
      )}

    </div>
  );
}

export default App;
