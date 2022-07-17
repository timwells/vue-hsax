// https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
function publications(req, res) {
  res.status(200).json({
    "self": "/publications",
    "links": [
      { "publication" : "/publications/GOV-12598", "content" : "" },

      { "publication" : "/publications/GOV-12654", "content" : "" },

      { "publication" : "/publications/GOV-12698", "content" : "Investigation into monkeypox outbreak in England: technical briefing 3, underlying data","published" : "2022-06-10","lastupdate" : "2022-07-08",},

      { "publication" : "/publications/GOV-12999", 
          "content" : "Waste Water Data Set",
          "published" : "",
          "lastupdate" : ""
      }
    ]
  })
}

module.exports = {
  publications
}
