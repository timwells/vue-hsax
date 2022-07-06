const { isComparisonNode, isLogicNode, isSelectorNode, isValueNode } = require("@rsql/ast");
const { parse } = require("@rsql/parser");

const _title = "WW GENOMICS SEQUENCING VARIANT DETECTION"

const dimensions = (req, res) => {
  const { dimensionData } = require(`/workspace/data/publications/${req.params.publication}/data/dimensionData.js`) 
  const { sampleData } = require(`/workspace/data/publications/${req.params.publication}/data/sampleData.js`) 

  res.status(200).json({
    title: _title,
    dimensions: dimensionData,
    sample: sampleData,
  })
}

const publication = (req, res) => {
  const { seriesData } = require(`/workspace/data/publications/${req.params.publication}/data/seriesData.js`)

  res.status(200).json({
    title:_title,
    href: "",
    dataset: seriesData,
    // dirname: __dirname
  })
}

/*
https://github.com/jirutka/rsql-parser#examples

/movies?query=name=="Kill Bill";year=gt=2003 or /movies?query=director.lastName==Nolan and year>=2000
/movies?query=director.lastName==Nolan and year>=2000

- name=="Kill Bill";year=gt=2003
- name=="Kill Bill" and year>2003
- genres=in=(sci-fi,action);(director=='Christopher Nolan',actor==*Bale);year=ge=2000
- genres=in=(sci-fi,action) and (director=='Christopher Nolan' or actor==*Bale) and year>=2000
- director.lastName==Nolan;year=ge=2000;year=lt=2010
- director.lastName==Nolan and year>=2000 and year<2010
- genres=in=(sci-fi,action);genres=out=(romance,animated,horror),director==Que*Tarantino
- genres=in=(sci-fi,action) and genres=out=(romance,animated,horror) or director==Que*Tarantino
*/

const publicationFiltered = (req, res) => {
  const _filter = req.query.filter;
  const ast = parse(_filter)

  res.status(200).json({
    title: _title,
    filter: _filter,
    filterAst: ast
  })
}

module.exports = {
  dimensions,
  publication,
  publicationFiltered
}