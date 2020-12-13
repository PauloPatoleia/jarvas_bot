const calculateReminderOnDate = {
  calculateCurrentMonthNumberOfDays: (month, year) => {
    return new Date(year, month, 0).getDate();
  },

  addHoursToCurrentDate: (hours) => {
    let currentDate = new Date();
    return currentDate.getTime() + hours * 60 * 60 * 1000;
  },

  addDaysToCurrentDate: (days) => {
    let currentDate = new Date();
    return currentDate.getTime() + days * 24 * 60 * 60 * 1000;
  },

  addMonthsToCurrentDate: (days) => {
    let currentDate = new Date();
    return (
      currentDate.getTime() +
      this.calculateCurrentMonthNumberOfDays(
        currentDate.getMonth,
        currentDate.getFullYear
      ) +
      24 * 60 * 60 * 1000
    );
  },
};

module.exports = calculateReminderOnDate;
