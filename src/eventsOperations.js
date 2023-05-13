export function deleteEvent(eventsObj, date, index) {

  /* the code below removes the from the previous state, 
    the index element from the array value of the day key */
  let new_events = {
    ...eventsObj,
    [date.year]: {
      ...eventsObj[date.year],
      [date.month] : {
        ...eventsObj[date.year]?.[date.month],
        [date.day]:  [
          ...eventsObj[date.year]?.[date.month]?.[date.day].slice(0, index),
          ...eventsObj[date.year]?.[date.month]?.[date.day].slice(index + 1),
        ]
      }
    }
  }

  /* the code below removes the day key if the array is empty, 
     the month key if the value is empty (there are no days)
     and the year key if the value is empty (there are no months) */
   Object.entries(new_events).forEach(([year, months]) => {
    Object.entries(months).forEach(([month, days]) => {
      Object.entries(days).forEach(([day, eventsList]) => {
        if (eventsList.length === 0) {
          delete new_events[year][month][day];
        }
      });
      if (Object.keys(days).length === 0) {
        delete new_events[year][month];
      }
    });
    if (Object.keys(months).length === 0) {
      delete new_events[year];
    }
  });

  return new_events
}


export function addEvent(eventsObj, date, new_event) {
  let new_events = {
    ...eventsObj,
    [date.year]: {
      ...eventsObj[date.year],
      [date.month] : {
        ...eventsObj[date.year]?.[date.month],
        [date.day]:  eventsObj[date.year]?.[date.month]?.[date.day] ?
            [...eventsObj[date.year]?.[date.month]?.[date.day], new_event] : 
            [new_event]
      }
    }
  }
  return new_events
} 


export function editEvent(eventsObj, prev_date, new_date, new_event, index) {
  let new_events = {...eventsObj}  // copy objects with ... tells react that this is different object from the previous and should be re-render
  if(prev_date.toISODate() === new_date.toISODate()) {  // if same date modify only the event text
    new_events[new_date.year][new_date.month][new_date.day][index] = new_event
  }
  else {  // else remove the event from prev date and add to the new date
  
    new_events = deleteEvent(new_events, prev_date, index)
    new_events = addEvent(new_events, new_date, new_event)
  }

  return new_events
}