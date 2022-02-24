class XeDate extends Date {

  /**
   * @description method to get days name
   * @param {boolean} long - if true uses full day name (e.g. Tuesday) else short name (e.g. Tue)
   * @returns {string[]} array of days
   */
  static getDays(long = false) {
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
  static getMonths(long = false) {
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
   * @returns {string|number}
   */
  day(name = false, long = false) {
    if (name) {
      return XeDate.getDays(long)[this.getDay()]
    } else {
      return this.getDay()
    }
  }

  /**
   * @description gets month of a date
   * @param {boolean} name - whether to return month name
   * @param {boolean} long - whether to return a long or short month name
   * @returns {string|number}
   */
  month(name = false, long = false) {
    if (name) {
      return XeDate.getMonths(long)[this.getMonth()]
    } else {
      return this.getMonth() + 1
    }
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
      return `${day && this.day(name, long) && ' - '}${this.getDate()}${sep}${this.month(name, long)}${sep}${this.getFullYear()}`
    } else {
      return `${day && this.day() && ' - '}${this.getDate()}${sep}${this.month()}${sep}${this.getFullYear()}`
    }
  }
}