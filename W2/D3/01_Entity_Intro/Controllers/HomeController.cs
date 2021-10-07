using Microsoft.AspNetCore.Mvc;
using _01_Entity_Intro.Models;
using System.Linq;

namespace _01_Entity_Intro.Controllers 
{
    public class HomeController : Controller 
    {
        private TaContext _context; 

        public HomeController(TaContext context)
        {
            _context = context;
        }

        
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
                // Let's take the taco from the form, and add it to our database
                // Method 1: Very specific
                // _context.Tacos.Add(taco);

                // Method 2: Entity is sm0rt
                _context.Add(taco);

                // Let's seal the deal
                _context.SaveChanges();
                // TempData["TacoId"] = taco.TacoId;

                // Both of these are valid options
                // return Redirect($"taco/info/{taco.TacoId}");
                return RedirectToAction("TacoInfo", new { tacoId = taco.TacoId });
            }
            else 
            {
                return View("Index", taco);
            }
        }

        [HttpGet("taco/info/{tacoId}")]
        public IActionResult TacoInfo(int tacoId)
        {
            Taco ToDisplay = _context.Tacos.FirstOrDefault(t => t.TacoId == tacoId);

            if(ToDisplay == null)
            {
                return RedirectToAction("Index");
            }

            return View(ToDisplay);
        }
    }
}