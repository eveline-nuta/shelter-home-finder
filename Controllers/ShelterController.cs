using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace shelterhome_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShelterController : ControllerBase
    {
        static readonly HttpClient client = new HttpClient();

     
        private readonly ILogger<ShelterController> _logger;

        public ShelterController(ILogger<ShelterController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public async Task<string> Get()
        {
            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                string uri = "https://raw.githubusercontent.com/dsb-norge/static-share/ceec27157fbf0d215dc893a2871c82e825bb7f88/shelters.json";
                string responseBody = await client.GetStringAsync(uri);
               // var result = JsonConvert.DeserializeObject<Shelter>(responseBody);
                return responseBody;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }

            return "not found";
        }
    }
}
