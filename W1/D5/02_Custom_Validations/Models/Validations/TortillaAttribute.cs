using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace _02_Custom_Validations.Models.Validations
{
    // public class TortillaAttribute : ValidationAttribute
    // {
    //     protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    //     {
    //         if(value == null)
    //         {
    //             return new ValidationResult("You must select one of them.");
    //         }
    //         string fieldToValidate = ((string)value).ToLower();

    //         if(fieldToValidate != "corn" || fieldToValidate != "flour")
    //         {
    //             return new ValidationResult("You must select either Flour or Corn for your tortilla.");
    //         }
    //         else 
    //         {
    //             return ValidationResult.Success;
    //         }
    //     }
    // }

    public class SelectionAttribute : ValidationAttribute 
    {
        private string[] options { get; set; }

        public SelectionAttribute(string[] options)
        {
            this.options = options;
        }
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(options.Contains((string)value))
            {
                return ValidationResult.Success;
            }
            else 
            {
                return new ValidationResult("Please select a valid option from the choices given.");
            }
        }
    }
}