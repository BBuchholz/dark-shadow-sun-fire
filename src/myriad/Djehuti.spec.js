/**
 * @file Djehuti is the main controller for the Basecamp operations
 * of Myriad.
 */

const { Djehuti } = require('./Djehuti');

const djehuti = new Djehuti(); 

it('should have at least one spec', () => {

  expect(true).toBe(true);

});

it('should create wxrd from multiline string input', () => {

  const multiLineInput = `Something I wrote down to remember... 
  alias: Test String
  tags: testing, test`;

  const createdWxrd = djehuti.createWxrd(multiLineInput);
  expect(createdWxrd.metaData.wxrdValue).toBe(multiLineInput);

});

it('should create all wxrds with a uuid', () => {

  const newWxrd = djehuti.createWxrd('test');

  // console.log("before init : ");
  // console.log(newWxrd);

  // console.log("after init : ");
  // console.log(newWxrd);

  expect(newWxrd.getUuid()).toBeDefined();

  const uuidToTest = newWxrd.getUuid();

  // NB: couldn't find a good regex so I have it checking multiple
  // this is just some prelim testing, and the uuid is library generated anyways
  // so for now this is "good enough" for me, if we run into a scenario in
  // the future that require more strictly rigid criteria we can
  // better vet and possibly update these tests

  // ADAPTED FROM REGEX SOURCE AT: https://gist.github.com/johnelliott/cf77003f72f889abbc3f32785fa3df8d
  const regexForV4UuidString = /\b[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/igm;

  // console.log("uuid to test: " + uuidToTest);

  expect(uuidToTest).toMatch(regexForV4UuidString);

  // ADAPTED FROM REGEX SOURCE AT: https://regexr.com/3an7c
  const secondRegexForV4UuidString = /\b(uuid:){0,1}\s*([a-f0-9\\-]*){1}\s*/g;

  expect(uuidToTest).toMatch(secondRegexForV4UuidString);

});


it('should import a wxrd from a json string', () => {

  const multiLineInput = `Something I wrote down to remember... 
  alias: Test String
  tags: testing, test`;

  const createdWxrd = djehuti.createWxrd(multiLineInput);

  const stringifiedWxrd = JSON.stringify(createdWxrd);

  expect(createdWxrd).not.toBe(stringifiedWxrd);

  const importedWxrd = djehuti.importWxrdFromJson(stringifiedWxrd);

  expect(importedWxrd).toEqual(createdWxrd);

});


it('should throw an error if import string is not json', () => {

  expect(() => {
    djehuti.importWxrdFromJson('this is just a string')
  }).toThrow();

});