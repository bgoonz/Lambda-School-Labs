const axios = require('axios');
const Request = require('./Request');
const Record = require('./Record');
const RecordArray = require('./RecordArray');
const { LinkToAnotherRecord, Lookup, Rollup, UnknownField, Field } = require('./fields');

/* Table
 * Parameters:
 *   airtable: <Airtable>
 *     The Airtable Object that this Table belongs to.
 *   base: <String>
 *     The base ID that this Table belongs to.
 *   name: <String>
 *     The name of the Table as it is on Airtable.com.
 *   fields: <Object>
 *     A key-value Object of Field Definitions.
 */
class Table {
  constructor(airtable, base, name, fields = {}) {
    this._airtable = airtable;
    this.base = base;
    this.name = name;
    this.fields = fields;
  }

  /* get _airtable
   * Return:
   *   Returns the Airtable Object that this Table belongs to.
   */
  get _airtable() {
    return this._airtable_;
  }

  /* get _blankFields
   * Return:
   *   Returns a key-value Object of empty Fields.
   */
  get _blankFields() {
    if (typeof this.fields !== 'object' || this.fields === null)
      return {};
    const entries = Object.entries(this.fields);
    const blankFields = {};
    for (const [key, settings] of entries) {
      if (settings === undefined) {
        const error = new Error(
          `Improper Field Definition in Table '${this.name}'.\n` +
          `Received: ${settings}`
        );
        error.name = 'TableError';
        throw error;
      }
      if (typeof settings.name !== 'string') {
        const error = new Error(
          `Improper Field Definition in Table '${this.name}'.\n` +
          `Expected 'name' to be a string.\n` +
          `Received: ${settings}`
        );
        error.name = 'TableError';
        throw error;
      }
      const args = [settings.name, undefined, { ...settings }];
      const blankField = typeof settings.type !== 'function' ? new UnknownField(...args) : new settings.type(...args);
      blankFields[key] = blankField;
    }
    return blankFields;
  }

  /* get base
   * Return:
   *   Returns a String of the base ID that this Field belongs to.
   */
  get base() {
    return this._base;
  }

  /* get fields
   * Return:
   *   Returns a key-value object of Field Definitions.
   */
  get fields() {
    return this._fields;
  }

  /* get name
   * Return:
   *   Returns a String of the name of this Table as it is on Airtable.com.
   */
  get name() {
    return this._name;
  }

  /* set _airtable
   * Parameters:
   *   airtable: <Airtable>
   *     The Airtable Object that this Table belongs to.
   * This cannot be changed once it is set.
   */
  set _airtable(airtable) {
    if (this._airtable !== undefined)
      throw new Error('TableError: _airtable cannot be changed!');
    this._airtable_ = airtable;
  }

  /* set _defaultFields
   * This function cannot be used.
   */
  set _defaultFields(_) {
    return;
  }

  /* set base
   * Parameters:
   *   base: <String>
   *     The base ID that this Table belongs to.
   * This cannot be changed once it is set.
   */
  set base(base) {
    if (this._base !== undefined)
      throw new Error('TableError: base cannot be changed!');
    this._base = base;
  }

  /* set fields
   * Parameters:
   *   fields: <Object>
   *     A key-value Object of Field Definitions.
   * This cannot be changed once set.
   */
  set fields(fields) {
    if (this.fields !== undefined)
      throw new Error('TableError: fields cannot be changed!');
    if (typeof fields !== 'object' || Array.isArray(fields))
      throw new Error('Fields must be a key-value Object: Received a(n) ' + Array.isArray(fields) ? 'array' : typeof fields + '.');
    Object.entries(fields).forEach(([key, value]) => {
      if (typeof value !== 'object') // makes sure things that aren't fields are cleared out
        return delete fields[key];
      const { name = key } = value;
      // if name doesn't exist then assume the name of the field is the key.
      fields[key] = { name, ...value };
    });
    this._fields = fields;
  }

  /* set name
   * Parameters:
   *   name: <String>
   *     The name of the Table as it is on Airtable.com.
   * This cannot be changed once set.
   */
  set name(name) {
    if (this.name !== undefined)
      throw new Error('TableError: name can not be changed!');
    if (this._checkName(name))
      this._name = name;
  }

  /* _checkName(name)
   * Parameters:
   *   name: <String>
   *     The name of the Table as it is on Airtable.com.
   * Return:
   *   Returns true if the name is a String of at least length 1. Throws an error otherwise.
   */
  _checkName(name) {
    if (typeof name !== 'string' || name.length < 1)
      throw new Error('TableError: name must be a string with a minimum length of 1 character.');
    return true;
  }

