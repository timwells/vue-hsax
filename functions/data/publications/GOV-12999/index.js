const { isComparisonNode, isLogicNode, isSelectorNode, isValueNode } = require("@rsql/ast");
const { parse } = require("@rsql/parser");

const TEXT_CVS_FORMAT = "text/csv"
const APP_JSON_FORMAT = "application/json"

const convertToCSV = (arr,delim) => {
  const array = [Object.keys(arr[0])].concat(arr)
  return array.map(it => {
    return Object.values(it).join(delim);
  }).join('\n')
}

const publicationDimensions = (req, res) => {
  const { publishingDetails } = require(`/workspace/data/publications/${req.params.publication}/data/publicationDetails.js`)  
  const { dimensionData } = require(`/workspace/data/publications/${req.params.publication}/data/dimensionData.js`) 
  const { sampleData } = require(`/workspace/data/publications/${req.params.publication}/data/sampleData.js`) 
  const { links } = require(`/workspace/data/publications/${req.params.publication}/data/links.js`)
  
  res.status(200).json({
    publishingDetails: publishingDetails,
    dimensions: dimensionData,
    links: links,
    sample: sampleData,
  })
}

const publicationData = (req, res) => {
  const { seriesData } = require(`/workspace/data/publications/${req.params.publication}/data/seriesData.js`)
  
  res.status(200).json({ dataset: seriesData })
}

const publicationDetails = (req, res) => {
  const { publishingDetails } = require(`/workspace/data/publications/${req.params.publication}/data/publicationDetails.js`)  
  
  res.status(200).json({ publishingDetails: publishingDetails })
}

const publicationList = (req, res) => {
  const { publishingDetails } = require(`/workspace/data/publications/${req.params.publication}/data/publicationDetails.js`)  
  const { dimensionData } = require(`/workspace/data/publications/${req.params.publication}/data/dimensionData.js`) 

  let dimensionNames = Object.entries(dimensionData).map(o => o[0])
  const _queryDimension = req.query.dimension;

  let responseObj = {
    title: publishingDetails.title,
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

const publicationFilter = (req, res) => {
  const { publishingDetails } = require(`/workspace/data/publications/${req.params.publication}/data/publicationDetails.js`)  
  const { seriesData } = require(`/workspace/data/publications/${req.params.publication}/data/seriesData.js`)
  const RegexParser = require("regex-parser");

  let resultSet = seriesData
  for (const [key, value] of Object.entries(req.query)) {
    resultSet = [...resultSet.filter((dp) => dp[key].match(RegexParser(`/${value}/`)))]
  }

  let responseObj = {
    title: publishingDetails.title,
    filter: req.query,
    dataset: resultSet
  } 

  // determine Client desired Format - Default Json
  let ClientFormats = req.header('Accept').split(';');
  if(ClientFormats.length > 0) {
    if(ClientFormats.includes(TEXT_CVS_FORMAT)) {
      res.status(200).contentType(TEXT_CVS_FORMAT).send(convertToCSV(resultSet,','));      
    }
    else {
      // Default json
      res.status(200).contentType(APP_JSON_FORMAT).json(responseObj)
    }
  } else {
      // Default json
      res.status(200).contentType(APP_JSON_FORMAT).json(responseObj)
  }
}

module.exports = {
  publicationData,
  publicationDetails,
  publicationDimensions,
  publicationList,
  publicationFilter
}

/*

//let dimensionNames = Object.entries(dimensionData).map(o => o[0])
// let queryNames = Object.entries(req.query).map(o => o[0])
// let queryValues = Object.entries(req.query).map(o => o[1])
 
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