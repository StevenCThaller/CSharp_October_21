namespace _01_Services_Workshop.Models
{
    public class TruckInfoViewModel
    {
        public FoodTruck Truck { get; set; }
        public int LoggedInUserId { get; set; }
        public Review Review { get; set; }

        public string Name 
        {
            get 
            {
                return Truck.Name;
            }
        }
        public string Style 
        {
            get 
            {
                return Truck.Style;
            }
        }
        public string Description 
        {
            get 
            {
                return Truck.Description;
            }
        }

        public double AverageRating
        {
            get
            {
                return Truck.AverageRating;
            }
        }

        public int FavoritedBy 
        {
            get  
            {
                return Truck.FavoritedBy.Count;
            }
        }

        
        public TruckInfoViewModel() {}

        public TruckInfoViewModel(FoodTruck truck, int userId)
        {
            Truck = truck;
            LoggedInUserId = userId;
        }
    }
}