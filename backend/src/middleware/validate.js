import mongoose from 'mongoose';

/**
 * validate.js — Request validation middleware.
 */

/**
 * Validates that a route parameter is a valid MongoDB ObjectId.
 * @param {string} paramName - The name of the route param to validate (default: 'id').
 */
export function validateObjectId(paramName = 'id') {
  return (req, res, next) => {
    const value = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(value)) {
      res.status(400);
      return next(new Error(`Invalid ${paramName}: "${value}" is not a valid ObjectId`));
    }
    next();
  };
}

/**
 * Validates that a group parameter is a valid group letter (A–L).
 */
export function validateGroup(req, res, next) {
  const { group } = req.params;
  const valid = /^[A-L]$/i.test(group);
  if (!valid) {
    res.status(400);
    return next(new Error(`Invalid group: "${group}". Must be A–L.`));
  }
  req.params.group = group.toUpperCase();
  next();
}

/**
 * Validates that a round parameter is a valid tournament round.
 */
const VALID_ROUNDS = [
  'group stage',
  'round of 32',
  'round of 16',
  'quarter final',
  'semi final',
  'third place',
  'final',
];

export function validateRound(req, res, next) {
  const { round } = req.params;
  const normalized = round.toLowerCase().replace(/-/g, ' ');
  const match = VALID_ROUNDS.find((r) => r === normalized);
  if (!match) {
    res.status(400);
    return next(
      new Error(`Invalid round: "${round}". Valid rounds: ${VALID_ROUNDS.join(', ')}`)
    );
  }
  /* Capitalize for DB query */
  req.params.round = match
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  next();
}
