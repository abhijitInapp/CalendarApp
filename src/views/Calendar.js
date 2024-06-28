// src/Calendar.js
import React, { useState, useEffect } from 'react';
import AddEvent from './AddEvent';
import '../styles/Calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'Birthday',
    description: '',
    date: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleSaveEvent = () => {
    let updatedEvents;
    if (isEditing) {
      updatedEvents = [...events];
      updatedEvents[editingIndex] = newEvent;
      setIsEditing(false);
    } else {
      updatedEvents = [...events, newEvent];
    }
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setShowModal(false);
    setNewEvent({ name: '', type: 'Birthday', description: '', date: '' });
  };

  const addEvent = (day) => {
    setNewEvent({ ...newEvent, date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}` });
    setShowModal(true);
  };

  const editEvent = (index) => {
    const event = events[index];
    setNewEvent(event);
    setIsEditing(true);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((_, index) => index !== editingIndex);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setShowModal(false);
    setNewEvent({ name: '', type: 'Birthday', description: '', date: '' });
    setIsEditing(false);
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <th key={index} className="text-center">{day}</th>
    ));
  };

  const renderDaysInMonth = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const rows = [];
    let cells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(
        <td key={day} className="text-center" onClick={() => addEvent(day)}>
          {day}
        </td>
      );

      if ((day + firstDayIndex) % 7 === 0 || day === daysInMonth) {
        rows.push(<tr key={day}>{cells}</tr>);
        cells = [];
      }
    }

    return rows;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 border-right">
          <h2 className="mt-3">Calendar</h2>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-link" onClick={handlePrevMonth}>&lt;</button>
            <h4>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h4>
            <button className="btn btn-link" onClick={handleNextMonth}>&gt;</button>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                {renderDaysOfWeek()}
              </tr>
            </thead>
            <tbody>
              {renderDaysInMonth()}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h2 className="mt-3">Events</h2>
          <ul className="list-group">
            {events.map((event, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{event.date}: {event.name} ({event.type}) - {event.description}</span>
                <button className="btn btn-primary btn-sm" onClick={() => editEvent(index)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddEvent
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveEvent}
        newEvent={newEvent}
        handleInputChange={handleInputChange}
        handleDelete={handleDeleteEvent}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Calendar;
