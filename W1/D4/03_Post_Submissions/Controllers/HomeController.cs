using Microsoft.AspNetCore.Mvc;

namespace _03_Post_Submissions.Controllers
{
    public class HomeController : Controller 
    {
        [HttpGet("")]
        public ViewResult Index()
        {
            return View();
        }

        [HttpPost("taco/create")]
        public IActionResult TacoSubmit(string cheese, string tortilla, string protein)
        {
            return RedirectToAction("TacoInfo");
        }

        [HttpGet("taco/info")]
        public ViewResult TacoInfo()
        {
            return View();
        }

        // [HttpPost("taco/create")]
        // public ViewResult NewTaco(string cheese, string tortilla, string protein)
        // {
        //     ViewBag.Cheese = cheese;
        //     ViewBag.Tortilla = tortilla;
        //     ViewBag.Protein = protein;
        //     return View();
        // }
    }
}