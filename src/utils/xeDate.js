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

}