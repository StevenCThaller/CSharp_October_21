using System;
using System.ComponentModel.DataAnnotations;

namespace _01_Services_Workshop.Models
{
    public class Favorite
    {
        [Key]
        public int FavoriteId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int FoodTruckId { get; set; }
        public FoodTruck FoodTruck { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}