'use strict';

/**
 * line service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::line.line');
