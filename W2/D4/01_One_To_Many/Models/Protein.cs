using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _01_One_To_Many.Models
{
    public class Protein
    {
        [Key]
        public int ProteinId { get; set; }
        [Required]
        [Display(Name = "Name: ")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "Description: ")]
        public string Description { get; set; }
        // Navigation Property
        public List<Taco> Tacos { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}