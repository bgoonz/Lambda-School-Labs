const Field = require('./Field');

/* NumberField
 * A single line of text. You can optionally prefill each new cell with a default value.
 * Parameters:
 *   name: <String>
 *   value: <String>
 *     default: null
 *   [config: {
 *     format: <String> 'Integer'/'Decimal'
 *       default: 'Decimal'
 *       Setting format to anything other than 'Integer' or 'Decimal' will throw an error.
 *     allowNegative: <Boolean>
 *       default: false
 *       Setting allowNegative to anything other than true will result
 *       in allowNegative being set to false.
 *     precision: <Number> 1-8
 *       default: 1
 *       Precision must be an Integer greater than 0 and less than 9.
 *       Setting precision less than 0 will set it to 0.
 *       Setting the precision greater than 8 will set it to 8.
 *       A precision set to a float will be floored.
 *       A NaN precision will throw an error.
 *   }]
 * Strict:
 *   Throws an error if the value exceeds the precision. Otherwise it will floor
 *   the value at the specified precision level.
 */
class NumberField extends Field {
  constructor(name, value = null, config = {}) {
    if (config.format === null)
      config.format = 'Decimal';
    if (config.precision === undefined || config.precision === null)
      config.precision = 1;
    if (config.allowNegative !== true)
      config.allowNegative = false;

    if (isNaN(config.precision)) {
      super(name, value, config);
      return this._error('This Field had its precision set to something which was not a number.', config.precision, true);
    }

    config.precision = ~~config.precision;
    if (config.precision < 0)
      config.precision = 0;
    if (config.precision > 8)
      config.precision = 8;

    if (config.format !== 'Decimal' && config.format !== 'Integer') {
      super(name, value, config);
      return this._error('This field was set to an unknown format. Please reference the docs an set this field to a specified format.', this.config.format, true);
    }

    super(name, value, config);
    this.type = 'Number';
  }

  /* get value
   * Return:
   *   Returns a Number or null.
   */
  get value() {
    return this._value === undefined ? null : this._value;
  }

  /* set value
   * Parameters:
   *   value: <Number> <String>
   *     This will convert Strings to Numbers except for in strict.
   *     Floats will be floored if the config defines this as an Integer, except for in strict.
   *     Floats longer than the precision defined in the config will be floored
   *     at the correct precision level, except for in strict.
   */
  set value(value = null) {
    if (value === null)
      return this._value = null;
    if (isNaN(value))
      return this._error('value must be a number!', value);
    if (isNaN(this.config.precision))
      return this._error('This Field had its precision set to something which was not a number.', config.precision);
    value = Number(value);
    if (this.isStrict && (value !== this._cutNumber(value, this.config.precision)))
      return this._error(`This Field has a precision of '${this.config.precision}' which was exceeded.`, value);
    if (this.config.format === 'Integer')
      value = ~~value;
    else if (this.config.format === 'Decimal') {
      const newValue = this._cutNumber(value, this.config.precision);
      if (newValue === undefined) // error was thrown an ignored in _cutNumber
        return;
      value = newValue;
    }
    else
      return this._error('This field was set to an unknown format. Please reference the docs an set this field to a specified format.', this.config.format);
    if (this.config.allowNegative === false && value < 0)
      return this._error('The config for this field states that the value cannot be negative.', value);
    this._value = value;
  }

  /* _cutNumber(number, precision)
   * Parameters:
   *   number: <Number>
   *     Will convert a String to a Number.
   *   precision: <Integer>
   *     Will convert a String to a Number and will floor Floats.
   * Return:
   *   A Number that has been floored to the specified precision level.
   */
  _cutNumber(number, precision) {
    // toFixed rounds the number. _cutNumber will drop anything after the precision defined
    // in the field config.
    if (isNaN(number))
      return this._error('Expected number to be a Number!', number);
    if (isNaN(precision))
      return this._error('Expected precision to be a Number!', precision);
    number = Number(number);
    precision = ~~Number(precision);
    if (this.config.format === 'Integer' || precision <= 0)
      return ~~number;
    if (!(`${number}`.includes('.')))
      return number;
    const split = `${number}`.split('.');
    if (split.length === 2) {
      number = Number(`${split[0]}.${split[1].substring(0, precision)}`);
    }
    return number;
  }
}

module.exports = NumberField;
