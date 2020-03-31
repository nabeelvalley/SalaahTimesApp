const fs = require("fs")
const path = require("path")
const { buildSchema, buildClientSchema } = require("graphql")
const { resolve } = require("path")

const strapiBaseUrl = process.env.STRAPI_BASE_URL || "http://localhost:3001"

console.log("Strapi Base URL:", strapiBaseUrl)

module.exports = {
  siteMetadata: {
    exportTimesEndpoint: `${strapiBaseUrl}/masjids/export-text`
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "Strapi",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "strapi",
        // Url to query from
        url: `${strapiBaseUrl}/graphql`,
        createSchema: async () => {
          const schemaPath = path.join(
            __dirname,
            "../backend/exports/graphql/schema.graphql"
          )

          console.log(schemaPath)

          const sdl = fs.readFileSync(schemaPath).toString()

          return buildSchema(sdl)
        }
      }
    },
    "gatsby-plugin-offline"
  ]
}
