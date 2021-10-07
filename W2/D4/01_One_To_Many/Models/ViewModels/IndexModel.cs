using System.Collections.Generic;


namespace _01_One_To_Many.Models
{
    public class IndexModel
    {
        public Taco Form { get; set; }
        public List<Protein> ProteinOptions { get; set; }
    }
}