'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
    exportText: async (ctx) => {

        const getDisplayTime = (dateString) => {
            var date = new Date(dateString)
            var hours = date.getHours()
            var minutes = date.getMinutes()
            var ampm = hours >= 12 ? 'pm' : 'am'
            hours = hours % 12
            hours = hours ? hours : 12 // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes
            var strTime = hours + ':' + minutes + ' ' + ampm
            return strTime
        }

        // ctx.send("Hello world")
        const masjids = await strapi.services.masjid.find()

        const message = masjids.map(masjid =>
            `*${masjid.Name}*
_${masjid.Address}, ${masjid.Suburb}_${masjid.FajrSalaah ? '\n- Fajr : ' + getDisplayTime(masjid.FajrSalaah) : ''}${masjid.ZuhrSalaah ? '\n- Zuhr: ' + getDisplayTime(masjid.ZuhrSalaah) : ''}${masjid.AsrSalaah ? '\n- Asr: ' + getDisplayTime(masjid.AsrSalaah) : ''}${masjid.EshaSalaah ? '\n- Esha: ' + getDisplayTime(masjid.EshaSalaah) : ''}
`).join('\n')

        return message
    }
};
