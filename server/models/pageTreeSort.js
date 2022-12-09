const Model = require('objection').Model
const _ = require('lodash')

/* global WIKI */

/**
 * Page Tree Sort model
 */
module.exports = class PageTreeSort extends Model {
  static get tableName() { return 'pageTreeSort' }

  static async findOrUpdate(opts) {
    const ts = await WIKI.models.pageTreeSort.query().findOne({ path: opts.path });
    if (ts === undefined) {
      await WIKI.models.pageTreeSort.query().insert({path: opts.path, sortnum: opts.sortnum})
    } else {
      await WIKI.models.pageTreeSort.query().update({sortnum: opts.sortnum}).where('id', ts.id)
    }
  }
}
