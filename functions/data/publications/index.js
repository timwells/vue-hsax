// https://cloud.google.com/blog/products/application-development/api-design-why-you-should-use-links-not-keys-to-represent-relationships-in-apis
function publications(req, res) {
  res.status(200).json({
    "self": "/publications",
    "links": [
      { "publication" : "/publications/GOV-12598" },
      { "publication" : "/publications/GOV-12654" },
      { "publication" : "/publications/GOV-12999" }
    ]
  })
}

module.exports = {
  publications
}
