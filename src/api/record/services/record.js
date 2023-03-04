'use strict';

/**
 * record service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::record.record');
