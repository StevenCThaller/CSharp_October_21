using System;

namespace _02_Inheritence_Polymorphism
{
    class Fruit
    {
        // this is where we'll put all of our information
        protected string flavor;

        // By adding a get to our public Flavor, we can essentially
        // maintain the class's flavor attribute as private, but still
        // allowing us to read that information
        // e.g. we have made the field read only
        public string Flavor
        {
            get 
            {
                return flavor;
            }
        }

        public string GrowsOn;
        public string Color;

        protected bool isRipe;
        
        public bool IsRipe 
        {
            get 
            {
                return isRipe;
            }
        }

        public Fruit()
        {
            flavor = "Sweet";
            GrowsOn = "Tree";
            Color = "Blurple";
            isRipe = true;
        }

        public Fruit(string flavor, string growsOn, string color, bool isRipe = true)
        {
            this.flavor = flavor;
            GrowsOn = growsOn;
            Color = color;
            this.isRipe = isRipe;
        }

        public void LeaveOut()
        {
            Ripen();
        }

        protected virtual void Ripen()
        {
            // If the fruit is not ripe, it will become ripe.
            // If the fruit IS ripe, it will overripen and become mushy and gross

            if(isRipe)
            {
                flavor = "Gross";
                Color = "Brown";
            }
            else 
            {
                isRipe = true;
            }
        }

        protected void GetSmashed()
        {
            flavor = "Mushy";
            Color = "Blah";
            isRipe = false;
        }

        public void Smash(Fruit toSmashAgainst)
        {
            GetSmashed();
            toSmashAgainst.GetSmashed();
            System.Console.WriteLine("You smashed the fruit together. Ew, now there's a mess.");
        }
    }
}