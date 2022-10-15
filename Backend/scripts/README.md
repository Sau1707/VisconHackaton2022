Things Learned from API Testing
1. You can use `&offset=x` to do paging.
2. You can use facets to get the elements inside the results
3. All fields that are a facet `x` tend to be accompanied by a `x_name` field
4. `from_date` and `to_date` seem to encode the date it starts and ends (usually its on the same day)... and has a format that we will want to be able to parse so as to display properly

Questions Raised
1. How to use QueryId to filter for building
2. How to use QueryId to filter for sport type
3. WTF is `oe_...`
4. WTF is `searcheable`