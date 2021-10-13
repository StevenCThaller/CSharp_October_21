using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using _01_Belt_Prep.Models;
using Microsoft.AspNetCore.Identity;

namespace _01_Belt_Prep.Controllers
{
    public class LogRegController : Controller 
    {
        private MyContext _context { get; set; }

        public LogRegController(MyContext context)
        {
            _context = context;
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
                // Check if a user exists with the given email
                User inDb = _context.Users.FirstOrDefault(u => u.Email == toLog.LogEmail);

                if(inDb == null) 
                {
                    ModelState.AddModelError("LogEmail", "Invalid email/password");
                    return View("Index");
                }

                // Compare the password given to the stored password
                PasswordHasher<LoginUser> hashSlingingSlasher = new PasswordHasher<LoginUser>();
                var result = hashSlingingSlasher.VerifyHashedPassword(toLog, inDb.Password, toLog.LogPassword);

                if(result == 0)
                {
                    ModelState.AddModelError("LogEmail", "Invalid email/password");
                    return View("Index");
                }

                // Store the user's id in session
                HttpContext.Session.SetInt32("UserId", inDb.UserId);
                // And go be successful!
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