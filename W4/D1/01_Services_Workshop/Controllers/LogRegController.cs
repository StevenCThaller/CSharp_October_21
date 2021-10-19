using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using _01_Services_Workshop.Models;
using Microsoft.AspNetCore.Identity;
using _01_Services_Workshop.Services;

namespace _01_Services_Workshop.Controllers
{
    public class LogRegController : Controller 
    {
        private MyContext _context { get; set; }

        private IUserService _userService { get; set; }

        public LogRegController(MyContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpGet("")]
        public ViewResult Index()
        {
            return View();
        }

        [HttpPost("register")]
        public IActionResult Register(User toReg)
        {
            if(ModelState.IsValid)
            {
                // Let's check if the email address is unique in our db
                if(_context.Users.Any(u => u.Email == toReg.Email))
                {
                    ModelState.AddModelError("Email", "You have already registered, please log in.");
                    return View("Index");
                }

                // Otherwise, let's hash the password
                PasswordHasher<User> hashSlingingSlasher = new PasswordHasher<User>();
                toReg.Password = hashSlingingSlasher.HashPassword(toReg, toReg.Password);

                // Add the new user to the database
                _context.Add(toReg);
                // Save those changes
                _context.SaveChanges();
                // Save that user's id into session
                HttpContext.Session.SetInt32("UserId", toReg.UserId);
                // And go be successful!
                return RedirectToAction("Dashboard", "FoodTruck");
            }
            else 
            {
                return View("Index");
            }

        }

        [HttpPost("login")]
        public IActionResult Login(LoginUser toLog)
        {
            if(ModelState.IsValid)
            {
                int loginResult = _userService.Login(toLog);

                if(loginResult == -1)
                {
                    ModelState.AddModelError("LogEmail", "Invalid email/password");
                    return View("Index");
                }

                HttpContext.Session.SetInt32("UserId", loginResult);
                return RedirectToAction("Dashboard", "FoodTruck");
            }
            else 
            {
                return View("Index");
            }
        }

        [HttpGet("logout")]
        public RedirectToActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }
    }
}