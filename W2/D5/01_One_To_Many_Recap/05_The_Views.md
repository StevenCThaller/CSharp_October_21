# Let's see it though!

## Show the one instructor with a list of their students

```html
@using somenamespace.Models
@model Instructor

<!-- HTML removed -->
<p>Name: @Model.FirstName @Model.LastName</p>
<p>Students:</p>
<ul>
    @foreach(Student student in Model.Students)
    {
        <li>@student.Name</li>
    }
</ul>
```


## Show the one student including their Instructor's info

```html
@using somenamespace.Models
@model Student

<!-- HTML removed -->
<p>Name: @Model.Name</p>
<p>Instructor: @Model.Instructor.FirstName @Model.Instructor.LastName</p>

```

## BONUS: Show all of the instructors in a table, and include the number of students each instructor has

```html
@using somenamespace.Models
@model List<Instructor>

<!-- HTML removed -->
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Student Count</th>
        </tr>
    </thead>
    <tbody>
        @foreach(Instructor instructor in Model)
        {
            <tr>
                <td>@instructor.FirstName @instructor.LastName</td>
                <td>@instructor.Students.Count</td>
            </tr>
        }
    </tbody>
</table>
```