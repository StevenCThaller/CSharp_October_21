using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using _01_Services_Workshop.Models;
using _01_Services_Workshop.Services;
using Microsoft.AspNetCore.Identity;

namespace _01_Services_Workshop.Controllers
{
    public class FoodTruckController : Controller 
    {
        private MyContext _context { get; set; }
        private IFoodTruckService _foodTruckService { get; set; }

        public FoodTruckController(MyContext context, IFoodTruckService foodTruckService)
        {
            _context = context;
            _foodTruckService = foodTruckService;
        }

        [HttpGet("trucks")]
        public IActionResult Dashboard()
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            List<FoodTruck> AllTrucks = _context.FoodTrucks
                                        .Include(t => t.FavoritedBy)
                                        .Include(t => t.Reviews)
                                        .ToList();

            DashboardView ToDisplay = new DashboardView(AllTrucks, (int)LoggedInUserId);
            return View(ToDisplay);
        }

        [HttpGet("trucks/new")]
        public IActionResult NewTruck()
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            return View();
        }   

        [HttpPost("trucks/create")]
        public IActionResult CreateTruck(FoodTruck ToCreate)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            if(ModelState.IsValid)
            {
                ToCreate.UserId = (int)LoggedInUserId;

                _context.Add(ToCreate);
                _context.SaveChanges();
                return RedirectToAction("Dashboard");
            }
            else 
            {
                return View("NewTruck");
            }
        }

        [HttpGet("trucks/{truckId}/favorite")]
        public RedirectToActionResult FavoriteTruck(int truckId)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }
            else if(_context.Favorites.Any(f => f.FoodTruckId == truckId && f.UserId == (int)LoggedInUserId))
            {
                return RedirectToAction("Dashboard");
            }

            Favorite NewFave = new Favorite()
            {
                FoodTruckId = truckId,
                UserId = (int)LoggedInUserId
            };

            _context.Add(NewFave);
            _context.SaveChanges();

            return RedirectToAction("Dashboard");
        }

        [HttpGet("trucks/{truckId}/unfavorite")]
        public RedirectToActionResult UnfavoriteTruck(int truckId)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            Favorite toDelete = _context.Favorites.FirstOrDefault(f => f.FoodTruckId == truckId && f.UserId == (int)LoggedInUserId);
            
            if(toDelete == null)
            {
                return RedirectToAction("Dashboard");
            }

            _context.Remove(toDelete);
            _context.SaveChanges();
            return RedirectToAction("Dashboard");
        }

        [HttpGet("trucks/{truckId}/edit")]
        public IActionResult EditTruck(int truckId)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            FoodTruck toEdit = _context.FoodTrucks.FirstOrDefault(t => t.FoodTruckId == truckId);

            if(toEdit.UserId != (int)LoggedInUserId)
            {
                return RedirectToAction("Dashboard");
            }

            return View(toEdit);
        }

        [HttpPost("trucks/{truckId}/update")]
        public IActionResult UpdateTruck(int truckId, FoodTruck fromForm)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            if(ModelState.IsValid)
            {
                FoodTruck toUpdate = _context.FoodTrucks.FirstOrDefault(t => t.FoodTruckId == truckId);

                if(toUpdate == null || toUpdate.UserId != (int)LoggedInUserId)
                {
                    return RedirectToAction("Dashboard");
                }

                toUpdate.Name = fromForm.Name;
                toUpdate.Style = fromForm.Style;
                toUpdate.Description = fromForm.Description;
                toUpdate.UpdatedAt = DateTime.Now;

                _context.SaveChanges();
                return RedirectToAction("Dashboard");
            }
            else 
            {
                return View("EditTruck", fromForm);
            }

        }

        [HttpGet("trucks/{truckId}")]
        public IActionResult TruckInfo(int truckId)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            FoodTruck toDisplay = _context.FoodTrucks
                .Include(t => t.Reviews)
                .ThenInclude(r => r.User)
                .Include(t => t.FavoritedBy)
                .FirstOrDefault(t => t.FoodTruckId == truckId);

            if(toDisplay == null)
            {
                return RedirectToAction("Dashboard");
            }

            TruckInfoViewModel ViewModel = new TruckInfoViewModel(toDisplay, (int)LoggedInUserId);

            return View("TruckInfo", ViewModel);
        }

        [HttpPost("trucks/{truckId}/review")]
        public IActionResult CreateReview(int truckId, Review fromForm)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            if(ModelState.IsValid)
            {
                fromForm.UserId = (int)LoggedInUserId;
                fromForm.FoodTruckId = truckId;
                
                int result = _foodTruckService.CreateReview(fromForm);

                if(result == -1)
                {
                    ModelState.AddModelError("Text", "You have already reviewed this truck.");
                    return TruckInfo(truckId);
                } 
                else if(result == -2)
                {
                    return RedirectToAction("Dashboard");
                }

                return RedirectToAction("TruckInfo", new { truckId = truckId });
            }
            else 
            {
                return TruckInfo(truckId);
            }
        }

        [HttpGet("trucks/{truckId}/delete")]
        public RedirectToActionResult DeleteTruck(int truckId)
        {
            int? LoggedInUserId = HttpContext.Session.GetInt32("UserId");
            if(LoggedInUserId == null)
            {
                return RedirectToAction("Index", "LogReg");
            }

            FoodTruck toDelete = _context.FoodTrucks.FirstOrDefault(t => t.FoodTruckId == truckId);

            if(toDelete == null || toDelete.UserId != (int)LoggedInUserId)
            {
                return RedirectToAction("Dashboard");
            }

            _context.Remove(toDelete);
            _context.SaveChanges();

            return RedirectToAction("Dashboard");
        }
    }
}
