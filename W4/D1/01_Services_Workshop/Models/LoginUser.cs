using System.ComponentModel.DataAnnotations;

namespace _01_Services_Workshop.Models
{
    public class LoginUser
    {
        [Required(ErrorMessage = "Please enter your email.")]
        [Display(Name = "Email: ")]
        public string LogEmail { get; set; }
        [Required(ErrorMessage = "Please enter your password.")]
        [Display(Name = "Password: ")]
        [DataType(DataType.Password)]
        public string LogPassword { get; set; }
    }
}