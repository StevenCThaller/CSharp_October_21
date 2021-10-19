using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _01_Services_Workshop.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int FoodTruckId { get; set; }
        public FoodTruck FoodTruck { get; set; }
        

        [Required(ErrorMessage = "You must leave a review.")]
        [MinLength(10, ErrorMessage = "Your review must be at least 10 characters long.")]
        [Display(Name = "Review: ")]
        public string Text { get; set; }
        [Required(ErrorMessage = "Please leave a rating, you dirtbag.")]
        [Range(1, 5, ErrorMessage = "Stop trying to cheat the system.")]
        [Display(Name = "Rating: ")]
        public int Rating { get; set; }

        [NotMapped]
        public string Reviewer
        {
            get 
            {
                if(User == null)
                {
                    return "";
                } else {
                    return User.FirstName;
                }
            }
        }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

    }
}