const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Use your existing db connection
const { addEvent, getEvents, deleteEvent } = require("../controllers/eventsContoller");
// GET all events
router.get('/events', async (req, res) => {
  try {
    const [events] = await db.query('SELECT * FROM events ORDER BY event_date');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new event (admin only)
router.post('/admin/events', async (req, res) => {
  console.group("erwetrhj")
  try {
    const { event_name, description, form_link, date } = req.body;
    console.log("event name\n",event_name,"desc\n",description,"\nform",form_link,"\ndate",date)
    // Validate required fields
    if (!event_name || !description || !form_link || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const [result] = await db.query(
      'INSERT INTO events (event_name, description, form_link, event_date) VALUES (?, ?, ?, ?)',
      [event_name, description, form_link, date]
    );
    
    if (result.affectedRows) {
      // Fetch the newly created event to return it
      const [newEvent] = await db.query('SELECT * FROM events WHERE id = ?', [result.insertId]);
      res.status(201).json(newEvent[0]);
    } else {
      throw new Error('Failed to create event');
    }
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE event (admin only)
router.delete('/admin/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, check if the event exists
    const [existingEvent] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (existingEvent.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Delete the event
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
    
    if (result.affectedRows) {
      res.json({ 
        message: 'Event deleted successfully',
        deletedEvent: existingEvent[0]
      });
    } else {
      throw new Error('Failed to delete event');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [event] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (event.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;