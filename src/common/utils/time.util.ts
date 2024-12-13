export const convertToSeconds = (time: string): number => {
  const units: { [key: string]: number } = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };

  const match = time.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error('Invalid time format');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return value * units[unit];
};
