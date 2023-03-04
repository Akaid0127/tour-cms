'use strict';

/**
 * charger service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::charger.charger');
