using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _01_Many_To_Many.Models
{
    public class TacoHasToppings
    {
        [Key]
        public int TacoHasToppingsId { get; set; }

        public int TacoId { get; set; }
        public Taco Taco { get; set; }

        public int ToppingId { get; set; }
        public Topping Topping { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;        
    }
}
