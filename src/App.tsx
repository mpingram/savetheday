import React, { useState } from 'react';

import {
  startOfWeek,
  addDays,
  format,
  set,
  parse,
  eachHourOfInterval,
  isBefore,
  addMinutes,
  formatISO
} from 'date-fns';

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

const DAY_START = "9:00AM";
const DAY_END = "12:00AM";

// splitDayIntoSegments returns the 30-minute segments between dayStart and dayEnd for date.
// If dayEnd is less than dayStart, 
// dayStart/dayEnd are in H:MMa format. I.e. 9:00AM -> 9 AM
const splitDayIntoSegments = (date: Date, dayStart: string, dayEnd: string): Date[] => {
  const SEGMENT_LENGTH_MINS = 30;
  const TIME_FORMAT = "h:mma"; // e.g. 9:30AM
  const start = parse(dayStart, TIME_FORMAT, date)
  let end = parse(dayEnd, TIME_FORMAT, date)
  if (isBefore(end, start)) {
    end = addDays(end, 1);
  }
  let segments: Date[] = [];
  let cur: Date = start;
  while (isBefore(cur, end)) {
    segments.push(cur);
    cur = addMinutes(cur, SEGMENT_LENGTH_MINS);
  }
  return segments;
}

const Segment = ({ time, selected }) => {
  return (<div
    key={format(time, "dhmma")}
    className={`border-b flex-1 basis-1 ${selected ? 'bg-lime-300' : ''}`}
  />)
}

const Day = ({ day, start, end }) => {
  const segments = splitDayIntoSegments(day, start, end);

  let segmentsSelectedInitialState = {};
  segments.forEach(segment => segmentsSelectedInitialState[formatISO(segment)] = false)
  const [segmentsSelected, setSegmentsSelected] = useState(segmentsSelectedInitialState);

  return (<div className='h-full border-collapse flex flex-col'>
    {segments.map(segment => {
      return (
        <Segment key={formatISO(segment)} time={segment} selected={segmentsSelected[formatISO(segment)]} />
      )
    })}
  </div>);
}

function App() {
  return (
    <div className='grid grid-cols-7 gap-0 h-screen max-w-screen-sm'>
      {days.map(day => (
        <div key={format(day, "d")}
          className='h-full border border-1'
        >
          <div className='border-b text-center'>
            <h3>{format(day, 'E')}</h3>
            <h2 className='text-lg'>{format(day, 'M/d')}</h2>
          </div>
          <Day day={day} start={DAY_START} end={DAY_END} />
        </div>
      ))}

    </div>
  );
}

export default App;
