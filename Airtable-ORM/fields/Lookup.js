const Field = require('./Field');
const LinkToAnotherRecord = require ('./LinkToAnotherRecord');

/* Lookup
*  Lookup a field on linked records.
*  Parameters:
*    name: <String>
*    value: <String>
*    config: {
*      table: <String>
*        The table this field will be linked to.
*      field: <String>
*        The name of the field on the table this field will be linked to.
*    }
*/
class Lookup extends Field {
  constructor(name, value, config = {}) {
    if (typeof config.table !== 'string' || typeof config.field !== 'string') {
      const error = new Error(
        `'table' and 'field' for Field '${name}' must be defined in the config. ` +
        `Received: ${{ table: config.table, field: config.field }}`
      );
      error.name = 'UninitializedFieldError';
      throw error;
    }
    super(name, value, config);
    this.type = 'Lookup';
  }

  /* get _changed
   * Return:
   *   This will always return false.
   *   This function is used by the API.
   */
  get _changed() {
    return false;
  }

  /* get isLinked
   * Return:
   *   A Boolean representing whether or not the <field>.link is a LinkToAnotherRecord.
   */
  get isLinked() {
    return this.link instanceof LinkToAnotherRecord;
  }

  /* get isLoaded
   * Return:
   *   A Boolean representing whether or not the linked Records have been initialized.
   *   False indicates that the Records are just Record IDs or that this field has not been
   *   properly linked.
   */
  get isLoaded() {
    if (!this.isLinked)
      return false;
    return this.link.isLoaded;
  }

  /* get link
   * Return:
   *   The Field specified in the config or undefined if the field specified in the config is not
   *   a LinkToAnotherRecord.
   */
  get link() {
    if (typeof this.config.table !== 'string' || typeof this.config.field !== 'string')
      return this._error("Link cannot be retreived when 'table' or 'field' are not defined in the config.", { table: this.config.table, field: this.config.field })
    if (!this._isRecord(this.record))
      return;
    const entries = Object.entries(this.record.fields);
    for (let i = 0; i < entries.length; i++) {
      const [key, field] = entries[i];
      if (field instanceof LinkToAnotherRecord) {
        if (field.config.table === this.config.table)
          return field;
      }
    }
  }

  /* get value
   * Return:
   *   The value of the linked Record or the value given by Airtable.com in the case that this isn't loaded.
   *   An Array of values of linked Records or an Array of values given by Airtable.com in the case that this isn't loaded.
   */
  get value() {
    if (!this.isLinked) {
      if (this._value === undefined || this._value === null)
        return null;
      return this._deepFreezeValue(this._value);
    }
    if (this.link.isMulti) {
      for (let i = 0; i < this.link.value.length; i++) {
        if (!this._isRecord(this.link.value[i]))
          return this._deepFreezeValue(this._value || []);
      }
      return this._deepFreezeValue(this.link.value.reduce((array, record) => {
        const value = record.get(this.config.field);
        if (value === null || value === undefined || value === '')
          return array;
        if (Array.isArray(value))
          return array.concat(value);
        array.push(value);
        return array;
      }, []));
    }
    if (this._isRecord(this.link.value)) {
      const value = this.link.value.get(this.config.field);
      return this._deepFreezeValue(value === 0 || value === false ? value : value || null);
    }
    return this._deepFreezeValue(this._value === 0 || this._value === false ? this._value : this._value || null);
  }

  /* set _changed
   * This function cannot be used.
   */
  set _changed(_) {
    return;
  }

  /* set isLinked
   * This function cannot be used.
   */
  set isLinked(_) {
    return;
  }

  /* set isLoaded
   * This function cannot be used.
   */
  set isLoaded(_) {
    return;
  }

  /* set link
   * This function cannot be used.
   */
  set link(_) {
    return;
  }

  /* set value
   * Parameters:
   *   value:
   *     The value of the linked record(s)
   * This is used when the field is initialized and should only be used if you don't setupLinks
   * in the query.
   */
  set value(value = null) {
    if (value === null)
      return this._value = null;
    this._value = this._deepFreezeValue(value);
  }
}

module.exports = Lookup;
