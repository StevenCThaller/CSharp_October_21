using System.ComponentModel.DataAnnotations;

namespace _01_View_Models.Models
{
    public class Taco 
    {
        [Required(ErrorMessage = "Cheese is required to make a taco.")]
        [MinLength(3, ErrorMessage = "Cheese must be at least 3 characters in length.")]
        [Display(Name = "Cheese: ")]
        public string cheese { get; set; }

        [Required(ErrorMessage = "You must select a tortilla.")]
        public string tortilla { get; set; }

        [Required]
        [Display(Name = "Protein: ")]
        public string protein { get; set; }
    }
}