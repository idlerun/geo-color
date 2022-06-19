// Manually created normalization of county names
// between the zip csv data dump and svg mapping data

export interface IAlias {
  [stateName: string]: { [canonical: string]: string[] }
}
export const aliases: IAlias = {
  dc: {
    'district of columbia': ['washington']
  },
  mo: {
    'saint charles': ['st. charles'],
    'st. louis': ['saint louis', 'st. louis county']
  },
  ak: {
    'wrangell-petersburg': ['wrangell', 'petersburg'],
    'sitka city and borough': ['sitka'],
    'juneau city and borough': ['juneau'],
    'skagway-hoonah-angoon': ['skagway', 'hoonah angoon'],
    'valdez-cordova': ['yakutat'],
    'anchorage municipality': ['anchorage'],
    'matanuska-susitna borough': ['matanuska-susitna'],
    'southeast fairbanks census area': ['southeast fairbanks'],
    'bethel census area': ['bethel']
  },
  ca: { 'city and county of san francisco': ['san francisco'] },
  fl: {
    'saint johns': ['st. johns']
  },
  ga: { brooks: ['quitman'], terrell: ['randolph'] },
  hi: { maui: ['kalawao'] },
  ia: { "o'brien": ['o brien'] },
  la: {
    'ouachita parish': ['ouachita'],
    'caddo parish': ['caddo'],
    'la salle': ['lasalle'],
    'east baton rouge parish': ['east baton rouge'],
    'plaquemines parish': ['plaquemines'],
    'jefferson parish': ['jefferson']
  },
  md: { baltimore: ['baltimore city', 'baltimore county'] },
  nm: { 'doña ana': ['dona ana'], debaca: ['de baca'] },
  sd: { shannon: ['oglala lakota'] },
  va: {
    franklin: ['franklin county'],
    bedford: ['bedford county'],
    roanoke: ['roanoke county'],
    'city of harrisonburg': ['harrisonburg'],
    'city of alexandria': ['alexandria'],
    richmond: ['richmond county'],
    fairfax: ['fairfax county'],
    'city of suffolk': ['suffolk']
  }
}
