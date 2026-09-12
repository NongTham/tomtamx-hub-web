export function validateTelemetry(data) {
  for (const key of ['liveNow','totalRuns','totalPlayers','avgSessionMinutes']) if (data[key] !== null && (typeof data[key] !== 'number' || !Number.isFinite(data[key]) || data[key] < 0)) throw new Error('Invalid telemetry');
  if (!data.updatedAt || !Number.isFinite(Date.parse(data.updatedAt))) throw new Error('Invalid timestamp');
  for (const key of ['history','executors','scripts']) if (!Array.isArray(data[key])) throw new Error('Invalid telemetry list');
  if (data.history.some(p=>typeof p.label!=='string'||!Number.isFinite(p.avgSessionMinutes)||p.avgSessionMinutes<0)) throw new Error('Invalid history');
  if (data.executors.some(p=>typeof p.name!=='string'||!Number.isFinite(p.count)||p.count<0)) throw new Error('Invalid executors');
  if (data.scripts.some(p=>typeof p.id!=='string'||!['operational','degraded','offline','unknown'].includes(p.status))) throw new Error('Invalid script status');
  return data;
}