  /* _convertRecordData(data, setupLinks)
   * Parameters:
   *   data: <Object>
   *     A key-value Object of Fields pulled from an Airtable.com response.
   *   [setupLinks: <Boolean>]
   *     A Boolean representing whether or not to retrieve Records stored in
   *     LinkToAnotherRecord Fields. Setting this to anything other than false
   *     will result in it being set to true.
   * Return:
   *   Returns a Promise Object which resolves an Array of Records or an empty
   *   Array. Will reject any errors that occur.
   */
  _convertRecordData(data, setupLinks = true) {
    setupLinks = setupLinks === true;
    return new Promise((resolve, reject) => {

      try {
        // surrounding everything in a try-catch so Promise doesn't get mad.
        const tryCB = (cb) => {
          return (...args) => {
            try {
              cb(...args);
            } catch(error) {
              reject(error);
            }
          };
        };
        resolve = tryCB(resolve);
        reject = tryCB(reject);

        if (typeof data !== 'object' || data === null)
          return resolve([]);

        let _data = data;
        let _setupLinks = setupLinks;
        if (!Array.isArray(data)) {
          _data = [ data ];
        }

        const records = [];
        _data.forEach(tryCB((record) => {
          const fields = {...this._blankFields};
          const recordObj = new Record(this, record.id, record.createdTime);
          Object.entries(record.fields).forEach(tryCB(([name, value]) => {
            const [key, settings] = this._getFieldSettingsEntryByName(name);
            const args = [name, value, { ...settings, __record__: recordObj }];
            const f = settings === undefined || typeof settings.type !== 'function' ? new UnknownField(...args) : new settings.type(...args);
            fields[key || name] = f;
          }));
          try {
            recordObj.fields = fields;
            records.push(recordObj);
          } catch (error) {
            reject(error);
          }
        }));

        // set up link Fields

        //wait for promises to finish
        let remainingPromises = 0;
        const waitForPromises = () =>
          new Promise((resolve) => {
            try {
              const checkPromises = () => {
                if (remainingPromises > 0)
                  setTimeout(checkPromises, 50);
                else
                  resolve();
              }
              checkPromises();
            } catch (error) {
              reject(error);
            }
          });

        const retrieved = {};
        const storeRecord = (record) => {
          try {
            if (!(record instanceof Record))
              return;
            if (typeof retrieved[record.table.name] !== 'object')
              retrieved[record.table.name] = {};
            if (!(retrieved[record.table.name][record.id] instanceof Record))
              retrieved[record.table.name][record.id] = record;
          } catch (error) {
            reject(error);
          }
        }

        if (setupLinks)
          records.forEach(storeRecord); // add known records

        const getLinkedRecords = () => {
          try {
            let recheck = false; // set to true when new records are added. rechecks that all dependencies have been filled
            // find records to get and fill in linked records
            const searchedRecords = {};

            const searchForLinks = (record) => {
              try {
                if (searchedRecords[record] === true)
                  return;
                else
                  searchedRecords[record] = true;
                const links = Object.values(record.fields).reduce((links, next) => {
                  if (next instanceof LinkToAnotherRecord)
                    links.push(next);
                  return links;
                }, []);
                links.forEach(tryCB((link) => {
                  const values = link.isMulti ? [...link.value] : [link.value];
                  values.forEach((id, index) => {
                    if (id instanceof Record) {
                      searchForLinks(id);
                    } else {
                      if (typeof retrieved[link.config.table] !== 'object')
                        retrieved[link.config.table] = {};
                      const linked = retrieved[link.config.table][id];
                      recheck = true;
                      if (linked instanceof Record) {
                        if (link.isMulti)
                          values[index] = linked;
                        else
                          link.value = linked;
                      } else {
                        retrieved[link.config.table][id] = true;
                      }
                    }
                  });
                  if (link.isMulti)
                    link.value = values;
                }));
              } catch (error) {
                reject(error);
              }
            };

            records.forEach(searchForLinks); // find missing dependencies

            // get missing dependencies
            Object.entries(retrieved).forEach(tryCB(([tableName, keys]) => {
              let ids = Object.keys(keys);
              ids = ids.reduce((arr, id) => {
                if (!(retrieved[tableName][id] instanceof Record))
                  arr.push(id);
                return arr;
              }, []);

              const sendRequest = (ids = []) => { // send request to get missing dependencies
                if (ids.length === 0)
                  return;
                const table = this._airtable.getTable(tableName, this.base);
                if (table === undefined) {
                  console.error(new Error(`TableError: Table '${tableName}' is undefined. You may have an error in your Table definition. This Table is refered to by a LinkToAnotherRecord Field.`));
                  process.exit(1); //exit to prevent loop as it keeps trying to access this table
                }
                let filter = this._generateOrFilter(ids);
                if (typeof filter !== 'string')
                  return;
                remainingPromises++;
                table.query({ filterByFormula: filter }, false)
                  .then((records) => {
                    records.forEach(storeRecord);
                    remainingPromises--;
                  })
                  .catch((...args) => {
                    remainingPromises--;
                    reject(...args);
                  });
              }

              do // send requests in groups of 100 (max record count from airtable)
                sendRequest(ids.splice(0, ids.length > 100 ? 100 : ids.length));
              while (ids.length > 0);

            }));

            waitForPromises().then(() => {
              if (recheck) {
                getLinkedRecords();
              } else {
                resolve(records);
              }
            })

          } catch (error) {
            reject(error);
          }
        };

        if (setupLinks)
          getLinkedRecords();
        else
          resolve(records);

      } catch (error) {
        reject(error);
      }
    });
  }

