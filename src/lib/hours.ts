export type Day =
  | 'lundi' | 'mardi' | 'mercredi' | 'jeudi'
  | 'vendredi' | 'samedi' | 'dimanche';

export interface DaySchedule {
  ferme: boolean;
  ouverture: string;
  fermeture: string;
}

export interface ExceptionalClosure {
  date: string;
  raison: string;
}

export interface Hours {
  schedule: Record<Day, DaySchedule>;
  fermetures_exceptionnelles: ExceptionalClosure[];
}

export type OpenStatus =
  | { status: 'open'; closesAt: string }
  | { status: 'closed'; reason: 'exceptional'; details: string }
  | { status: 'closed'; opensAt?: string; openDay?: Day };

const DAYS: Day[] = [
  'dimanche', 'lundi', 'mardi', 'mercredi',
  'jeudi', 'vendredi', 'samedi',
];

function dayFromDate(d: Date): Day {
  return DAYS[d.getUTCDay()]!;
}

function minutesOf(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h! * 60 + m!;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function previousDay(day: Day): Day {
  const idx = DAYS.indexOf(day);
  return DAYS[(idx + 6) % 7]!;
}

export function computeOpenStatus(hours: Hours, now: Date): OpenStatus {
  // Rule 1: exceptional closure today
  const today = isoDate(now);
  const exceptional = hours.fermetures_exceptionnelles.find((e) => e.date === today);
  if (exceptional) {
    return { status: 'closed', reason: 'exceptional', details: exceptional.raison };
  }

  const todayDay = dayFromDate(now);
  const minutesNow = now.getUTCHours() * 60 + now.getUTCMinutes();
  const todaySched = hours.schedule[todayDay];

  // Window B: tail of yesterday's overnight slot
  const yesterdayDay = previousDay(todayDay);
  const yesterdaySched = hours.schedule[yesterdayDay];
  if (!yesterdaySched.ferme) {
    const yOpen = minutesOf(yesterdaySched.ouverture);
    const yClose = minutesOf(yesterdaySched.fermeture);
    const yesterdayCrossesMidnight = yClose < yOpen || yClose === yOpen;
    if (yesterdayCrossesMidnight && yClose > 0 && minutesNow < yClose) {
      return { status: 'open', closesAt: yesterdaySched.fermeture };
    }
  }

  // Window A: today's slot (possibly crossing midnight)
  if (!todaySched.ferme) {
    const open = minutesOf(todaySched.ouverture);
    const close = minutesOf(todaySched.fermeture);
    const crossesMidnight = close < open || close === open;
    if (crossesMidnight) {
      // Open if now >= open today
      if (minutesNow >= open) {
        return { status: 'open', closesAt: todaySched.fermeture };
      }
    } else {
      if (minutesNow >= open && minutesNow < close) {
        return { status: 'open', closesAt: todaySched.fermeture };
      }
    }
  }

  // Closed: find next opening within the next 7 days
  for (let offset = 0; offset < 7; offset++) {
    const candidateDate = new Date(now.getTime() + offset * 86400000);
    const candidateDay = dayFromDate(candidateDate);
    const candidateIso = isoDate(candidateDate);
    if (hours.fermetures_exceptionnelles.some((e) => e.date === candidateIso)) continue;
    const sched = hours.schedule[candidateDay];
    if (sched.ferme) continue;
    const candidateOpen = minutesOf(sched.ouverture);
    if (offset === 0 && minutesNow >= candidateOpen) continue;
    return { status: 'closed', opensAt: sched.ouverture, openDay: candidateDay };
  }

  return { status: 'closed' };
}

/**
 * Return a Date whose UTC representation reflects current Paris wall-clock time.
 *
 * Schedule times are stored as Paris local clock values ("18:00" means 18:00 Paris).
 * computeOpenStatus extracts hours via getUTC* methods, so callers must pass a Date
 * that has been shifted such that UTC == Paris local. Use this helper at every
 * call site in browser/SSR code instead of `new Date()`.
 */
export function nowInParis(): Date {
  const local = new Date();
  // Use formatToParts to reliably extract Paris wall-clock components
  // (toLocaleString → new Date() round-trip is not reliable across all runtimes).
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(local).map((p) => [p.type, p.value]),
  ) as Record<string, string>;
  // Reconstruct a Date whose UTC representation equals Paris wall-clock time,
  // so that getUTC* methods return the correct Paris local values.
  return new Date(
    Date.UTC(
      parseInt(parts['year']!),
      parseInt(parts['month']!) - 1,
      parseInt(parts['day']!),
      parseInt(parts['hour']!) % 24,
      parseInt(parts['minute']!),
      parseInt(parts['second']!),
    ),
  );
}
