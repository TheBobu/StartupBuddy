using Microsoft.AspNetCore.Http;
using StartupBuddy.Dtos.File;

namespace StartupBuddy.BusinessLogic
{
    public static class FileExtensions
    {
        public static FileDto GetFileFromIFormFile(this IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var fileBytes = memoryStream.ToArray();
                string content = Convert.ToBase64String(fileBytes);

                return new FileDto
                {
                    ContentType = file.ContentType,
                    Name = file.Name,
                    Size = file.Length,
                    Content = content
                };
            }
        }
    }
}