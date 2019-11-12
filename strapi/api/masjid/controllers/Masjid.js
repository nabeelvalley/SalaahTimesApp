'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  exportText: async (ctx) => {
    const masjids = await strapi.services.masjid.find()

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
