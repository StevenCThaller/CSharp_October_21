using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace _01_Many_To_Many.Models.Validations
{

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