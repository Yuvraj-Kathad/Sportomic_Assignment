const express = require('express');
const pool = require('../db');

const router = express.Router();

/* Active members */
router.get('/active-members', async (req, res) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM members WHERE status='Active'"
  );
  res.json(result.rows[0]);
});

/* Total revenue */
router.get('/revenue', async (req, res) => {
  const result = await pool.query(
    "SELECT SUM(amount) FROM transactions WHERE status='Success'"
  );
  res.json(result.rows[0]);
});

/* Revenue by venue */
router.get('/revenue-by-venue', async (req, res) => {
  const result = await pool.query(`
    SELECT v.name, SUM(t.amount) AS revenue
    FROM venues v
    JOIN bookings b ON v.venue_id = b.venue_id
    JOIN transactions t ON b.booking_id = t.booking_id
    WHERE t.status='Success'
    GROUP BY v.name
  `);
  res.json(result.rows);
});

/* Conversion rate */
router.get('/conversion-rate', async (req, res) => {
  const result = await pool.query(`
    SELECT ROUND(
      100.0 * COUNT(*) FILTER (WHERE converted_from_trial=true)
      / NULLIF(COUNT(*) FILTER (WHERE is_trial_user=true),0),2
    ) AS conversion_rate
    FROM members
  `);
  res.json(result.rows[0]);
});

module.exports = router;
