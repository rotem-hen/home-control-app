import _ from 'lodash';

class DateConversion {
  /* From formatted to date object */
  UtcHrtoCurrent = (hr) => {
    const today = new Date();
    return (parseInt(hr, 10) - parseInt((today.getTimezoneOffset() / 60), 10)) % 24;
  }

  numberStringToDays = (numStr) => {
    const numArr = numStr.split(',');
    return numArr.map(num => parseInt(num, 10));
  }

  cronFormatToDateObj = (cron) => {
    const today = new Date();
    const [minutes, hours] = cron.split(' ');
    const hr = this.UtcHrtoCurrent(hours);
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hr,
      minutes
    );
  }

  cronFormatToDays = cron => (_.indexOf(cron, '*') < 0 ?
    [] :
    this.numberStringToDays(cron.split(' ')[4]));

  isoFormatToDateObj = iso => new Date(iso);

  processDateFormat = (dateFormat) => {
    if (_.indexOf(dateFormat, '*') > -1) {
      return this.cronFormatToDateObj(dateFormat);
    }
    return this.isoFormatToDateObj(dateFormat);
  }

  /* From date object to formatted */
  pad = min => ((min < 10) ? `0${min}` : min);

  daysToNumberString = days => days.reduce((a, b) => `${a},${b}`);

  dateObjToCronFormat = (date, days) => `${this.pad(date.getMinutes())} ${date.getUTCHours()} * * ${this.daysToNumberString(days)}`;

  dateObjToIsoFormat = date => date.toISOString();

  processDateObj = (repeat, date, days) => {
    if (repeat) {
      return this.dateObjToCronFormat(date, days);
    }
    return this.dateObjToIsoFormat(date);
  }
}

export default DateConversion;
