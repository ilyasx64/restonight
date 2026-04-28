import { describe, it, expect } from 'vitest';
import { computeOpenStatus, nowInParis, type Hours } from './hours';

const WEEKDAY_NIGHT: Hours = {
  schedule: {
    lundi:    { ferme: false, ouverture: '18:00', fermeture: '02:00' },
    mardi:    { ferme: false, ouverture: '18:00', fermeture: '02:00' },
    mercredi: { ferme: false, ouverture: '18:00', fermeture: '02:00' },
    jeudi:    { ferme: false, ouverture: '18:00', fermeture: '02:00' },
    vendredi: { ferme: false, ouverture: '18:00', fermeture: '02:00' },
    samedi:   { ferme: false, ouverture: '18:00', fermeture: '02:00' },
    dimanche: { ferme: false, ouverture: '18:00', fermeture: '02:00' },
  },
  fermetures_exceptionnelles: [],
};

// Helper: build a Date for a given French weekday at HH:MM (UTC).
// Reference week: 2026-04-27 is a Monday.
const dateAt = (dayOffset: number, hh: number, mm: number) => {
  const d = new Date(Date.UTC(2026, 3, 27 + dayOffset, hh, mm, 0));
  return d;
};

describe('computeOpenStatus', () => {
  it('Tuesday 19:00 with 18:00→02:00 schedule is open', () => {
    const result = computeOpenStatus(WEEKDAY_NIGHT, dateAt(1, 19, 0));
    expect(result.status).toBe('open');
  });

  it('Tuesday 01:30 (tail of Monday 18:00→02:00) is open', () => {
    const result = computeOpenStatus(WEEKDAY_NIGHT, dateAt(1, 1, 30));
    expect(result.status).toBe('open');
  });

  it('Tuesday 03:00 (after fermeture 02:00) is closed', () => {
    const result = computeOpenStatus(WEEKDAY_NIGHT, dateAt(1, 3, 0));
    expect(result.status).toBe('closed');
    if (result.status === 'closed' && 'opensAt' in result) {
      expect(result.opensAt).toBe('18:00');
      expect(result.openDay).toBe('mardi');
    } else {
      throw new Error('expected closed with opensAt');
    }
  });

  it('day with ferme=true is closed and proposes next opening', () => {
    const hours: Hours = {
      ...WEEKDAY_NIGHT,
      schedule: {
        ...WEEKDAY_NIGHT.schedule,
        mardi: { ferme: true, ouverture: '00:00', fermeture: '00:00' },
      },
    };
    const result = computeOpenStatus(hours, dateAt(1, 20, 0));
    expect(result.status).toBe('closed');
    if (result.status === 'closed' && 'opensAt' in result) {
      expect(result.opensAt).toBe('18:00');
      expect(result.openDay).toBe('mercredi');
    } else {
      throw new Error('expected closed with opensAt');
    }
  });

  it('exceptional closure on current date returns reason exceptional', () => {
    const hours: Hours = {
      ...WEEKDAY_NIGHT,
      fermetures_exceptionnelles: [{ date: '2026-04-28', raison: 'Privatisation' }],
    };
    const result = computeOpenStatus(hours, dateAt(1, 20, 0));
    expect(result.status).toBe('closed');
    if (result.status === 'closed' && 'reason' in result && result.reason === 'exceptional') {
      expect(result.details).toBe('Privatisation');
    } else {
      throw new Error('expected exceptional closure');
    }
  });

  it('all days closed returns closed with no opensAt', () => {
    const hours: Hours = {
      schedule: {
        lundi:    { ferme: true, ouverture: '00:00', fermeture: '00:00' },
        mardi:    { ferme: true, ouverture: '00:00', fermeture: '00:00' },
        mercredi: { ferme: true, ouverture: '00:00', fermeture: '00:00' },
        jeudi:    { ferme: true, ouverture: '00:00', fermeture: '00:00' },
        vendredi: { ferme: true, ouverture: '00:00', fermeture: '00:00' },
        samedi:   { ferme: true, ouverture: '00:00', fermeture: '00:00' },
        dimanche: { ferme: true, ouverture: '00:00', fermeture: '00:00' },
      },
      fermetures_exceptionnelles: [],
    };
    const result = computeOpenStatus(hours, dateAt(1, 20, 0));
    expect(result.status).toBe('closed');
    expect(result).not.toHaveProperty('opensAt');
    expect(result).not.toHaveProperty('reason');
  });

  it('exact opening time 18:00 is open', () => {
    const result = computeOpenStatus(WEEKDAY_NIGHT, dateAt(1, 18, 0));
    expect(result.status).toBe('open');
    if (result.status === 'open') {
      expect(result.closesAt).toBe('02:00');
    }
  });

  it('exact closing time 02:00 is closed', () => {
    const result = computeOpenStatus(WEEKDAY_NIGHT, dateAt(1, 2, 0));
    expect(result.status).toBe('closed');
    if (result.status === 'closed' && 'opensAt' in result) {
      expect(result.opensAt).toBe('18:00');
      expect(result.openDay).toBe('mardi');
    } else {
      throw new Error('expected closed with opensAt');
    }
  });
});

describe('nowInParis', () => {
  it('returns a Date whose UTC hours match Paris local hours', () => {
    const before = Date.now();
    const result = nowInParis();
    const after = Date.now();

    // The result's UTC hour should equal the actual current Paris local hour.
    const parisHour = parseInt(
      new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        hour12: false,
      }),
      10,
    );
    // Note: the parsed value is "00".."23" — handle "24" if it appears as midnight.
    expect(result.getUTCHours()).toBe(parisHour % 24);

    // Result should be near "now" (within ~10s of when the call started/ended)
    // shifted by the Paris UTC offset, so we can't compare absolute time directly.
    // We just assert the call returned a valid Date.
    expect(result.getTime()).toBeGreaterThan(0);
    expect(after - before).toBeLessThan(10000);
  });
});
