const Model = require('objection').Model
const _ = require('lodash')

/* global WIKI */

/**
 * Page Tree model
 */
module.exports = class PageTree extends Model {
  static get tableName() { return 'pageTree' }

  static async updateSortnum(opts) {
    const page = await WIKI.models.pageTree.query().findById(opts.treeId)
    if (!page) {
      throw new WIKI.Error.PageNotFound()
    }

    if (!WIKI.auth.checkAccess(opts.user, ['write:pages'], {
      path: page.path,
      locale: page.localeCode
    })) {
      throw new WIKI.Error.PageRestoreForbidden()
    }

    await WIKI.models.pageTree.query().update({sortnum: opts.sortnum}).where('id', opts.treeId)

    await WIKI.models.pageTreeSort.findOrUpdate({path: page.path, sortnum: opts.sortnum})
  }
}
