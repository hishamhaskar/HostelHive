const db = require("../config/db"); // Import the promise-enabled DB connection

// Handle adding a new event
const addEvent = async (req, res) => {
  const { event_name, description, form_link, event_date } = req.body;

  if (!event_name || !form_link || !event_date) {
    return res.status(400).json({ message: "Event name, form link, and event date are required" });
  }

  try {
    // Insert the event into the database
    const [result] = await db.query(
      "INSERT INTO events (event_name, description, form_link, event_date) VALUES (?, ?, ?, ?)",
      [event_name, description || null, form_link, event_date]
    );

    res.status(201).json({ message: "Event added successfully!", id: result.insertId });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Failed to add event." });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const [events] = await db.query("SELECT * FROM events ORDER BY event_date DESC");
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events." });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  try {
    const [result] = await db.query("DELETE FROM events WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event." });
  }
};

module.exports = { addEvent, getEvents, deleteEvent };