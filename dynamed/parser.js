#!/usr/bin/env node

'use strict';
const Parser = require('../.lib/parser.js');

/**
 * Recognizes the accesses to the platform Dynamed
 * @param  {Object} parsedUrl an object representing the URL to analyze
 *                            main attributes: pathname, query, hostname
 * @param  {Object} ec        an object representing the EC whose URL is being analyzed
 * @return {Object} the result
 */
module.exports = new Parser(function analyseEC(parsedUrl, ec) {
  let result = {};
  let path   = parsedUrl.pathname;
  // uncomment this line if you need parameters
  // let param = parsedUrl.query || {};

  // use console.error for debuging
  // console.error(parsedUrl);

  let match;

  if ((match = /^\/results$/i.exec(path)) !== null) {
    // https://www.dynamed.com/results?q=heart&lang=en
    result.rtype    = 'SEARCH';
    result.mime     = 'HTML';
  } else if ((match = /^\/api\/BuzzDmpSearch$/i.exec(path)) !== null) {
    // http://www.dynamed.com:80/api/BuzzDmpSearch
    result.rtype    = 'SEARCH';
    result.mime     = 'HTML';
  } else if ((match = /^\/topics\/((.*)\/(.*))$/i.exec(path)) !== null) {
    // http://www.dynamed.com:80/topics/dmp~AN~T116756/Superficial-vein-thrombosis-SVT
    result.rtype    = 'ARTICLE';
    result.mime     = 'HTML';
    result.title_id = match[3];
    result.unitid   = match[2];
  } else if ((match = /^\/((.*)\/(.*))$/i.exec(path)) !== null) {
    // https://www.dynamed.com/condition/acute-heart-failure
    // https://www.dynamed.com/drug-monograph/labetalol
    result.rtype    = 'ARTICLE';
    result.mime     = 'HTML';
    result.title_id = match[3];
    result.unitid   = match[1];
  }
  return result;
});
