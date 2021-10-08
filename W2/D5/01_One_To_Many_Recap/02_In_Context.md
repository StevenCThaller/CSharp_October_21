# MyContext.cs

```csharp
// namespace and using statements removed for brevity's sake
public class MyContext : DbContext 
{
    public MyContext(DbContextOptions options) : base(options) { }

    public DbSet<Instructor> Instructors { get; set; }
    public DbSet<Student> Students { get; set; }
}
```

Remember, our `Context` model is what indicates that a `class` of objects should be `mapped` to the database, so we need
to add both models as `DbSet`s