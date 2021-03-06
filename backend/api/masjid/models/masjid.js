"use strict";
const axios = require("axios");

const webhookUrl = process.env.MASJID_CHANGE_WEBHOOK;

const sendNotification = async () => {
  console.log("Webhook triggered");
  if (webhookUrl) {
    try {
      console.log("Send Masjid Webhook Notification to ", webhookUrl);
      const webhookResult = await axios.post(webhookUrl, {});
      console.log("Webhook Response ", webhookResult);
    } catch {
      console.error("Error triggering webhook");
    }
  }
};

/**
 * Lifecycle callbacks for the `Masjid` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {
  //   console.log("Creating ", model)
  // },
  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {
  //   await sendNotification()
  // },
  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},
  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},
  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},
  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},
  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model) => {},
  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {
  //   await sendNotification()
  // },
  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},
  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {
  //   await sendNotification()
  // },
  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},
  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {
  //   await sendNotification()
  // }
};
