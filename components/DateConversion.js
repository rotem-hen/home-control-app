import _ from 'lodash';

class DateConversion {
  /* From formatted to date object */
  numberStringToDays = (numStr) => {
    const numArr = numStr.split(',');
    return numArr.map(num => parseInt(num, 10));
  }

  cronFormatToDateObj = (cron) => {
    const today = new Date();
    const cronElements = cron.split(' ');
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      cronElements[1],
      cronElements[0]
    );
  }

  cronFormatToDays = cron => (_.indexOf(cron, '*') < 0 ?
    [] :
    this.numberStringToDays(cron.split(' ')[4]));

  isoFormatToDateObj = (iso) => {
    const dateArr = iso.replace('T', '-').replace(':', '-').split('-');
    return new Date(
      dateArr[0],
      dateArr[1],
      dateArr[2],
      dateArr[3],
      dateArr[4]
    );
  }

  processDateFormat = (dateFormat) => {
    if (_.indexOf(dateFormat, '*') > -1) {
      return this.cronFormatToDateObj(dateFormat);
    }
    return this.isoFormatToDateObj(dateFormat);
  }

  /* From date object to formatted */
  daysToNumberString = days => days.reduce((a, b) => `${a},${b}`);

  dateObjToCronFormat = (date, days) => `${date.getMinutes()} ${date.getHours()} * * ${this.daysToNumberString(days)} *`;

  dateObjToIsoFormat = date => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;

  processDateObj = (repeat, date, days) => {
    if (repeat) {
      return this.dateObjToCronFormat(date, days);
    }
    return this.dateObjToIsoFormat(date);
  }
}

export default DateConversion;
