using System;
using System.ComponentModel.DataAnnotations;
using _01_Entity_Intro.Models.Validations;

namespace _01_Entity_Intro.Models
{
    public class Taco 
    {
        [Key]
        public int TacoId { get; set; }

        [Required(ErrorMessage = "Cheese is required to make a taco.")]
        [MinLength(3, ErrorMessage = "Cheese must be at least 3 characters in length.")]
        [Display(Name = "Cheese: ")]
        public string cheese { get; set; }

        [Required(ErrorMessage = "You must select a tortilla.")]
        [Selection(new string[]{"corn", "flour"})]
        public string tortilla { get; set; }

        [Required]
        [Display(Name = "Protein: ")]
        [Selection(new string[]{"beef", "steak", "chicken", "vegetables"})]
        public string protein { get; set; }

        [Required(ErrorMessage = "You must choose a number of toppings.")]
        [Display(Name = "Toppings: ")]
        [Range(0, 4)]
        public int? toppings { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}