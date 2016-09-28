import parser from 'xml2json-light';

const eventConverter = (xmlText) => {
  const json = parser.xml2json(xmlText);
  return json.Events.Event;
};

export default eventConverter;
