using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _01_Services_Workshop.Models
{
    public class FoodTruck
    {
        [Key]
        public int FoodTruckId { get; set; }

        [Required(ErrorMessage = "You must enter a name.")]
        [MinLength(5, ErrorMessage = "Truck name must be at least 5 characters long.")]
        [Display(Name = "Name: ")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Cuisine style is required.")]
        [MinLength(3, ErrorMessage = "Style must be at least 3 characters long.")]
        [Display(Name = "Style: ")]
        public string Style { get; set; }
        
        [Required(ErrorMessage = "Description is required.")]
        [MinLength(10, ErrorMessage = "Description must be at least 10 characters long.")]
        [Display(Name = "Description: ")]
        public string Description { get; set; }

        public int UserId { get; set; } // foreign key for who created the truck
        public User User { get; set; }

        [NotMapped]
        public double AverageRating 
        {
            get 
            {
                if(Reviews == null || Reviews.Count == 0)
                {
                    return 0;
                }

                double avg = 0;
                foreach(Review review in Reviews)
                {
                    avg += review.Rating;
                }
                return avg / (double)Reviews.Count;
            }
        }

        public List<Favorite> FavoritedBy { get; set; }
        public List<Review> Reviews { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}