  /* _generateOrFilter(recordIDs)
   * Parameters:
   *   recordIDs: <String>
   *     A Record ID String.
   *   recordIDs: <Array>
   *     An Array of Record ID Strings.
   * Return:
   *   Returns a String that can be passed into a Filter parameter
   *   in a query in order to retrieve the requested Record(s) from
   *   their ID(s).
   */
  _generateOrFilter(recordIDs) {
    if (typeof recordIDs !== 'string' && !Array.isArray(recordIDs))
      return;
    if (typeof recordIDs === 'string')
      recordIDs = [recordIDs];
    if (!Array.isArray(recordIDs) || recordIDs.length === 0)
      return;
    if (recordIDs.length === 1)
      return `RECORD_ID() = "${recordIDs[0]}"`;
    let filter = 'OR(';
    recordIDs.forEach(id => filter += `RECORD_ID() = "${id}", `);
    filter = filter.substring(0, filter.length - 2) + ')';
    return filter;
  }

  /* _getBlankFieldByKey(key)
   * Parameters:
   *   key: <String>
   *     The key of the Field defined in the Table Definition.
   * Return:
   *   Returns an empty Field with the settings defined in the Field Definition.
   */
  _getBlankFieldByKey(key) {
    const blankFields = this._blankFields;
    if (blankFields === undefined)
      return;
    return blankFields[key];
  }

  /* _getBlankFieldEntryByKey(key)
   * Parameters:
   *   key: <String>
   *     The key of the Field defined in the Table Definition.
   * Return:
   *   Returns an Array where the first element is the key from the Table Definition
   *   and the second element is a blank Field with the settings defined in the Field
   *   Definition.
   */
  _getBlankFieldEntryByKey(key) {
    const blankFields = this._blankFields;
    if (blankFields === undefined)
      return [];
    return [key, blankFields[key]];
  }

  /* _getBlankFieldByName(name)
   * Parameters:
   *   name: <String>
   *     The name of the Field as it is on Airtable.com.
   * Return:
   *   Returns an empty Field with the settings defined in the Field Definition.
   */
  _getBlankFieldByName(name) {
    const blankFields = this._blankFields;
    if (blankFields === undefined)
      return;
    const fields = Object.values(blankFields);
    for (const field of fields) {
      if (field instanceof Field) {
        if (field.name === name)
          return field;
      }
    }
  }

  /* _getBlankFieldEntryByName(name)
   * Parameters:
   *   name: <String>
   *     The name of the Field as it is on Airtable.com.
   * Return:
   *   Returns an Array where the first element is the key from the Table Definition
   *   and the second element is a blank Field with the settings defined in the Field
   *   Definition.
   */
  _getBlankFieldEntryByName(name) {
    const blankFields = this._blankFields;
    if (blankFields === undefined)
      return [];
    const fields = Object.entries(blankFields);
    for (const [key, field] of fields) {
      if (field instanceof Field) {
        if (field.name === name)
          return [key, field];
      }
    }
    return [];
  }

  /* _getFieldSettingsByKey(key)
   * Parameters:
   *   key: <String>
   *     The key of the Field defined in the Table Definition.
   * Return:
   *   Returns the settings for the Field from the Field Definition.
   */
  _getFieldSettingsByKey(key) {
    if (this.fields === undefined)
      return;
    return this.fields[key];
  }

