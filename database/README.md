
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
3. To view users table:
    ```
    SELECT * FROM users;
    ```

4. To Delete all users entries:
    ```
    DELETE FROM users;
    ```

5. change permissions of user:
    ```
    UPDATE users SET role = 'admin' WHERE username = 'admin';
    ```