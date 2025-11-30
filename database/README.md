
# Setup Guide
- Requires no setup steps.

# How to read tables (LINUX)

1. In a terminal run:
    ```
    docker exec -it lampenit-db-1 psql -U root -d lampenit
    ```

2. To view list of relations:
    ```
    \dt
    ```

2. To view users table:
    ```
    SELECT * FROM users;
    ```