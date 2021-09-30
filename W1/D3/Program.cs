using System;

namespace D3
{
    class Program
    {
        static void Main(string[] args)
        {
            bool isGameRunning = true;

            while(isGameRunning) 
            {
                Console.WriteLine("Which room would you like to go to?");
                System.Console.WriteLine("1. Cave\n2. Farm\n3. House");

                string response = Console.ReadLine();

                if(response == "1" || response.ToLower().StartsWith("one") || response.ToLower().Contains("cave"))
                {
                    System.Console.WriteLine("You went to the cave!");
                }
                else if (response == "2" || response.ToLower().StartsWith("two") || response.ToLower().Contains("farm"))
                {
                    System.Console.WriteLine("You went to the farm!");
                }
                else if (response == "3" || response.ToLower().StartsWith("three") || response.ToLower().Contains("house"))
                {
                    System.Console.WriteLine("You went to the house!");
                }
                else if (response.ToLower().Contains("leave me alone")) 
                {
                    System.Console.WriteLine("YOU LOSE");
                    isGameRunning = false;
                }
            }
        }
    }
}