  /* _getFieldSettingsEntryByKey(key)
   * Parameters:
   *   key: <String>
   *     The key of the Field defined in the Table Definition.
   * Return:
   *   Returns an Array where the first element is the key from the Table Definition
   *   and the second element is the settings for the Field from the Field Definition.
   */
  _getFieldSettingsEntryByKey(key) {
    if (this.fields === undefined)
      return [];
    return [key, this.fields[key]];
  }

  /* _getFieldSettingsByName(name)
   * Parameters:
   *   name: <String>
   *     The name of the Field as it is on Airtable.com.
   * Return:
   *   Returns the settings for the Field from the Field Definition.
   */
  _getFieldSettingsByName(name) {
    if (this.fields === undefined)
      return;
    for (const settings of Object.values(this.fields)) {
      if (settings.name === name)
        return settings;
    }
  }

  /* _getFieldSettingsEntryByName(name)
   * Parameters:
   *   name: <String>
   *     The name of the Field as it is on Airtable.com.
   * Return:
   *   Returns an Array where the first element is the key from the Table Definition
   *   and the second element is the settings for the Field from the Field Definition.
   */
  _getFieldSettingsEntryByName(name) {
    if (this.fields === undefined)
      return [];
    for (const [key, settings] of Object.entries(this.fields)) {
      if (settings.name === name)
        return [key, settings];
    }
    return [];
  }

