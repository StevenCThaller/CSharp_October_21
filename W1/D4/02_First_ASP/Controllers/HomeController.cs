using Microsoft.AspNetCore.Mvc;

namespace _02_First_ASP.Controllers
{
    public class HomeController : Controller 
    {
        // // Specify the HTTP Request type that a route should handle
        // [HttpGet]
        // // Specify the route thatwe want to handle said request at
        // [Route("")]

        // The above sequence can be simplified into one piece:
        [HttpGet("")]
        public ViewResult Index()
        {
            return View("myfirstpage");
        }

        [HttpGet("name/{name}")]
        public ViewResult NameChange(string name)
        {   
            ViewBag.NameIWantToRender = name;

            return View();
        }

        [HttpGet("age/{age}")]
        public string AgeChange(int age)
        {
            if(age <= 0) 
            {
                return "Go back to the infancy ward, you baby!";
            }
            else
            {
                return $"The age you provided in the route is {age}";
            }
        }

        [HttpGet("{several}/parameters/{later}")]
        public ViewResult SoManyThings(string several, int later)
        {
            ViewBag.MessageToPrint = several;
            ViewBag.NumberOfTimesToRender = later;
            return View();
        }
    }
}