using System;
using System.ComponentModel.DataAnnotations;
using _01_One_To_Many.Models.Validations;

namespace _01_One_To_Many.Models
{
    public class Taco 
    {
        [Key]
        public int TacoId { get; set; }

        [Required(ErrorMessage = "Cheese is required to make a taco.")]
        [MinLength(3, ErrorMessage = "Cheese must be at least 3 characters in length.")]
        [Display(Name = "Cheese: ")]
        public string Cheese { get; set; }

        [Required(ErrorMessage = "You must select a tortilla.")]
        [Selection(new string[]{"corn", "flour"})]
        public string Tortilla { get; set; }

        [Required]
        [Display(Name = "Protein: ")]
        public int ProteinId { get; set; }
        // Navigation Property
        public Protein Protein { get; set; }

        [Required(ErrorMessage = "You must choose a number of toppings.")]
        [Display(Name = "Toppings: ")]
        [Range(0, 4)]
        public int? Toppings { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}