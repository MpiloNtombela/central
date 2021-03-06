class XeDate extends Date {

  /**
   * @description creates a new date obj without headache of month and indexes
   * @param {number} year - year number
   * @param {number} month - month number (1-12)
   * @param {number} date - date number
   * @returns {XeDate} date - XeDate obj
   */
  static create(year, month, date = 1) {
    return new XeDate(year, month - 1, date)
  }

  /**
   * @description method to get days name
   * @param {boolean} long - if true uses full day name (e.g. Tuesday) else short name (e.g. Tue)
   * @returns {string[]} array of days
   */
  static getDaysByNames(long = false) {
    if (long) {
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    } else {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  }

  /**
   * @description method to get months name
   * @param {boolean} long - if true uses full month name (e.g. October) else short name (e.g. Oct)
   * @returns {string[]} array of months
   */
  static getMonthsByNames(long = false) {
    if (long) {
      return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }

  /**
   * @description gets day of a date
   * @param {boolean} name - whether to return day name
   * @param {boolean} long - whether to return a long or short day name
   * @returns {string|number} - a day by name or number (0-6) where 0 is Sunday
   */
  day(name = false, long = false) {
    if (name) {
      return XeDate.getDaysByNames(long)[this.getDay()]
    } else {
      return this.getDay()
    }
  }

  /**
   * @description gets month of a date
   * @param {boolean} name - whether to return month name
   * @param {boolean} long - whether to return a long or short month name
   * @returns {string|number} - a month by name or number (1-12)
   */
  month(name = false, long = false) {
    if (name) {
      return XeDate.getMonthsByNames(long)[this.getMonth()]
    } else {
      return this.getMonth() + 1
    }
  }

  /**
   * @description util func to add date, month or year
   * @param {string} type - type to add (can be date, month, year)
   * @param {number} num - a positive number to subtract
   * @returns {XeDate} date -  new XeDate object
   */
  add(type, num) {
    switch (type) {
      case ('date' || 'd'):
        return new XeDate(this.setDate(this.getDate() + num))
      case ('month' || 'm'):
        return new XeDate(this.setMonth(this.getMonth() + num))
      case ("year" || 'y'):
        return new XeDate(this.setFullYear(this.getFullYear() + num))
      default:
        return new XeDate()
    }
  }

  /**
   * @description util func to subtract date, month or year
   * @param {string} type - type to subtract (can be date, month, year)
   * @param {number} num - a positive number to subtract
   * @returns {XeDate} date -  new XeDate object
   */
  sub(type, num) {
    switch (type) {
      case ('date' || 'd'):
        return new XeDate(this.setDate(this.getDate() - num))
      case ('month' || 'm'):
        return new XeDate(this.setMonth(this.getMonth() - num))
      case ("year" || 'y'):
        return new XeDate(this.setFullYear(this.getFullYear() - num))
      default:
        return new XeDate()
    }
  }


  /**
   * @description clones a XeDate obj
   * @returns {XeDate} - new cloned XeDate object
   */
  clone() {
    return XeDate.create(this.getFullYear(), this.month(), this.getDate())
  }

  /**
   * @description gets number of days in a month given year and month (static)
   * @param {number} year - year
   * @param {number} month - month (1-12)
   * @returns {number}
   */
  static getNumOfDays(year, month) {
    return new Date(year, month, 0).getDate()
  }

  /**
   * @returns {number} - number of days
   */
  numOfDays() {
    return new XeDate(this.getFullYear(), this.month(), 0).getDate()
  }

  /**
   * @returns {number} - the day the month start (0-6), where 0 is Sunday
   */
  getMonthStartDay() {
    return XeDate.create(this.getFullYear(), this.month(), 1).getDay()
  }

  /**
   * @returns {number} - day the month ends (0-6), where 0 is Sunday
   */
  getMonthEndDay() {
    let x = XeDate.create(this.getFullYear(), this.month(), 1).add('month', 1).day()
    return x === 0 ? 6 : x - 1
  }

  /**
   * @description checks if the given date is equal to current date
   * @param {XeDate} date
   * @returns {boolean} -
   */
  equal(date) {
    date = new XeDate(date)
    return this.getFullYear() === date.getFullYear() && this.month() === date.month() && this.getDate() === date.getDate()
  }

  /**
   * @description checks whether a year is a leap year
   * @returns {boolean}
   */
  isLeapYear() {
    let yr = this.getFullYear()
    return yr % 400 === 0 && yr % 100 === 0 ? true : yr % 4 === 0 && yr % 100 !== 0;
  }

  /**
   * @description a human friendly formatted date
   * @param {boolean} name - if true (day and month) will be in name format (e.g. Tue | Oct)
   * @param long - if true (day and month) will be in long name format (e.g. Tuesday | October)
   * @param {boolean} day - if true day in included in the date
   * @param {string} sep - separator to use for date
   * @returns {string}
   */
  toFormattedString({name = false, long = false, day = true, sep = ' '}) {
    if (name) {
      return `${day && this.day(name, long) + ' - '}${this.getDate()}${sep}${this.month(name, long)}${sep}${this.getFullYear()}`
    } else {
      return `${day && this.day(name, long) + ' - '}${this.getDate()}${sep}${this.month()}${sep}${this.getFullYear()}`
    }
  }
}

export default XeDate