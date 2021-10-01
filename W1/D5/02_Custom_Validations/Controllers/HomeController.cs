using Microsoft.AspNetCore.Mvc;
using _02_Custom_Validations.Models;

namespace _02_Custom_Validations.Controllers 
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