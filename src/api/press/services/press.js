'use strict';

/**
 * press service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::press.press');
