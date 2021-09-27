# How Do We Create Methods Then?

Because `.NET` runs everything from the `main` method in the `Program` class, we'll need to determine where to define our methods.

For the earlier assignments (and until we get to `OOP` tomorrow), we'll just put them in the `Program` class that `.NET` has generated for us

```c#
class Program
{
    static void Main(string[] args)
    {
        // some code here
    }
}
```

We have 2 main options for defining methods to use within our `Main` method:

1. Add new methods to our `Program` class
2. Create a new class, and make the methods in there.

For now, we'll stick to method number 1