# What Data Types do we deal with?

In `Python`, we had `numbers`, `strings`, `lists` (`arrays` in JavaScript), `booleans`, and `objects`. 

In `C#`, we're not dealing with anything radically different. The difference boils down to how each of those data types can be broken down even further.

## Numbers
C# doesn't just use `numbers`. It splits things up into several different TYPES of `numbers`:
- `int` - integer (whole number)
- `long` - also an integer, but can be much bigger
- `decimal`
- `float` 
- `double`

## Characters and Strings
In Python and JavaScript, we had `strings`, and that was it. An individual character within a `string` was still kind of just a `string`. In C#, a `string` is made up of multiple `characters`, referred as `char`. Similar to Python and JavaScript, we can pinpoint a given character within a string via its index, but that character will be a `char`. 
- `string` - a string of characters
- `char` - an individual character

## Lists and Arrays
Python used lists, JavaScript used arrays, but what's the difference here? In C#, an `array` and a `list` are very different. An `array` has a fixed length. When you create an array, you need to know exactly what data types will fill that `array`, and exactly how many elements can be in that `array`. They're not very flexible, but because of that, they're more memory efficient. A `list` in C# is much more like the lists and arrays in Python and JavaScript, resectively. However, like `arrays` in C#, we need to know what data type will fill the `list`. But unlike `arrays` in C#, the size of the `list` can change however we want. 

## Objects
Talking about `objects` in C# is complicated. Ever single data type we've talked about so far has some underlying `object` running the show. We'll see very soon that the application itself is, in fact, just an `object` with a method being run. But in terms of data types, because everything is, at some level, an `object`, we can use `objects` in situations where we potentially want to deal with one of several different data types. We'll see this pretty heavily in the `Boxing/Unboxing` assignment. 