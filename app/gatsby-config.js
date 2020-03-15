const { resolve } = require('path')

const strapiBaseUrl = process.env.STRAPI_BASE_URL || 'http://localhost:3001'

console.log('Strapi Base URL:', strapiBaseUrl)


module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-graphql',
            options: {
                // Arbitrary name for the remote schema Query type
                typeName: 'Strapi',
                // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
                fieldName: 'strapi',
                // Url to query from
                url: `${strapiBaseUrl}/graphql`,
            }
        },
        {
            resolve: 'gatsby-plugin-offline',
            options: {
                appendScript: resolve('src/serviceWorker.js'),
            },
        },
    ]
}