using Microsoft.AspNetCore.Mvc;
using _01_Many_To_Many.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace _01_Many_To_Many.Controllers 
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

        [HttpGet("taco/info/{tacoId}")]
        public IActionResult TacoInfo(int tacoId)
        {
            Taco ToDisplay = _context.Tacos
                                    /* One to Many Portion */
                                    .Include(t => t.Protein) // Include our navigation property to Protein
                                    /* ******************** */
                                    /* Many to Many Portion */
                                    .Include(t => t.Toppings) // Include the navigation property to the middle table
                                    .ThenInclude(top => top.Topping) // Then include the navigation property to the topping itself
                                    /* ******************** */
                                    .FirstOrDefault(t => t.TacoId == tacoId);

            if(ToDisplay == null)
            {
                return RedirectToAction("Index");
            }

            return View(ToDisplay);
        }

        [HttpGet("toppings/info/{toppingId}")]
        public IActionResult ToppingInfo(int toppingId)
        {
            Topping ToDisplay = _context.Toppings
                                        /* Many to Many Portion */
                                        .Include(t => t.Tacos)
                                        .ThenInclude(t => t.Taco)
                                        /* ******************** */
                                        .FirstOrDefault(t => t.ToppingId == toppingId);

            if(ToDisplay == null) 
            {
                return RedirectToAction("Index");
            }

            return View(ToDisplay);
        }


        /* Adding to a Many to Many Relationship */
        [HttpGet("taco/{tacoId}/addtoppings/{toppingId}")]
        public IActionResult AddToppingToTaco(int tacoId, int toppingId)
        {
            // Create the new entry object
            TacoHasToppings NewJoinEntry = new TacoHasToppings()
            {
                TacoId = tacoId,
                ToppingId = toppingId
            }; 
            // Add it to the database
            _context.Add(NewJoinEntry);
            // AND DON'T FORGET TO SAVE!!
            _context.SaveChanges();

            return RedirectToAction("TacoInfo", new { tacoId = tacoId });
        }
        /* **************************************** */
    }
}