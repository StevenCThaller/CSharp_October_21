# Now the models!

## Student.cs

Remember, in this scenario, the `student` only has ONE `instructor`. So the `Foreign Key` must reside in this model.

```csharp
// namespace and using statements removed for brevity
public class Student
{
    [Key]
    public int StudentId { get; set; }
    public string Name { get; set; }

    
    public int InstructorId { get; set; } // this is the foreign key
    /*
        But we'll want to be able to access that instructor's information
        most likely, so we'll use what we call a Navigation property.
    */
    public Instructor Instructor { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}

```

## Instructor.cs

```csharp
// namespace and using statements removed for brevity
public class Instructor
{
    [Key]
    public int InstructorId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    /*
        Realistically, we might want to access the list of students
        being taught by a given instructor, so let's make a Navigation
        Property
    */
    public List<Student> Students { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
}

```