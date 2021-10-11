using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _01_Many_To_Many.Models
{
    public class Topping 
    {
        [Key]
        public int ToppingId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        // KEY POINT: Navigation property for a M2M relationship is to the MIDDLE table, not the other side
        public List<TacoHasToppings> Tacos { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}