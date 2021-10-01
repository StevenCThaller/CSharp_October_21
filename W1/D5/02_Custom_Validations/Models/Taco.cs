using System.ComponentModel.DataAnnotations;
using _02_Custom_Validations.Models.Validations;

namespace _02_Custom_Validations.Models
{
    public class Taco 
    {
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
    }
}