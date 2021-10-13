using System.Collections.Generic;

namespace _01_Belt_Prep.Models
{
    public class DashboardView
    {
        public List<FoodTruck> Trucks { get; set; }

        public int LoggedInUserId { get; set; }

        public DashboardView() {}

        public DashboardView(List<FoodTruck> trucks, int userId)
        {
            Trucks = trucks;
            LoggedInUserId = userId;
        }
    }
}