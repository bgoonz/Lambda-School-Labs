const axios = require('axios');

class Request {
  /* static get types
   * get
   * post
   * dangerouslyPut:
   *   If you use put to update a record, it will clear any field not included in the put request.
   * patch:
   *   Use a patch request to update specified fields in a record without clearing the rest.
   * delete
   */
  static get types() {
    return {
      get : 'get',
      post: 'post',
      dangerouslyPut: 'put',
      patch: 'patch',
      delete: 'delete'
    }
  }

  /* static get printRequests
   * Whether or not to print requests as they are being sent. Prints the URL, headers, parameters, and data being sent
   * as well as the Type of the Request.
   * return:
   *   Boolean
   */
  static get printRequests() {
    return this._printRequests || false;
  }

  /* static set printRequests
   * Whether or not to print requests as they are being sent. Prints the URL, headers, parameters, and data being sent
   * as well as the Type of the Request.
   * Parameters:
   *   value: <Boolean>
   *     Whether or not to print the requests as they are being sent.
   */
  static set printRequests(value) {
    if (typeof value !== 'boolean')
      throw new Error('AirtableError: printRequests must be a boolean.');
    this._printRequests = value;
  }

  /* static get(config, success, fail)
   * Parameters: (Reference constructor docs for more information)
   *   config
   *   success
   *   fail
   * return:
   *   A new Request Object with the type set to get.
   */
  static get(config, success, fail) {
    return new Request(Request.types.get, config, success, fail)
  }

  /* static post(config, success, fail)
   * Parameters: (Reference constructor docs for more information)
   *   config
   *   success
   *   fail
   * return:
   *   A new Request Object with the type set to post.
   */
  static post(config, success, fail) {
    return new Request(Request.types.post, config, success, fail)
  }

  /* static dangerouslyPut(config, success, fail)
   * If you use put to update a record, it will clear any field not included in the put request.
   * Parameters: (Reference constructor docs for more information)
   *   config
   *   success
   *   fail
   * return:
   *   A new Request Object with the type set to put.
   */
  static dangerouslyPut(config, success, fail) {
    return new Request(Request.types.dangerouslyPut, config, success, fail)
  }

  /* static patch(config, success, fail)
   * Parameters: (Reference constructor docs for more information)
   *   config
   *   success
   *   fail
   * return:
   *   A new Request Object with the type set to patch.
   */
  static patch(config, success, fail) {
    return new Request(Request.types.patch, config, success, fail)
  }

  /* static delete(config, success, fail)
   * Parameters: (Reference constructor docs for more information)
   *   config
   *   success
   *   fail
   * return:
   *   A new Request Object with the type set to delete.
   */
  static delete(config, success, fail) {
    return new Request(Request.types.delete, config, success, fail)
  }

  /* Request
   * This Object is used to define a request which will be stored in a queue and sent when it's able to be.
   * Parameters:
   *   type:
   *     Use Request.types.get/post/dangerouslyPut/patch/delete to get set the type.
   *     Alternative: Request.get/post/dangerouslyPut/patch/delete.
   *   config: {
   *     base: <String>,
   *     tableName: <String>,
   *     [data: <Object>,] (Required for post, put, and patch requests)
   *     [appendID: <String>,] (Required for requests invloving updating a specific record by its ID)
   *     [parameters: <Object>] (Query parameters)
   *     [headers: <Object>,]
   *   }
   *   [success: <Function>,] (Will be passed arguments from axios request .then or you can just use send(key).then)
   *   [fail: <Function>]  (Will be passed arguments from axios request .catch or you can just use send(key).catch)
   * config properties:
   *   base: The base the table is in.
   *   tableName: The name of the table.
   *   data: Data to send with the request.
   *     (ie) field information.
   *   appendID: This is a string which will be appended to the request url. Used for things such as updating a specific record by its ID
   *   headers: Headers that will be added to the request.
   */
  constructor(type, { base, tableName, data, appendID, parameters, headers }, success, fail) {
    switch(type.toLowerCase()) {
      case 'get':
      case 'post':
      case 'put':
      case 'patch':
      case 'delete':
        break;
      default:
        throw new Error(`RequestError: Unknown request type of '${type}' received.`)
    }
    if (tableName === undefined)
      throw new Error('RequestError: Requests require a tableName.');
    if (base === undefined)
      throw new Error('RequestError: Requests require a base.');
    switch(type.toLowerCase()) {
      case 'post':
      case 'put':
      case 'patch':
        if (typeof data !== 'object' || Array.isArray(data))
          throw new Error(`RequestError: Expected ${type.toUpperCase()} data to be a key-value Object but received a(n) ${Array.isArray(data) ? 'array' : typeof data}.`);
      default:
        break;
    }
    this.type = type;
    this.base = base;
    this.tableName = tableName;
    this.data = data || {};
    this.appendID = appendID;
    this.parameters = parameters || {};
    this.headers = headers || {};
    this.success = success;
    this.fail = fail;
  }

  /* send(key)
   * Sends the request.
   * Parameters:
   * key: <String>
   *   The API key to use for the request.
   * return:
   *   A Promise Object which resolves the response it gets back and rejects any errors.
   *   Will also call the success and fail functions passed in during initialization.
   */
  send(key) {
    if (typeof key !== 'string')
      throw new Error('RequestError: Expected key to be a String but received a(n) ' + typeof key + '.');
    return new Promise((resolve, reject) => {
      const headers = Object.assign(this.headers, { Authorization: `Bearer ${key}` })
      let url = `https://api.airtable.com/v0/${this.base}/${this.tableName}` + (this.appendID ? `/${this.appendID}` : '');
      let promise;
      if (Request.printRequests) {
        console.log(`\nSending ${this.type.toUpperCase()} Request: ${url}`);
        console.log(`\tHeaders: ${JSON.stringify(headers, null, 2).replace(/(?:\r\n|\r|\n)/g, '\n\t')}`);
        console.log(`\tParameters: ${JSON.stringify(this.parameters, null, 2).replace(/(?:\r\n|\r|\n)/g, '\n\t')}`);
        console.log(`\tData: ${JSON.stringify(this.data, null, 2).replace(/(?:\r\n|\r|\n)/g, '\n\t')}\n`);
      }
      switch(this.type.toLowerCase()) {
        case 'get':
          promise = axios.get(url, { params: this.parameters, headers, withCredentials: true });
          break;
        case 'post':
          promise = axios.post(url, this.data, { params: this.parameters, headers, withCredentials: true });
          break;
        case 'put':
          promise = axios.put(url, this.data, { params: this.parameters, headers, withCredentials: true });
          break;
        case 'patch':
          promise = axios.patch(url, this.data, { params: this.parameters, headers, withCredentials: true });
          break;
        case 'delete':
          promise = axios.delete(url, { params: this.parameters, headers, withCredentials: true });
          break;
        default:
          return reject(new Error('RequestError: Unknown type encountered during request.send execution. Type: ' + this.type + '.'));
      }
      if (promise !== undefined) {
        promise.then((...args) => {
          if (this.success !== undefined)
            this.success(...args);
          resolve(...args);
        }).catch((...args) => {
          if (this.fail !== undefined)
            this.fail(...args);
          if (reject !== undefined)
            reject(...args);
        });
      }
    });
  }
}

module.exports = Request;
