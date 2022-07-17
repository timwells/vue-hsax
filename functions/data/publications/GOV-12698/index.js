const TEXT_CVS_FORMAT = "text/csv"
const APP_JSON_FORMAT = "application/json"

const convertToCSV = (arr,delim) => {
  const array = [Object.keys(arr[0])].concat(arr)
  return array.map(it => {
    return Object.values(it).join(delim);
  }).join('\n')
}

const publicationDimensions = (req, res) => {
  const { dimensionData } = require(`/workspace/data/publications/${req.params.publication}/data/dimensionData.js`) 

  res.status(200).json(dimensionData)
}

const publicationSampleInsights = (req, res) => {
  const { publishingDetails } = require(`/workspace/data/publications/${req.params.publication}/data/publicationDetails.js`)  
  const { dimensionData } = require(`/workspace/data/publications/${req.params.publication}/data/dimensionData.js`) 
  const { sampleData } = require(`/workspace/data/publications/${req.params.publication}/data/sampleData.js`) 
  const { links } = require(`/workspace/data/publications/${req.params.publication}/data/links.js`)
  
  res.status(200).json({
    details: publishingDetails,
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
  
  res.status(200).json(publishingDetails)
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
  publicationSampleInsights,
  publicationData,
  publicationDetails,
  publicationDimensions,
  publicationList,
  publicationFilter
}
