# One to Many Relationships

Just as a refresher, remember a `one to many` relationship in a relational database is one in which items in 2 separate
tables are connected in such a way that one side has a unique relation to the second side, but the second side does NOT 
have a unique relation to the first side.

## Examples:
- `One` instructor has `Many` students, but each of those students has `One` instructor.
    - The `Foreign Key` would reside in the `students` table, representing the `instructor` id.
- `One` user can create `Many` posts, but each of those posts is only created by `One` user.
    - The `Foreign Key` would reside in the `posts` table, representing the `user` id