  /* _handleRecordResponseData(res, setupLinks)
   * Parameters:
   *   res: <Object>
   *     A response Object from Airtable.com.
   *   [setupLinks: <Boolean>]
   *     A Boolean representing whether or not to retrieve Records stored in
   *     LinkToAnotherRecord Fields. Setting this to anything other than false
   *     will result in it being set to true.
   * Return:
   *   Returns a Promise Object which resolves an Array of Records or an empty
   *   Array. Will reject any errors that occur.
   */
  _handleRecordResponseData(res, setupLinks = true) {
    setupLinks = setupLinks === true;
    return new Promise((resolve, reject) => {
      try {
        // surrounding everything in a try-catch so Promise doesn't get mad.
        const tryCB = (cb) => {
          return (...args) => {
            try {
              cb(...args);
            } catch(error) {
              reject(error);
            }
          };
        };
        resolve = tryCB(resolve);
        reject = tryCB(reject);

        if (res.data === undefined)
          return resolve([]);
        if (res.data.records === undefined)
          res.data = { records: res.data }; // ony got one record back
        const convertedRecords = this._convertRecordData(res.data.records, setupLinks)
          .then((records) => {
            if (!Array.isArray(records)) {
              if (!(records instanceof Record))
                return resolve([]);
              return resolve([ records ]);
            }
            return resolve(records);
          })
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    })
  }

  /* createRecord(record, setupLinks)
   * Parameters:
   *   record: <Record>
   *     The Record Object to create.
   *   record: <Object>
   *     A key-value Object of Field Definitions.
   *   setupLinks: <Boolean>
   *     A Boolean representing whether or not to set up LinkToAnotherRecord Fields
   *     on the Record that will be resolved. Setting it to anything other than false
   *     will result in it being set to true.
   * Return:
   *   Returns a Promise which will resolve either a newly created Record or undefined
   *   if the Record failed to be created. It will reject an error on a bad 'record' argument
   *   or an error from Airtable.com from a failed create request.
   */
  createRecord(record, setupLinks = true) {
    setupLinks = setupLinks === true;
    return new Promise((resolve, reject) => {
      try {
        // surrounding everything in a try-catch so Promise doesn't get mad.
        const tryCB = (cb) => {
          return (...args) => {
            try {
              cb(...args);
            } catch(error) {
              reject(error);
            }
          };
        };
        resolve = tryCB(resolve);
        reject = tryCB(reject);

        if (typeof record === 'object') {
          if (record instanceof Record) {
            // create and return the record

            // if (record.primaryField === undefined
            //   || record.primaryField === null
            //   || record.primaryField === ''
            //   || (typeof record.primaryField === 'number' && isNaN(record.primaryField))
            //   || typeof record.primaryField === 'boolean'
            //   || Array.isArray(record.primaryField)) {
            //   const error = new Error(
            //     `createRecord: Invalid Primary Field. This field cannot be blank.\n` +
            //     `This field cannot be blank, NaN, a Boolean, or an Array.\n` +
            //     `Received: ${record.primaryField}`
            //   );
            //   error.name = 'TableError';
            //   return reject(error);
            // } it can be blank on Airtable.com (weird)

            if (typeof record.id === 'string' && record.id.length > 0) {
              const error = new Error(
                `createRecord: This record has already been created (it already has an id).\n` +
                `Received: ${record}`
              );
              error.name = 'TableError';
              return reject(error);
            }

            const request = Request.post(
              {
                base: this.base,
                tableName: this.name,
                data: {
                  fields: Object.values(record.fields).reduce((fields, field) => {
                    if (!(field instanceof Field)) {
                      const error = new Error(
                        `createRecord: Invalid Field Definition.\n` +
                        `Received: ${fields}`
                      );
                      error.name = 'TableError';
                      throw error; // have to throw the error and let try-catch catch it so it exits the reduce
                    }
                    if (field._changed) // only update this if they actually changed the value
                      fields[field.name] = field._saveValue;
                    return fields;
                  }, {})
                }
              },
              (res) => { // success callback
                try {
                  this._handleRecordResponseData(res, setupLinks).then((records) => {
                    resolve(records[0]);
                  }).catch(reject);
                } catch (error) {
                  reject(error);
                }
              },
              reject // fail
            );

            this._airtable.sendRequest(request);

          } else if (Array.isArray(record) || record === null) {
            const error = new Error(
              `createRecord: 'record' must either be a Record Object or a key-value Object of Field Definitions.\n` +
              `Received: ${record}`
            );
            error.name = 'TableError';
            return reject(error);
          } else {
            // record was field definitions (hopefully)
            const blankRecord = this.getBlankRecord();
            for (let [key, value] of Object.entries(record)) {
              if (blankRecord.fields[key] === undefined) {
                const error = new Error(
                  `createRecord: Unknown Field key '${key}'.\n` +
                  `Received: ${record}`
                );
                error.name = 'TableError';
                return reject(error);
              }
              blankRecord[key] = value;
            }
            return this.createRecord(blankRecord).then(resolve).catch(reject);
          }
        } else if (record === undefined) {
          return this.createRecord(this.getBlankRecord, setupLinks).then(resolve).catch(reject);
        } else {
          const error = new Error(
            `createRecord: 'record' must either be a Record Object or a key-value Object representing Fields.\n` +
            `Received: ${record}`
          );
          error.name = 'TableError';
          return reject(error);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /* getBlankRecord
   * Return:
   *   Returns a Record Object with all the Fields from the Table Definition,
   *   no id, and no createdTime. This is useful for creating a new Record.
   */
  getBlankRecord() {
    return new Record(this, undefined, undefined, this._blankFields);
  }

  /* query(parameters, setupLinks)
   * Parameters:
   *   [parameters: <Object>]
   *     A key-value Object of valid Airtable REST API parameters.
   *     Reference the Airtable REST API documentation for more information.
   *   [setupLinks: <Boolean>]
   *     A Boolean representing whether or not to retrieve Records stored in
   *     LinkToAnotherRecord Fields. Setting this to anything other than false
   *     will result in it being set to true.
   * Return:
   *   Returns a Promise Object which resolves a RecordArray. Will reject any errors.
   */
  query(parameters = {}, setupLinks = true) {
    setupLinks = setupLinks === true;
    return new Promise((resolve, reject) => {
      // surrounding everything in a try-catch so Promise doesn't get mad.
      const tryCB = (cb) => {
        return (...args) => {
          try {
            cb(...args);
          } catch(error) {
            reject(error);
          }
        };
      };
      resolve = tryCB(resolve);
      reject = tryCB(reject);

      const { fields, filterByFormula, maxRecords, pageSize = 100, sort, view = 'Grid view', offset } = parameters;

      const request = new Request(
        Request.types.get,
        {
          base: this.base,
          tableName: this.name,
          parameters: {
            fields,
            filterByFormula,
            maxRecords,
            pageSize,
            sort,
            view,
            offset
          },
        },
        (res) => { // success callback
          try {
            const recordArray = new RecordArray(this, res.data.offset, parameters, setupLinks);
            this._handleRecordResponseData(res, setupLinks).then((records) => {
              recordArray.push(...records);
              resolve(recordArray);
            }).catch(reject);
          } catch (error) {
            reject(error);
          }
        },
        reject // fail callback
      );

      this._airtable.sendRequest(request);
    });
  }
}

module.exports = Table;
