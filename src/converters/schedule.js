import parser from 'xml2json-light';

const scheduleConverter = (xmlText) => {
  const json = parser.xml2json(xmlText);
  return json.Schedule.Shows.Show;
};

export default scheduleConverter;
