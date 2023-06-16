/*
  events objext structure example
  id is used only when user is logged in and represents event id in database
  if user is not logged in id is undefined

  {
    2023: {
      05: {
        15: {
          id: 50,
          description: "important event",
        },
        20: {
          id: 55,
          description: "birthday of my friend",
        }
      },

      12: {
        25: {
          id: 28,
          description: "christmas"
        }
      }
    },
    2024: {
      01: {
        01: {
          id: 29,
          description: "new year's eve"
        }
      }
    }
  }
*/


export function addEvent(eventsObj, date, new_event, id) {  // function used for both logged in and non-logged in users
  let new_events = {
    ...eventsObj,
    [date.year]: {
      ...eventsObj[date.year],
      [date.month] : {
        ...eventsObj[date.year]?.[date.month],
        [date.day]:  eventsObj[date.year]?.[date.month]?.[date.day] ? // if already exist array of events in date.day
            [...eventsObj[date.year]?.[date.month]?.[date.day], {
              id:id,
              description: new_event
            }] : // else create new one
            [{
              id: id,
              description: new_event
            }]
      }
    }
  }
  return new_events
} 


export function editEvent(eventsObj, prev_date, new_date, new_event, index) {  // function used only when user is not logged in
  let new_events = {...eventsObj}  // copy objects with ... tells react that this is new object and should be re-render
  if(prev_date.toISODate() === new_date.toISODate()) {  // if same date modify only the event text
    new_events[new_date.year][new_date.month][new_date.day][index] = {
      id: id,
      description: new_event
    }
  }
  else {  // else remove the event from prev date and add to the new date
  
    new_events = deleteEvent(new_events, prev_date, index)
    new_events = addEvent(new_events, new_date, new_event)
  }

  return new_events
}


export function deleteEvent(eventsObj, date, index) {   // function used only when user is not logged in

  /* the code below removes from the previous state, 
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

  /* the code below removes the day key if the array is empty (there are no events on that day), 
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




