# Question 1

```csharp
List<string> Names = new List<string>{"Larry", "Curly", "Moe"};

bool isFunny = Names.Any(n => n.Length < 4);
```

The value of `isFunny` will be:

1. true
2. false

## Answer: 1

---

# Question 2

```csharp
int[] Jenny = {8, 6, 7, 5, 3, 0, 9};
```

To find the smallest number in `Jenny`, we would write:

1. `Jenny.Select(j => j.Smallest);`
2. `Jenny.Where(j => j.Smallest);`
3. `Jenny.Min();`
4. `Jenny.OrderByDescending(j => j).FirstOrDefault();`

## Answer: 3

---

## Question 3 - 7 will use the following class

```csharp
public class Student
{
    public int StudentId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }

    public Student(int id, string fname, string lname, int age)
    {
        StudentId = id;
        FirstName = fname;
        LastName = lname;
        Age = age;
    }
}
```
and
```csharp
List<Student> students = new List<student>
{
    new Student(1, "Billy", "Mays", 50),
    new Student(2, "Joe", "Rogan", 45),
    new Student(3, "Madonna", "N/A", 60),
    new Student(4, "Bob", "Ross", 22)
};
```

# Question 3

Write the query that would return a list of the students with first names less than 4 characters long:

## ANSWER: 
```csharp
List<Student> lessThanFour = students.Where(s => s.FirstName.Length < 4).ToList();
```

---

# Question 4

Write the query that would return an array of the students' last names

## ANSWER:
```csharp
string[] lastNames = students.Select(s => s.LastName);
```

---

# Question 5

Write the query that would return an IEnumerable of the students, from oldest to youngest

## ANSWER:
```csharp
IEnumerable<Student> oldToYoung = students.OrderByDescending(s => s.Age);
```

---

# Question 6

Write the query that would return a list of the last names of all students younger than 30 OR older than 50.

## ANSWER:

```csharp
List<string> lastNames = students.Where(s => s.Age < 30 || s.Age > 50)
                                .Select(s => s.LastName)
                                .ToList();
```

---

# Question 7

What data type will be returned by the following query:

```csharp
students.Where(s => s.LastName.Length > 3)
        .OrderBy(s => s.Age)
        .Max(s => s.FirstName.Length);
```

1. `IEnumerable<Student>`
2. `Student`
3. `IEnumerable<int>`
4. `int`

## ANSWER: 4

---

# BONUS ROUND
Given:

```csharp
List<string> colors = new List<string>
{
    "red",
    "blue",
    "green",
    "indigo",
    "violet",
    "yellow",
    "orange"
};
```

Write a query that will return a list of the lengths of all colors that are NOT 4 characters in length, ordered not by length, but by the names of the colors alphabetically.

## ANSWER: 
```csharp
List<int> lengths = colors.Where(c => c.Length != 4)
                                    .OrderBy(c => c[0])
                                    .Select(c => c.Length)
                                    .ToList();
```                                    