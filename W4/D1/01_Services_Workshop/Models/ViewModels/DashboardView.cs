using System.Collections.Generic;

namespace _01_Services_Workshop.Models
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