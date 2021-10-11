using Microsoft.EntityFrameworkCore;

namespace _01_Many_To_Many.Models
{
    public class TaContext : DbContext 
    {
        public TaContext(DbContextOptions options) : base(options) {}


        // These DbSet<> attributes are how Entity knows to create a table int he database
        public DbSet<Taco> Tacos { get; set; }

        public DbSet<Protein> Proteins { get; set; }
        public DbSet<TacoHasToppings> TacosHaveToppings { get; set; }
        public DbSet<Topping> Toppings { get; set; }
    }
}