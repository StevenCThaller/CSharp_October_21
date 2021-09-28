using System;

namespace _02_Inheritence_Polymorphism
{
    class Program
    {
        static void Main(string[] args)
        {
            Fruit myFruit = new Fruit();
            // Fruit yourFruit = new Fruit();
            Fruit yourFruit = new Fruit("Sour", "Bush", "Turquoise", false);

            // System.Console.WriteLine(myFruit == yourFruit);

            // System.Console.WriteLine("My Fruit Flavor:");
            // System.Console.WriteLine(myFruit.Flavor);
            // System.Console.WriteLine("Your Fruit Flavor:");
            // System.Console.WriteLine(yourFruit.Flavor);

            // yourFruit.LeaveOut();

            // myFruit.Smash(yourFruit);

            Banana nanana = new Banana(false, "Sweetish", "Green", false);

            nanana.LeaveOut();
            
            nanana.LeaveOut();



        }
    }
}
