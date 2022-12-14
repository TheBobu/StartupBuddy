using AutoMapper;
using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.File;
using System.IO.Compression;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class ExportBusinessLogic : BaseBusinessLogic, IExportBusinessLogic
    {
        public ExportBusinessLogic(
            IIdentityContext identityContext, 
            IUnitOfWork unitOfWork, 
            IMapper mapper, 
            ICompanyBusinessLogic companyBusinessLogic,
            IMarketResearchBusinessLogic marketResearchBusinessLogic,
            IProductBusinessLogic productBusinessLogic,
            ISocialMediaBusinessLogic socialMediaBusinessLogic,
            IBusinessModelBusinessLogic businessModelBusinessLogic,
            IPersonalInfoBusinessLogic personalInfoBusinessLogic
            ) : 
            base(identityContext, unitOfWork, mapper)
        {
            CompanyBusinessLogic = companyBusinessLogic;
            MarketResearchBusinessLogic = marketResearchBusinessLogic;
            ProductBusinessLogic = productBusinessLogic;
            SocialMediaBusinessLogic = socialMediaBusinessLogic;
            BusinessModelBusinessLogic = businessModelBusinessLogic;
            PersonalInfoBusinessLogic = personalInfoBusinessLogic;
        }

        public ICompanyBusinessLogic CompanyBusinessLogic { get; }
        public IMarketResearchBusinessLogic MarketResearchBusinessLogic { get; }
        public IProductBusinessLogic ProductBusinessLogic { get; }
        public ISocialMediaBusinessLogic SocialMediaBusinessLogic { get; }
        public IBusinessModelBusinessLogic BusinessModelBusinessLogic { get; }
        public IPersonalInfoBusinessLogic PersonalInfoBusinessLogic { get; }

        public async Task<FileDto> ExportToZip()
        {
            var pages = await GenerateHtmlFromData();

            var bytes = CreatePdfFromHtml(pages);

            var company = CompanyBusinessLogic.GetByUserId();
            var businessModel = await BusinessModelBusinessLogic.GetByUserId();

            using (var memoryStream = new MemoryStream())
            {
                using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    var pdfPortfolio = archive.CreateEntry($"Portofoliu - {company.Name}.pdf");

                    using (var entryStream = pdfPortfolio.Open())
                    using (var streamWriter = new StreamWriter(entryStream))
                    {
                        streamWriter.BaseStream.Write(bytes);
                    }

                    if(businessModel != null)
                    {
                        if(businessModel.DiagramFile != null)
                        {
                            var bmodelFile = archive.CreateEntry(businessModel.DiagramFile.Name);
                            using (var entryStream = bmodelFile.Open())
                            using (var streamWriter = new StreamWriter(entryStream))
                            {
                                streamWriter.BaseStream.Write(Convert.FromBase64String(businessModel.DiagramFile.Content));
                            }
                        }
                    }

                }
                var fileBytes = memoryStream.ToArray();
                string content = Convert.ToBase64String(fileBytes);

                var zip = new FileDto()
                {
                    Name = "Result.zip",
                    Content = content,
                    ContentType = "application/zip",
                    Size = fileBytes.Length,
                };

                return zip;
            }
        }

        private byte[] CreatePdfFromHtml(List<string> html)
        {
            Byte[] res = null;
            using (MemoryStream ms = new MemoryStream())
            {
                var combinedPdf = new PdfDocument();
                foreach (var page in html)
                {
                    var pdfPage = PdfGenerator.GeneratePdf(page, PdfSharp.PageSize.A4);
                    var importPdf = ImportPdfDocument(pdfPage);
                    combinedPdf.AddPage(importPdf.Pages[0]);
                }

                combinedPdf.Save(ms);
                res = ms.ToArray();
            }
            return res;
        }

        private static PdfDocument ImportPdfDocument(PdfDocument pdf1)
        {
            using (var stream = new MemoryStream())
            {
                pdf1.Save(stream, false);
                stream.Position = 0;
                var result = PdfReader.Open(stream, PdfDocumentOpenMode.Import);
                return result;
            }
        }

        private async Task<List<string>> GenerateHtmlFromData()
        {
            var company = CompanyBusinessLogic.GetByUserId();
            var marketResearch = await MarketResearchBusinessLogic.GetByUserId();
            var personalInfo = await PersonalInfoBusinessLogic.GetByUserId();
            var businessModel = await BusinessModelBusinessLogic.GetByUserId();
            var product = await ProductBusinessLogic.GetByUserId();
            var socialMedia = await SocialMediaBusinessLogic.GetByUserId();
            var pages = new List<string>();

            var titlePage =
                @$"
                    <div>
                        <h1>Portofoliu {company.Name}</h1>
                        <h3>Produs: {product.Name}</h3>
                    </div>
                "; 
            pages.Add(GetHtmlTemplate(titlePage));

            var firstPage =
                @$"
                    <div>
                        <h3>Informații personale</h1>
                        <p>Nume și prenume: {personalInfo.FirstName} {personalInfo.LastName}</p>
                        <p>Vârsta: {personalInfo.Age}</p>
                        <p>CNP: {personalInfo.CNP}</p>
                        <p>Serie și număr CI:{personalInfo.Series}{personalInfo.Number}</p>
                        <p>Adresa: {personalInfo.Address}</p>
                        <p>Educație/Formare: {personalInfo.Education}</p>
                    </div>
                ";
            pages.Add(GetHtmlTemplate(firstPage));

            var secondPage =
                @$"
                    <div>
                        <h3>Detaliile Companiei</h3>
                        <p>Activitatea principală: {company.MainActivity}</p>
                        <p>Activitați secundare: {company.SecondaryActivities}</p>
                        {(company.Employees? $"<p>Nr. angajați: {company.NumberOfEmployees}</p>":"")}
                        <p>Email: {company.BusinessEmail}</p>
                        <p>Descriere: <br>{company.Description}</p>
                        {(product!=null?$@"
                        <h3>Detaliile Produsului</h3>
                        <p>Nume: {product.Name}</p>
                        <p>Tip: {product.ProductType}</p>
                        <p>Descriere: <br>{product.Description}</p>":"")}
                    </div>
                ";
            pages.Add(GetHtmlTemplate(secondPage));

            if (marketResearch != null)
            {
                var thirdPage = @$"
                    <div>
                        <h3>Studiul pieței</h3>
                        <p><i>Există o dorință pentru produsul sau serviciul dvs?</i></p>
                        <p>{marketResearch.Demand}</p>
                        <p><i>Câte persoane sunt interesate de ceea ce oferă firma ta?</i></p>
                        <p>{marketResearch.Interest}</p>
                        <p><i>La ce persoane poate ajunge business-ul tău?</i></p>
                        <p>{marketResearch.BusinessArea}</p>
                        <p><i>Ce alte produse similare există? Care este competiția ta?</i></p>
                        <p>{marketResearch.Competitors}</p>
                        <p><i>Cât platesc potențialii clienți ale acestor produse alternative?</i></p>
                        <p>{marketResearch.Revenue}</p>
                    </div>
                ";
                pages.Add(GetHtmlTemplate(thirdPage));
            }

            if (socialMedia != null)
            {
                var fourthPage = @$"
                    <div>
                        <h3>Rețele sociale</h3>
                        <a href='{socialMedia.Website}'><p>Pagina de Web: {socialMedia.Website}</p></a>
                        <a href='{socialMedia.Facebook}'><p>Facebook: {socialMedia.Facebook}</p></a>
                        <a href='{socialMedia.Instagram}'><p>Instagram: {socialMedia.Instagram}</p></a>
                        <a href='{socialMedia.Linkedin}'><p>LinkedIn: {socialMedia.Linkedin}</p></a>
                    </div>
                ";

                pages.Add(GetHtmlTemplate(fourthPage));
            }
            
            return pages;  
        }

        private string GetHtmlTemplate(string body)
        {
            return @$"
                    <html>
                        <head>

                        </head>
                        <body>
                            {body}
                        </body
                    </html>
                ";
        }
    }
}