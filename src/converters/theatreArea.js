import parser from 'xml2json-light';

const theatreAreaConverter = (xmlText) => {
  const json = parser.xml2json(xmlText);
  return json.TheatreAreas.TheatreArea;
};

export default theatreAreaConverter;
