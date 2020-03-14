'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {

  /**
 * Create a record.
 *
 * @return {Object}
 */

  async create(ctx) {

    console.log('Create Masjid')

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.restaurant.create(data, { files });
    } else {
      entity = await strapi.services.restaurant.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.restaurant.update(ctx.params, data, {
        files,
      });
    } else {
      entity = await strapi.services.restaurant.update(
        ctx.params,
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },


  exportText: async (ctx) => {
    const message = masjids.map(masjid => {
      const location = masjid.Address && masjid.Suburb
        ? `\n_${masjid.Address}, ${masjid.Suburb}_`
        : masjid.Address
          ? `\n_${masjid.Address}_`
          : masjid.Suburb
            ? `\n_${masjid.Suburb}_`
            : ''

      return `*${masjid.Name}*${location}${masjid.FajrSalaah ? '\n- Fajr : ' + masjid.FajrSalaah : ''}${masjid.ZuhrSalaah ? '\n- Zuhr: ' + masjid.ZuhrSalaah : ''}${masjid.AsrSalaah ? '\n- Asr: ' + masjid.AsrSalaah : ''}${masjid.EshaSalaah ? '\n- Esha: ' + masjid.EshaSalaah : ''}
`

    }

    ).join('\n')
    return message
  }
};
