# C# vs Python
---
## Numbers
### Python
Declaring a variable that stores a number is easy as pie
```py
x = 10
```

### C#
We need to be more specific:
#### Integers
```c#
int x = 10;
```
If the number being stored in the variable is not actually a whole number, everything will break.

How does this affect math though?

### Python
```py
x = 10
x = x / 3
```
`x` would end up with a value of `3.3333333`

### C#
```c#
int x = 10;
x = x / 3;
```
`x` would end up as `3`.

If we want a non-integer, we're best off using `double`

### Python
```py
x = 1.25
```

### C#
```c#
double x = 1.25;
```

---

## Strings

### Python
```py
name = "Cody"
# or
name = 'Cody'
```

### C#
```c#
string name = "Cody";
```
We must declare the variable as a `string`, AND we can only use double quotes (`"`).

That's because, in C#, `'` is used for `char`s


### Python
```py
character = "x"
# or
character = 'x'
```

### C#
WE MUST USE SINGLE QUOTES
```c#
char character = 'x';
```

If I want to store the character at position 2 in `"Cody"` to a variable:
### Python
```py
name = "Cody"
letter = name[2]
```

### C#
```c#
string name = "Cody";
char letter = name[2];
```

---

## Booleans
### Python
```py
isTrue = True
# or 
isTrue = False
```

### C#
```c#
bool isTrue = true; // or false
```

--- 

## Lists and Arrays

### Python
We only had lists. And it went something like this:
```py
arr = []
# or 
arr = [1, 2, 3, 4, 5]
# or even
arr = [1, "telephone", True, [1,2,3] ]
```

### C#
In C# we have `lists` AND `arrays`.
#### Arrays
If I want an array of numbers that contains 5 numbers:
```c#
int[] arr = new int[5];
// or, if I want to pre-populate:
int[] arr = {1, 2, 3, 4, 5};
```

`new int[5]` will result in `[ Null, Null, Null, Null, Null ]`

Once we declare that the array is of a given type (i.e. `int`, `string`, `char`, etc.), we cannot put anything else in there. If we wanted to store multiple data type in an array:

```c#
object[] arr = new object[5];
// or
object[] arr = {1, true, 'C', "hello" };
```

Unfortunately, if I want to add a new number to an array that already exists and is full of numbers, I cannot simply `.push()` or anything like that:

```c#
int[] arr = {1, 2, 3, 4, 5};
int[] newArr = new int[6];

for(int i = 0; i < arr.Length; i++) {
    newArr[i] = arr[i];
}

newArr[newArr.Length - 1] = 6;
```

### Lists
`Lists` will do the same thing for us as `arrays`, with, realistically, a negligable difference in performance.

NOTE: There is an import needed for `Lists`, but we'll talk about that later.

```c#
List<int> arr = new List<int>(); // to start empty
// to add to a list:
arr.Add(5);
arr.Add(2);
// to remove from a list:
arr.RemoveAt(0); // pass in the index of the thing you want to remove
arr.Remove(5); // pass in the value you want to remove from the list itself

arr.Insert(1, 6); // This will insert 6 into the list at position 1

// To get the number of elements inside of a list, we don't use a Length, but rather, a Count:

int numberOfElements = arr.Count;

arr[0] = 2; // to replace a value in a list

// If I want to build it with pre-populated values:
List<int> preBuilt = new List<int>{1, 2, 3, 4, 5};
```

Multidimensional List:
```c#
List<List<int>> twoDimensionalList = new List<List<int>>();

twoDimensionalList.Add(new List<int>{1, 2, 3});
twoDimensionalList.Add(new List<int>{4, 5, 6});
```
---

## Loops and Conditionals
Loops are going to look almost exactly like they do in JavaScript:

### For Loop
```c#
for(int i = 0; i < 100; i++) 
{
    // logic here
}
```

### While loop
```c#
while(/* some condition*/) 
{
    // logic here
}
```

### Conditionals
In Python and C#, you were able to use conditional statements with conditions that weren't truly `boolean` in nature. 

For example:
```js
while(runner) {}
```
JavaScript deals less with `true` and `false`, and more with `truth-y` and `false-y`. Meaning, `true` will be handled the same way as `1`, an element simply existing, or generally just not having a value of `null` or `undefined`.
`false` will be handled the same way as `0`, `null`, or `undefined` when it comes to a conditional statement.

In C#, that is very much not the case. The condition we test in a conditional statement (and by extension a `while` loop, and even the second part of the `for loop`) MUST resolve to `true` or `false`. NOTHING ELSE.

So, if I want to check if `runner` exists:

```c#
if(runner != null) 
{
    // logic here
}
```

The only way we can put a variable/function call straight into the conditional is if that variable/function has already been declared as a `bool`.

```c#
while(runner){} // will NOT work, unless runner has been declared as a bool
```

It would have to look something like:
```c#
while(runner != null) {
    // logic here
}
```

### C# brings some cool stuff to the table with loops though
#### Python
```py
names = ["Jeff", "Tony", "Mary", "Bill", "Cassandra"]

for name in names:
    print(name)
```

We can do basically the same in C#:
```c#
string[] names = {"Jeff", "Tony", "Mary", "Bill", "Cassandra"};
foreach(string name in names)
{
    Console.WriteLine(name);
}
```
