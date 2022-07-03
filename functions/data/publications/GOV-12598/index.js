const publication = (req, res) => {
  res.status(200).json({
    title: "monkeypox-outbreak-technical-briefing-2-data-england",
    href: "https://www.gov.uk/government/publications/monkeypox-outbreak-technical-briefings/investigation-into-monkeypox-outbreak-in-england-technical-briefing-2",
    dataset: {
      symptom_onset: ["08/04/2022","17/04/2022","21/04/2022","22/04/2022","24/04/2022","25/04/2022","29/04/2022","30/04/2022","01/05/2022","02/05/2022","03/05/2022","04/05/2022","05/05/2022","06/05/2022","07/05/2022","08/05/2022","09/05/2022","10/05/2022","11/05/2022","12/05/2022","13/05/2022","14/05/2022","15/05/2022","16/05/2022","17/05/2022","18/05/2022","19/05/2022","20/05/2022","21/05/2022","22/05/2022","23/05/2022","24/05/2022","25/05/2022","26/05/2022","27/05/2022","28/05/2022","29/05/2022","30/05/2022","31/05/2022","01/06/2022","02/06/2022","03/06/2022"],
      count: [1,1,1,1,2,1,3,2,3,5,1,3,5,5,4,4,10,3,7,6,8,12,12,14,14,10,15,11,14,9,12,14,7,12,6,8,3,5,2,4,3,2]
    },
    figures: [
      "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/154728/figure1.png",
      "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/154729/figure2.jpg",
      "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/154730/figure_3.jpg",
      "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/154731/figure4.jpg"
    ]
    
  })
}

module.exports = {
  publication,
}