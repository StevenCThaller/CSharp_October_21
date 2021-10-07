using Microsoft.AspNetCore.Mvc;
using _01_One_To_Many.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace _01_One_To_Many.Controllers 
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
            // ViewBag.ProteinOptions = _context.Proteins;
            IndexModel ViewModel = new IndexModel()
            {
                ProteinOptions = _context.Proteins.ToList()
            };
            return View("Index", ViewModel);
        }

        [HttpGet("protein/new")]
        public ViewResult NewProtein()
        {
            return View();
        }

        [HttpPost("protein/create")]
        public IActionResult CreateProtein(Protein FormData)
        {
            if(ModelState.IsValid)
            {
                _context.Add(FormData);

                _context.SaveChanges();

                return RedirectToAction("Index");
            }
            else 
            {
                return View("NewProtein", FormData);
            }
        }

        [HttpPost("taco/new")]
        public IActionResult CreateTaco(IndexModel taco)
        {
            if(ModelState.IsValid)
            {
                // Let's take the taco from the form, and add it to our database
                // Method 1: Very specific
                // _context.Tacos.Add(taco);

                // Method 2: Entity is sm0rt
                _context.Add(taco.Form);

                // Let's seal the deal
                _context.SaveChanges();
                // TempData["TacoId"] = taco.TacoId;

                // Both of these are valid options
                // return Redirect($"taco/info/{taco.TacoId}");
                return RedirectToAction("TacoInfo", new { tacoId = taco.Form.TacoId });
            }
            else 
            {
                return Index();
            }
        }

        [HttpGet("taco/info/{tacoId}")]
        public IActionResult TacoInfo(int tacoId)
        {
            Taco ToDisplay = _context.Tacos
                                    .Include(t => t.Protein) // Include our navigation property
                                    .FirstOrDefault(t => t.TacoId == tacoId);

            if(ToDisplay == null)
            {
                return RedirectToAction("Index");
            }

            return View(ToDisplay);
        }

        [HttpGet("protein/info/{proteinId}")]
        public IActionResult ProteinInfo(int proteinId)
        {
            Protein ToDisplay = _context.Proteins
                                        .Include(p => p.Tacos)
                                        .FirstOrDefault(p => p.ProteinId == proteinId);

            if(ToDisplay == null)
            {
                return RedirectToAction("Index");
            }

            return View(ToDisplay);
        }
    }
}