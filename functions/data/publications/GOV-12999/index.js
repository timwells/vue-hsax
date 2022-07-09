const { isComparisonNode, isLogicNode, isSelectorNode, isValueNode } = require("@rsql/ast");
const { parse } = require("@rsql/parser");

const _title = "WW GENOMICS SEQUENCING VARIANT DETECTION"

const dimensions = (req, res) => {
  const { dimensionData } = require(`/workspace/data/publications/${req.params.publication}/data/dimensionData.js`) 
  const { sampleData } = require(`/workspace/data/publications/${req.params.publication}/data/sampleData.js`) 
  const { links } = require(`/workspace/data/publications/${req.params.publication}/data/links.js`)
  res.status(200).json({
    title: _title,
    dimensions: dimensionData,
    links: links,
    sample: sampleData,
  })
}

const publication = (req, res) => {
  const { seriesData } = require(`/workspace/data/publications/${req.params.publication}/data/seriesData.js`)
  res.status(200).json({
    title:_title,
    href: "",
    dataset: seriesData
  })
}

// ../hsax/v1/publications/GOV-12999/list?dimension=ww_site_code
const publicationList = (req, res) => {
  const { dimensionData } = require(`/workspace/data/publications/${req.params.publication}/data/dimensionData.js`) 

  let dimensionNames = Object.entries(dimensionData).map(o => o[0])
  const _queryDimension = req.query.dimension;

  let responseObj = {
    title: _title,
    dimension: _queryDimension, 
    dataset: []
  } 

  if(dimensionNames.includes(_queryDimension)) {
    const { seriesData } = require(`/workspace/data/publications/${req.params.publication}/data/seriesData.js`)
    const _dataset = [...new Set(seriesData.map(item => item[`${_queryDimension}`]))]
    responseObj.dataset =_dataset
  } else {
    responseObj.dimensionNames = dimensionNames
  }
  res.status(200).json(responseObj)
}

const publicationFiltered = (req, res) => {
  const _filter = req.query.filter;
  const ast = parse(_filter)
  const { seriesData } = require(`/workspace/data/publications/${req.params.publication}/data/seriesData.js`)
  const ww_site_code = ['TW-CMS','UU-BHR']

  res.status(200).json({
    title: _title,
    filter: _filter,
    filterAst: ast,
    dataset: seriesData.filter((dp)=> {return ww_site_code.includes(dp.ww_site_code)})
  })
}

module.exports = {
  dimensions,
  publication,
  publicationFiltered,
  publicationList
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