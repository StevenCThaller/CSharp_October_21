using System.Linq;
using _01_Services_Workshop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace _01_Services_Workshop.Services
{
    public interface IFoodTruckService
    {
        int CreateReview(Review review);
    }

    public class FoodTruckService : IFoodTruckService
    {
        private MyContext _context { get; set; }

        public FoodTruckService(MyContext context)
        {
            _context = context;
        }

        public int CreateReview(Review review)
        {
            FoodTruck toReview = _context.FoodTrucks
                    .Include(t => t.Reviews)
                    .FirstOrDefault(t => t.FoodTruckId == review.FoodTruckId);
            
            if(toReview.Reviews.Any(r => r.UserId == review.UserId))
            {
                return -1;
            } 
            else if(toReview == null)
            {
                return -2;
            }

            _context.Add(review);
            _context.SaveChanges();
            return review.ReviewId;
        }
    }
}