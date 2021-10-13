using Microsoft.EntityFrameworkCore;

namespace _01_Belt_Prep.Models
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions options) : base(options) {}


        public DbSet<User> Users { get; set; }
        public DbSet<FoodTruck> FoodTrucks { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
    }
}