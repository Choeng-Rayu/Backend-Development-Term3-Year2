**EX1 Question and answer**

`1`.Using useEffect() allows you to perform side effects, like data fetching, without cluttering the UI logic. When paired with axios, it becomes easier to isolate the data-fetching logic from the component’s render logic. This separation makes components more focused, maintainable, and easier to test.

`2`.One major challenge is syncing user input with API responses without overwriting current form state. For example, updating the form while also displaying a loading state or handling asynchronous errors can cause inconsistent UI if not managed carefully. Handling race conditions and ensuring the state reflects the correct source of truth is also tricky.

`3`. REST provides a predictable and consistent way to interact with backend resources. With standardized endpoints (e.g., /users, /products/:id), React developers can structure API calls clearly, map state to resources logically, and avoid hardcoding logic. This results in modular, readable, and reusable frontend code.

**EX2 Question and Answer**

`1`.Benefits of Sub-Resource Routes in API Design
Sub-resource routes like /journalists/:id/articles provide several advantages for REST API organization:

Clear Hierarchy: They explicitly show the relationship between resources (journalists and their articles)

Logical Structure: Matches real-world relationships (a journalist "has many" articles)

Improved Readability: The URL itself documents the resource relationship

Simplified Authorization: Easier to implement ownership checks when resources are nested

Better Scoping: Automatically filters articles to those belonging to a specific journalist

Consistency: Follows REST principles by representing relationships in the URI structure.

`2`.Managing multiple filters (journalist and category) presented several challenges:

State Synchronization: Ensuring both filter states were updated correctly before triggering data fetching

Race Conditions: Preventing multiple rapid filter changes from triggering overlapping requests

Conditional Rendering: Deciding when to show loading states, empty results, or error messages

Derived State: Calculating whether to enable/disable UI elements based on filter combinations

Solutions implemented:

Used useEffect with dependencies on both filter states to coordinate updates

Implemented debouncing to prevent excessive API calls during rapid filter changes

Created clear state update patterns (e.g., always resetting one filter when the other changes)

Developed helper functions to determine when filtering should occur.

`3`.Client-Side Filtering Advantages:

Faster response after initial load (no network requests)

Can handle complex filtering logic without API changes

Works offline after initial data fetch

Less server load for repeated filtering

Client-Side Filtering Disadvantages:

Must download all data upfront (inefficient for large datasets)

Filtering logic duplicated between client and server

No pagination support without additional complexity

Becomes sluggish with very large datasets

Server-Side Filtering Advantages:

Only transfers relevant data (better performance for large datasets)

Centralized filtering logic

Built-in pagination support

Can leverage database optimizations

Server-Side Filtering Disadvantages:

Requires network roundtrip for each filter change

More complex API surface area

Harder to implement complex multi-field filtering.

`4`.To allow filtering by both journalist and category simultaneously:

Best Approach: Use query parameters (/articles?journalist_id=X&category_id=Y)

✅ Flexible, scalable, follows REST conventions

❌ Less explicit than nested routes.

`5`.State drives UI & API calls (controlled forms, useEffect triggers fetches)

Loading/error states prevent race conditions

Unidirectional flow: Form input → State → API → UI update

Explicit dependencies in useEffect avoid bugs.