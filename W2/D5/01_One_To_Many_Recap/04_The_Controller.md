# But how do we query?


## Get the One Instructor with a list of their students
```csharp
// code removed for brevity
[HttpGet("instructors/{instructorId}")]
public IActionResult InstructorInfo(int instructorId)
{
    Instructor ToDisplay = _context.Instructors
                                    .Include(i => i.Students) // include the navigation property
                                    .FirstOrDefault(i => i.InstructorId == instructorId);
    // other code

    return View(ToDisplay);
}

```

## Get a Student, including their Instructor's information
```csharp
// code removed for brevity
[HttpGet("students/{studentId}")]
public IActionResult StudentInfo(int studentId)
{
    // code code code

    Student ToDisplay = _context.Students
                                .Include(s => s.Instructor) // include the navigation property
                                .FirstOrDefault(s => s.StudentId == studentId);

    // code code code

    return View(ToDisplay);
}

```

## BONUS: Get all instructors and all of their students

```csharp
// code removed

[HttpGet("instructors")]
public IActionResult AllInstructors()
{
    // code code code

    List<Instructor> AllInstructors = _context.Instructors
                            .Include(i => i.Students)
                            .ToList();

    // code code code

    return View(AllInstructors);
}

```