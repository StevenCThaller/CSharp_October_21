using System;

namespace _02_OOP_Code
{
    class Program
    {
        static void Main(string[] args)
        {
            Fruit myFruit = new Fruit();
            // Fruit yourFruit = new Fruit();
            Fruit yourFruit = new Fruit("Sour", "Bush", "Turquoise", false);

            // System.Console.WriteLine(myFruit == yourFruit);

            System.Console.WriteLine("My Fruit Flavor:");
            System.Console.WriteLine(myFruit.Flavor);
            System.Console.WriteLine("Your Fruit Flavor:");
            System.Console.WriteLine(yourFruit.Flavor);

            yourFruit.LeaveOut();

            myFruit.Smash(yourFruit);

            
        }
    }
}
