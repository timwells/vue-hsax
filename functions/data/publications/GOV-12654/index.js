const publication = (req, res) => {
  res.status(200).json({
    title: "National flu and COVID-19 surveillance reportS",
    href: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1087111/Weekly_Flu_and_COVID-19_report_w26.pdf",
    dataset: {
      symptom_onset: [],
      count: []
    },
    figures: []    
  })
}

module.exports = {
  publication,
}