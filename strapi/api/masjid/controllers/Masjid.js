'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const axios = require('axios')

const webhookUrl = process.env.MASJID_CHANGE_WEBHOOK 

const sendNotification = async () => {
  if (webhookUrl) {
    try {
      await axios.post(webhookUrl, {})
      console.log("Webhook triggered")
    } catch {
      console.error("Error triggering webhook")
    }
  }
}

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
      entity = await strapi.services.masjid.create(data, { files });
    } else {
      entity = await strapi.services.masjid.create(ctx.request.body);
    }

    await sendNotification()

    return sanitizeEntity(entity, { model: strapi.models.masjid });
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
      entity = await strapi.services.masjid.update(ctx.params, data, {
        files,
      });
    } else {
      entity = await strapi.services.masjid.update(
        ctx.params,
        ctx.request.body
      );
    }

    await sendNotification()

    return sanitizeEntity(entity, { model: strapi.models.masjid });
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
