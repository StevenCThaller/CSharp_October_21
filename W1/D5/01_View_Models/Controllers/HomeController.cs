using Microsoft.AspNetCore.Mvc;
using _01_View_Models.Models;

namespace _01_View_Models.Controllers 
{
    public class HomeController : Controller 
    {
        [HttpGet("")]
        public ViewResult Index()
        {
            return View();
        }


        [HttpPost("taco/new")]
        public ViewResult CreateTaco(Taco taco)
        {
            if(ModelState.IsValid)
            {
                return View(taco);
            }
            else 
            {
                return View("Index");
            }
        }
    }
}