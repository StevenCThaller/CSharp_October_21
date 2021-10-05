using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using _01_Session.Models;

namespace _01_Session.Controllers 
{
    public class HomeController : Controller 
    {
        [HttpGet("")]
        public ViewResult Index()
        {
            return View();
        }


        [HttpPost("taco/new")]
        public IActionResult CreateTaco(Taco taco)
        {
            if(ModelState.IsValid)
            {
                HttpContext.Session.SetString("cheese", taco.cheese);
                HttpContext.Session.SetString("tortilla", taco.tortilla);
                HttpContext.Session.SetString("protein", taco.protein);
                // Note the difference for adding a number into session
                HttpContext.Session.SetInt32("toppings", (int)taco.toppings);

                return RedirectToAction("TacoInfo");
            }
            else 
            {
                return View("Index", taco);
            }
        }

        [HttpGet("taco/info")]
        public IActionResult TacoInfo()
        {
            int? toppings = HttpContext.Session.GetInt32("toppings");

            if(toppings == null) 
            {
                return RedirectToAction("Index");
            }


            // Create an empty taco
            Taco taco = new Taco();
            // And apply the data from session to each of the taco's attributes
            taco.cheese = HttpContext.Session.GetString("cheese");
            taco.tortilla = HttpContext.Session.GetString("tortilla");
            taco.protein = HttpContext.Session.GetString("protein");
            taco.toppings = HttpContext.Session.GetInt32("toppings");
            // then pass the taco to Razor to populate the view
            return View(taco);
        }

        [HttpGet("taco/clear")]
        public RedirectToActionResult ClearTaco()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }
    }
}