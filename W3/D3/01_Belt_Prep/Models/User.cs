using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _01_Belt_Prep.Models
{
    public class User 
    {
        [Key]
        public int UserId { get; set; }

        [Required(ErrorMessage = "You must submit a first name.")]
        [MinLength(2, ErrorMessage = "First name must be at least 2 characters.")]
        [Display(Name = "First Name: ")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "You must submit a last name.")]
        [MinLength(2, ErrorMessage = "Last name must be at least 2 characters.")]
        [Display(Name = "Last Name: ")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "You must provide an email address.")]
        [EmailAddress(ErrorMessage = "Please provide a valid email address.")]
        [Display(Name = "Email: ")]
        public string Email { get; set; }

        [Required(ErrorMessage = "You must provide a password")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters in length.")]
        [Compare("ConfirmPassword", ErrorMessage = "Passwords do not match.")]
        [Display(Name = "Password: ")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [NotMapped]
        [Display(Name = "Confirm Password: ")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        public List<FoodTruck> TrucksCreated { get; set; }

        public List<Favorite> FavoriteTrucks { get; set; }

        public List<Review> ReviewsLeft { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}