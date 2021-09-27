using System;

namespace _02_Lets_Make_Functions
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            // int sum = SumOfTwoInts(5, 4);
            // System.Console.WriteLine(sum);
            WontReturnAnything();
        }

        public static void WontReturnAnything()
        {
            int[] arr = {1, 2, 3, 4, 5};
            
            return;
        }

        public static int SumOfTwoInts(int num1, int num2)
        {
            int sum = num1 + num2;
            string summable = ConvertToString(sum);
            System.Console.WriteLine(summable);
            return sum;
        }

        public static string ConvertToString(int num)
        {
            string toReturn = num.ToString();
            toReturn += toReturn;
            return toReturn;
        }

    }
}