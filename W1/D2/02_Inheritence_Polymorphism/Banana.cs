using System;

namespace _02_Inheritence_Polymorphism
{
    class Banana : Fruit
    {
        private bool isPeeled;
        public Banana(bool isPeeled, string flavor, string color, bool isRipe) : base(flavor, "Tree", color, isRipe)
        {
            this.isPeeled = isPeeled;
        }

        public void Peel()
        {
            if(isPeeled)
            {
                System.Console.WriteLine("You peel the banana");
                isPeeled = true;
            }
            else 
            {
                System.Console.WriteLine("You maniac, you can't peel a peeled banana!");
            }
        }

        protected override void Ripen()
        {
            if(!isRipe)
            {
                Color = "Yellow";
                flavor = "Sweet";
            }
            base.Ripen();
        }
    }
}